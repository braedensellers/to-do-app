<?php
require 'cors.php';
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    echo json_encode(["error" => "Missing task id"]);
    exit;
}

$fields = [];
$params = [ 'id' => $data['id'] ];

if (isset($data['name'])) {
    $fields[] = "name = :name";
    $params['name'] = $data['name'];
}
if (isset($data['complete'])) {
    $fields[] = "complete = :complete";
    $params['complete'] = $data['complete'];
}
if (isset($data['priority'])) {
    $fields[] = "priority = :priority";
    $params['priority'] = $data['priority'];
}
if (isset($data['description'])) {
    $fields[] = "description = :description";
    $params['description'] = $data['description'];
}

if (count($fields) === 0) {
    echo json_encode(["error" => "No tasks to update"]);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE tasks SET " . implode(", ", $fields) . " WHERE id = :id");
    $stmt->execute($params);
    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>