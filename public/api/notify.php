<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(200);
  exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "GET" && $_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["ok" => false, "error" => "Method not allowed"]);
  exit;
}

$dataDir = __DIR__ . "/data";
if (!is_dir($dataDir)) {
  mkdir($dataDir, 0755, true);
}

$subscribersFile = $dataDir . "/subscribers.json";
if (!file_exists($subscribersFile)) {
  echo json_encode(["ok" => true, "sent" => 0, "reason" => "no-subscribers"]);
  exit;
}

$subscribers = json_decode(file_get_contents($subscribersFile), true);
if (!is_array($subscribers) || count($subscribers) === 0) {
  echo json_encode(["ok" => true, "sent" => 0, "reason" => "no-subscribers"]);
  exit;
}

$stateFile = $dataDir . "/last_notified.json";
if (!file_exists($stateFile)) {
  file_put_contents($stateFile, json_encode([
    "last_guid" => "",
    "last_checked" => 0
  ], JSON_PRETTY_PRINT), LOCK_EX);
}

$state = json_decode(file_get_contents($stateFile), true);
if (!is_array($state)) {
  $state = ["last_guid" => "", "last_checked" => 0];
}

$now = time();
$cooldownSeconds = 900;
if (($now - (int)$state["last_checked"]) < $cooldownSeconds) {
  echo json_encode(["ok" => true, "sent" => 0, "reason" => "cooldown"]);
  exit;
}

$rss = null;
$rssPath = "";
$candidatePaths = [
  __DIR__ . "/../rss_feed.xml",
  __DIR__ . "/../../rss_feed.xml"
];
if (isset($_SERVER["DOCUMENT_ROOT"])) {
  $candidatePaths[] = rtrim($_SERVER["DOCUMENT_ROOT"], "/") . "/rss_feed.xml";
}

foreach ($candidatePaths as $path) {
  if ($path && file_exists($path)) {
    $rssPath = $path;
    break;
  }
}

if ($rssPath !== "") {
  $rss = @simplexml_load_file($rssPath);
} else {
  $scheme = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off") ? "https" : "http";
  $host = isset($_SERVER["HTTP_HOST"]) ? $_SERVER["HTTP_HOST"] : "";
  if ($host) {
    $rssUrl = $scheme . "://" . $host . "/rss_feed.xml";
    $rssContent = @file_get_contents($rssUrl);
    if ($rssContent) {
      $rss = @simplexml_load_string($rssContent);
    }
  }
}

if (!$rss) {
  echo json_encode(["ok" => false, "error" => "rss_feed.xml not found"]);
  exit;
}
if (!$rss || !isset($rss->channel->item)) {
  echo json_encode(["ok" => false, "error" => "rss_feed.xml invalid"]);
  exit;
}

$items = $rss->channel->item;
if (count($items) === 0) {
  echo json_encode(["ok" => true, "sent" => 0, "reason" => "no-items"]);
  exit;
}

$newItems = [];
$lastGuid = (string)$state["last_guid"];

foreach ($items as $item) {
  $guid = isset($item->guid) ? (string)$item->guid : (string)$item->link;
  if ($guid === $lastGuid) {
    break;
  }
  $newItems[] = [
    "title" => (string)$item->title,
    "link" => (string)$item->link,
    "pubDate" => (string)$item->pubDate,
    "guid" => $guid
  ];
}

if (count($newItems) === 0) {
  $state["last_checked"] = $now;
  file_put_contents($stateFile, json_encode($state, JSON_PRETTY_PRINT), LOCK_EX);
  echo json_encode(["ok" => true, "sent" => 0, "reason" => "no-new-items"]);
  exit;
}

$host = isset($_SERVER["HTTP_HOST"]) ? $_SERVER["HTTP_HOST"] : "thedashafrica.com";
$host = preg_replace("/^www\./", "", $host);
$fromEmail = "updates@" . $host;
$fromName = "TheDashAfrica";

