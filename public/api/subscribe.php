<?php
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["ok" => false, "error" => "Method not allowed"]);
  exit;
}

$raw = file_get_contents("php://input");
$payload = json_decode($raw, true);
$email = "";
if (is_array($payload) && isset($payload["email"])) {
  $email = trim($payload["email"]);
} elseif (isset($_POST["email"])) {
  $email = trim($_POST["email"]);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(["ok" => false, "error" => "Invalid email"]);
  exit;
}

$dataDir = __DIR__ . "/data";
if (!is_dir($dataDir)) {
  mkdir($dataDir, 0755, true);
}

$subscribersFile = $dataDir . "/subscribers.json";
if (!file_exists($subscribersFile)) {
  file_put_contents($subscribersFile, json_encode([]), LOCK_EX);
}

$subscribers = json_decode(file_get_contents($subscribersFile), true);
if (!is_array($subscribers)) {
  $subscribers = [];
}

if (!in_array($email, $subscribers, true)) {
  $subscribers[] = $email;
  file_put_contents($subscribersFile, json_encode($subscribers, JSON_PRETTY_PRINT), LOCK_EX);
}

$host = isset($_SERVER["HTTP_HOST"]) ? $_SERVER["HTTP_HOST"] : "thedashafrica.com";
$host = preg_replace("/^www\./", "", $host);
$fromEmail = "updates@" . $host;
$fromName = "TheDashAfrica";

$subject = "Welcome to TheDashAfrica blogs";
$message = "Thank you for subscribing to TheDashAfrica blogs.\n\n";
$message .= "We will notify you whenever a new article is uploaded.\n\n";
$message .= "If you did not request this, you can ignore this email.";

$headers = [];
$headers[] = "From: " . $fromName . " <" . $fromEmail . ">";
$headers[] = "Reply-To: " . $fromEmail;
$headers[] = "Content-Type: text/plain; charset=UTF-8";
$headersString = implode("\r\n", $headers);

$sent = @mail($email, $subject, $message, $headersString);

if (!$sent) {
  http_response_code(500);
  echo json_encode(["ok" => false, "error" => "Email send failed"]);
  exit;
}

echo json_encode([
  "ok" => true,
  "message" => "Thank you for subscribing to TheDashAfrica blogs."
]);
