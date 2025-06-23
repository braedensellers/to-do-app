<?php
require 'cors.php';
require 'db.php';

$stmt = $pdo->query("SELECT * FROM tasks ORDER BY id ASC");
$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

header("Content-Type: application/json");
echo json_encode($tasks)
?>