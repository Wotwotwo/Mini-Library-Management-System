<?php
session_start();
include 'db_connect.php';

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $email = $_POST['email'];
    $password = $_POST['password'];


    $sql = "SELECT * FROM members WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0){
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])){
            $_SESSION['member_id'] = $row['m_id'];
            $_SESSION['role'] = $row['role'];

            if($row['role'] == "admin") {
                header("Location: dashboard_admin.php");
                exit();
            } elseif ($row['role'] == "student"){
                header("Location: dashboard_admin.php");
                exit();
            }
        }else {
                echo "Incorrect password.";
            }
    }else{
        echo "User not found.";
    }
}

$conn->close();
?>