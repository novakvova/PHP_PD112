<?php
// Database configuration
$host = 'localhost';
$dbname = 'pd112';
$username = 'root';
$password = '';

// Connection to MySQL using PDO
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Connected successfully";

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit(); //подальший код програми не виконується, у цьому немає смислу
}
