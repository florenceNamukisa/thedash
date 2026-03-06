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

if (in_array($email, $subscribers, true)) {
  echo json_encode(["ok" => true, "message" => "You're already subscribed!"]);
  exit;
}

$subscribers[] = $email;
file_put_contents($subscribersFile, json_encode($subscribers, JSON_PRETTY_PRINT), LOCK_EX);

echo json_encode(["ok" => true, "message" => "Successfully subscribed!"]);
