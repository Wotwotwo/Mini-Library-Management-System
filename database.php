<?php 
    $db_server = "localhost";
    $db_username = "root";
    $db_password = "";
    $db_name = "Library";
    $conn = null;

    $conn = mysqli_connect($db_server, 
                            $db_username, 
                            $db_password, 
                            $db_name);

    if (!$conn) {
        die("Error: " . mysqli_connect_error());
    }

    echo "Connected to the database successfully!";

    function get()
    {
        global $conn;
        $query = "SELECT * FROM student_table";
        $result = mysqli_query($conn, $query);
        if ($result) {
            while ($row = mysqli_fetch_assoc($result)) {
                echo $row['name'] . "<br>";
            }
        } else {
            echo "Error: " . mysqli_error($conn);
        }
    }

    get();
?>