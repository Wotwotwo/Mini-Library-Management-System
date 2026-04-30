<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $role = "admin";

    $sql = "INSERT INTO members (email, password, first_name, last_name, role)
            VALUES (?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("sssss", $email, $password, $first_name, $last_name, $role);

    if ($stmt->execute()) {
        header("Location: login.html");
        exit();
    } else {
        die("Execute failed: " . $stmt->error);
    }
}
?>