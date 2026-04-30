<?php
include 'db_connect.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $course = $_POST['course'];
    $year = $_POST['year'];
    $role = "student";

    $sql1 = "INSERT INTO members (email, password, first_name, last_name, role)
             VALUES (?, ?, ?, ?, ?)";

    $stmt1 = $conn->prepare($sql1);

    if (!$stmt1) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt1->bind_param("sssss", $email, $password, $first_name, $last_name, $role);

    if ($stmt1->execute()) {

        $member_id = $stmt1->insert_id;

        $sql2 = "INSERT INTO students (m_id, course, year) VALUES (?, ?, ?)";

        $stmt2 = $conn->prepare($sql2);

        if (!$stmt2) {
            die("Prepare failed (students): " . $conn->error);
        }

        $stmt2->bind_param("isi", $member_id, $course, $year);

        if (!$stmt2->execute()) {
            die("Student insert failed: " . $stmt2->error);
        }

        header("Location: login.html");
        exit();

    } else {
        die("Member insert failed: " . $stmt1->error);
    }
}
?>