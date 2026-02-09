<?php
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["ok" => false, "error" => "Method not allowed"]);
  exit;
}

$raw = file_get_contents("php://input");
$payload = json_decode($raw, true);

$firstName = isset($payload["firstName"]) ? trim($payload["firstName"]) : "";
$lastName = isset($payload["lastName"]) ? trim($payload["lastName"]) : "";
$email = isset($payload["email"]) ? trim($payload["email"]) : "";
$message = isset($payload["message"]) ? trim($payload["message"]) : "";
$company = isset($payload["company"]) ? trim($payload["company"]) : "";

if ($company !== "") {
  echo json_encode(["ok" => true]);
  exit;
}

if ($firstName === "" || $lastName === "" || $message === "") {
  http_response_code(400);
  echo json_encode(["ok" => false, "error" => "Missing required fields"]);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(["ok" => false, "error" => "Invalid email"]);
  exit;
}

if (mb_strlen($message) < 10) {
  http_response_code(400);
  echo json_encode(["ok" => false, "error" => "Message too short"]);
  exit;
}

$host = isset($_SERVER["HTTP_HOST"]) ? $_SERVER["HTTP_HOST"] : "thedashafrica.com";
$host = preg_replace("/^www\./", "", $host);
$fromEmail = "no-reply@" . $host;
$fromName = "TheDashAfrica Contact";

$to = "legacyafrica.uganda@gmail.com";
$subject = "New contact message from " . $firstName . " " . $lastName;

$body = "Name: " . $firstName . " " . $lastName . "\n";
$body .= "Email: " . $email . "\n\n";
$body .= "Message:\n" . $message . "\n";

$headers = [];
$headers[] = "From: " . $fromName . " <" . $fromEmail . ">";
$headers[] = "Reply-To: " . $email;
$headers[] = "Content-Type: text/plain; charset=UTF-8";
$headersString = implode("\r\n", $headers);

$sent = @mail($to, $subject, $body, $headersString);
if (!$sent) {
  http_response_code(500);
  echo json_encode(["ok" => false, "error" => "Email send failed"]);
  exit;
}

echo json_encode(["ok" => true]);
