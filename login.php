<?php
session_start();
include 'database.php';

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $email = $_POST['email']
    $password = $_POST['password']


    $sql = "SELECT * FROM members WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email)
    $stmt->execute();
    $result = $stmt->get_result();

    if($result->num-rows > 0){
        $row = $result->fetch_assoc();

        if(password_verify($password, $row['password'])){
            
            $_SESSION['user_id'] = $row['u_id'];
            $_SESSION['admin'] = $row['a_id'];

            if($row['role'] == "admin") {
                header("Location: admin_dashboard.php");
                exit();
            } elseif ($row['role'] == "student"){
                header("Location: student_dashboard.php");
                exit();
            }
        }else {
                echo "Error"
            }
    }else {
        echo "Invalid username or password"
    }
}

$conn->close();