$subject = "New articles on TheDashAfrica";
$message = "New articles have just been published:\n\n";
foreach (array_slice($newItems, 0, 5) as $item) {
  $message .= "- " . $item["title"] . "\n";
  if (!empty($item["link"])) {
    $message .= "  " . $item["link"] . "\n";
  }
  $message .= "\n";
}
$message .= "Thank you for reading TheDashAfrica.";

$headers = [];
$headers[] = "From: " . $fromName . " <" . $fromEmail . ">";
$headers[] = "Reply-To: " . $fromEmail;
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";
$headersString = implode("\r\n", $headers);

// Load SMTP configuration if available
$smtpConfig = [];
$configFile = __DIR__ . "/../../smtp-config.json";
if (file_exists($configFile)) {
  $smtpConfig = json_decode(file_get_contents($configFile), true);
}

$sentCount = 0;
$failedCount = 0;

foreach ($subscribers as $email) {
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    continue;
  }
  
  $sent = false;
  
  if (!empty($smtpConfig) && isset($smtpConfig["host"])) {
    // Use SMTP
    $sent = sendEmailSMTP($email, $subject, $message, $fromEmail, $fromName, $smtpConfig);
  } else {
    // Fall back to PHP mail()
    $sent = @mail($email, $subject, $message, $headersString);
  }
  
  if ($sent) {
    $sentCount++;
  } else {
    $failedCount++;
  }
}

// SMTP sending function
function sendEmailSMTP($to, $subject, $message, $fromEmail, $fromName, $config) {
  $smtpHost = $config["host"];
  $smtpPort = isset($config["port"]) ? $config["port"] : 587;
  $smtpUsername = $config["username"];
  $smtpPassword = $config["password"];
  $useTLS = isset($config["use_tls"]) ? $config["use_tls"] : true;
  
  $socket = @fsockopen(
    ($useTLS ? "tls://" : "") . $smtpHost,
    $smtpPort,
    $errno,
    $errstr,
    30
  );
  
  if (!$socket) {
    return false;
  }
  
  $response = fgets($socket, 515);
  if (substr($response, 0, 3) !== "220") {
    fclose($socket);
    return false;
  }
  
  // HELO
  fputs($socket, "HELO " . $smtpHost . "\r\n");
  $response = fgets($socket, 515);
  
  // AUTH LOGIN
  fputs($socket, "AUTH LOGIN\r\n");
  $response = fgets($socket, 515);
  
  fputs($socket, base64_encode($smtpUsername) . "\r\n");
  $response = fgets($socket, 515);
  
  fputs($socket, base64_encode($smtpPassword) . "\r\n");
  $response = fgets($socket, 515);
  
  if (substr($response, 0, 3) !== "235") {
    fclose($socket);
    return false;
  }
  
  // MAIL FROM
  fputs($socket, "MAIL FROM:<" . $fromEmail . ">\r\n");
  $response = fgets($socket, 515);
  
  // RCPT TO
  fputs($socket, "RCPT TO:<" . $to . ">\r\n");
  $response = fgets($socket, 515);
  
  // DATA
  fputs($socket, "DATA\r\n");
  $response = fgets($socket, 515);
  
  $emailContent = "From: " . $fromName . " <" . $fromEmail . ">\r\n";
  $emailContent .= "To: " . $to . "\r\n";
  $emailContent .= "Subject: " . $subject . "\r\n";
  $emailContent .= "MIME-Version: 1.0\r\n";
  $emailContent .= "Content-Type: text/plain; charset=UTF-8\r\n";
  $emailContent .= "Reply-To: " . $fromEmail . "\r\n";
  $emailContent .= "\r\n";
  $emailContent .= $message . "\r\n";
  $emailContent .= ".\r\n";
  
  fputs($socket, $emailContent);
  $response = fgets($socket, 515);
  
  // QUIT
  fputs($socket, "QUIT\r\n");
  fclose($socket);
  
  return substr($response, 0, 3) === "250";
}

$state["last_guid"] = $newItems[0]["guid"];
$state["last_checked"] = $now;
file_put_contents($stateFile, json_encode($state, JSON_PRETTY_PRINT), LOCK_EX);

echo json_encode([
  "ok" => true,
  "sent" => $sentCount,
  "new_items" => count($newItems)
]);
