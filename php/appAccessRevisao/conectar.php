<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

// dados de acesso do servidor local
$banco = 'accessDb';
$host = 'localhost';
$user = 'root';
$pass = 'deskserve';

try {
    $pdo = new PDO("mysql:dbname=$banco;host=$host", $user, $pass);
} catch (Exception $e) {
    echo "falha ao conectar ao banco " . $banco . ". Verifique! - " . $e;
}
