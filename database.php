<?php
header("Content-Type: application/json");

header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$conn = mysqli_connect("localhost", "root", "", "library_system");

if (!$conn) {
    echo json_encode([
        "error" => "DB connection failed",
        "debug" => mysqli_connect_error()
    ]);
    exit;
}

$conn->set_charset("utf8mb4");

$action = $_GET['action'] ?? "";

// GET ALL BOOKS
if ($action == "get_books") {

    $result = $conn->query("SELECT * FROM books");

    $books = [];

    while ($row = $result->fetch_assoc()) {
        $books[] = $row;
    }

    echo json_encode($books);
    exit;
}

// GET SINGLE BOOK
if ($action == "get_book_details") {

    $bookId = $_GET['id'] ?? null;

    if (!$bookId) {
        echo json_encode(["error" => "Book ID is required"]);
        exit;
    }

    $stmt = $conn->prepare("SELECT * FROM books WHERE book_id = ?");
    $stmt->bind_param("i", $bookId);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows == 0) {
        echo json_encode(["error" => "Book not found"]);
        exit;
    }

    $book = $result->fetch_assoc();

    $stmt->close();

    echo json_encode($book);
    exit;
}

echo json_encode([
    "error" => "Invalid action",
    "available_actions" => ["get_books", "get_book_details"]
]);
?>