<?php
session_start();

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("Expires: 0");

if (!isset($_SESSION['member_id'])) {
    header("Location: login.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Library Management System</title>

    <!-- CSS -->
    <link rel="stylesheet" href="styles.css">

    <!-- Chart logic -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

</head>

<script>
window.addEventListener("pageshow", function(event) {
    if (event.persisted) {
        window.location.reload();
    }
});
</script>

<body>

    <div class="container">


        <!-- Sidebar -->
        <div class="sidebar">
            <p class="logo"><b>Navigation</b></p>
            <ul class="nav-links">
                <li><a href="#"><img src="Images/Dashboard_Icon.png" alt="Dashboard"> Dashboard</a></li>
                <li><a href="#"><img src="Images/Books_Icon.png" alt="Books"> Books</a></li>
                <li><a href="#"><img src="Images/Members_Icon.png" alt="Members"> Members</a></li>
                <li><a href="#"><img src="Images/Borrow_Icon.png" alt="Borrow Records"> Borrow Records</a></li>
            </ul>
            <hr class="divider">


        </div>


        <!-- Main Content -->
        <div class="main-content">

            <div class="banner">
                <h2 class="welcome-text">Library Management System</h2>

                <div class="user-info">
                    <img src="Images/Default_User_Profile.png" alt="Profile" class="profile-pic">
                    <div class="user-text">x
                        <p class="username">Username</p>
                        <p class="role">ADMIN</p>
                    </div>
                    <a href="logout.php" class="logout-btn">
                        <img src="Images/Log_out_Icon.png" alt="Log Out">
                    </a>
                </div>
            </div>

            <div class="overview-area">

                <div class="overview-card">
                    <img src="Images/Total_Users_Icon.png" alt="Total Users">
                    <p class="card-number">0</p>
                    <h3>Total Users</h3>
                </div>

                <div class="overview-card">
                    <img src="Images/Total_Books_Icon.png" alt="Total Books">
                    <p class="card-number">0</p>
                    <h3>Total Books</h3>
                </div>

                <div class="overview-card">
                    <img src="Images/Borrowed_Books_Icon.png" alt="Borrowed Books">
                    <p class="card-number">0</p>
                    <h3>Borrowed Books</h3>
                </div>

                <div class="overview-card">
                    <img src="Images/Borrowed_Books_Icon.png" alt="Overdue Books">
                    <p class="card-number">0</p>
                    <h3>Overdue Books</h3>
                </div>

            </div>



            <!-- Content Window -->
            <div class="content_overview">
                <h2>Book Circulation</h2>
                <canvas id="bookDonutChart" width="600" height="600"></canvas>
            </div>


            <div class="content_books">

                <h2>Book Records</h2>
                <p>Collection</p>


                <div class="books_navigation">

                    <!-- Search Bar -->
                    <div class="search-bar">
                        <img src="Images/Seach_Icon.png" alt="Search Left" class="search-icon left">
                        <input type="text" placeholder="Search books..." id="bookSearch">
                        <img src="Images/Magnifying_glass.png" alt="Search Right" class="search-icon right">
                    </div>

                    <!-- Books Button -->
                    <div class="book-actions">
                        <button class="sort-book-btn">
                            <img src="Images/Sort_Icon.png" alt="Sort Books">
                        </button>

                        <button class="add-book-btn">
                            <img src="Images/Add_Icon.png" alt="Add Book">
                            Add Book
                        </button>

                    </div>
                </div>


                <div class="books-container">
                    <div class="books-instance">
                        <img src="Images/Book_Cover.png" alt="Book Cover" class="book-cover">
                        <h2>Title</h2>
                        <p>What will it take just for me to have it all?</p>

                        <span class="status available">Available</span>
                    </div>
                </div>



            </div>


            <div class="content_Members">

                <h2>Member Records</h2>
                <p>Collection</p>


                <div class="members_navigation">

                    <!-- Search Bar -->
                    <div class="search-bar">
                        <img src="Images/Seach_Icon.png" alt="Search Left" class="search-icon left">
                        <input type="text" placeholder="Search members..." id="memberSearch">
                        <img src="Images/Magnifying_glass.png" alt="Search Right" class="search-icon right">
                    </div>

                    <!-- Members Button -->
                    <div class="book-actions">
                        <button class="sort-book-btn">
                            <img src="Images/Sort_Icon.png" alt="Sort Students">
                        </button>

                        <button class="add-book-btn">
                            <img src="Images/Add_Icon.png" alt="Add Student">
                            Add Student
                        </button>

                    </div>


                </div>

                <div class="members-container">
                    <div class="members-instance">
                        <div class="member-info">
                            <h2>What good are words when a smile says it all?</h2>
                            <p>Student ID: #000000</p>
                        </div>
                        <button class="view-btn">View Information</button>
                    </div>
                </div>




            </div>

            <div class="content_borrow">

                <h2>Borrow Records</h2>
                <p>Collection</p>

                <div class="books_navigation">

                    <!-- Search Bar -->
                    <div class="search-bar">
                        <img src="Images/Seach_Icon.png" alt="Search Left" class="search-icon left">
                        <input type="text" placeholder="Search books..." id="bookSearch">
                        <img src="Images/Magnifying_glass.png" alt="Search Right" class="search-icon right">
                    </div>

                    <!-- Books Button -->
                    <div class="book-actions">
                        <button class="sort-book-btn">
                            <img src="Images/Sort_Icon.png" alt="Sort records">
                        </button>

                        <button class="add-book-btn">
                            <img src="Images/Add_Icon.png" alt="Add records">
                            Add Records
                        </button>

                    </div>
                </div>


                <div class="borrow-container">
                    <div class="borrow-instance">
                        <div class="borrow-info">
                            <img src="Images/Book_Cover.png" alt="Book Cover">

                            <div class="borrow-details">
                                <h2>I have no mouth but I must scream</h2>
                                <p><b>Borrow ID:</b> 123123</p>
                                <p><b>Student ID:</b> #000000</p>
                                <p><b>Book ID:</b> 2323</p>
                                <p><b>Borrow Date:</b> 2024-01-01</p>
                                <p><b>Due Date:</b> 2024-01-15</p>
                                <p><b>Status:</b> Overdue</p>
                            </div>
                        </div>



                        <span class="status overdue">Overdue</span>
                    </div>
                </div>


            </div>




            <!-- Form Pop Up -->

            <div id="bookModal" class="modal">
                <div class="modal-content">
                    <span class="close" onclick="closeModal()">&times;</span>

                    <h2>Add New Book</h2>

                    <form id="bookForm">


                        <div class="form-group">
                            <label>Book ID</label>
                            <input type="text" placeholder="Enter book ID" required>
                        </div>

                        <div class="form-group">
                            <label>Book Title</label>
                            <input type="text" placeholder="Enter book title" required>
                        </div>

                        <div class="form-group">
                            <label>Author</label>
                            <input type="text" placeholder="Enter author name" required>
                        </div>

                        <div class="form-group">
                            <label>Genre</label>
                            <input type="text" placeholder="e.g. Fiction, Science">
                        </div>

                        <div class="form-group">
                            <label>Published Year</label>
                            <input type="number" min="1900" max="2026">
                        </div>

                        <div class="form-group">
                            <label>Status</label>
                            <select>
                                <option>Available</option>
                                <option>Borrowed</option>
                                <option>Reserved</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Description</label>
                            <textarea placeholder="Short description..."></textarea>
                        </div>

                        <div class="form-group">
                            <label>Book Cover Image</label>
                            <input type="file" id="bookImage" accept="image/*">
                        </div>

                        <img id="imagePreview" class="image-preview" alt="Preview">


                        <div class="form-actions">
                            <button type="submit"><b>Submit</b></button>
                        </div>

                    </form>
                </div>
            </div>

            <div id="membersModal" class="modal">
                <div class="modal-content">
                    <span class="close" onclick="closeModal()">&times;</span>

                    <h2>Add New Member</h2>

                    <form id="membersForm">


                        <div class="form-group">
                            <label>Member ID</label>
                            <input type="text" placeholder="Enter member ID" required>
                        </div>

                        <div class="form-group">
                            <label>Member Name</label>
                            <input type="text" placeholder="Enter member name" required>
                        </div>

                        <div class="form-group">
                            <label>Age</label>
                            <input type="number" min="0" max="500">
                        </div>


                        <div class="form-group">
                            <label>Member Email</label>
                            <input type="email" placeholder="Enter member email" required>
                        </div>


                        <div class="form-group">
                            <label>School Year</label>
                            <input type="number" min="1900" max="2026">
                        </div>

                        <div class="form-group">
                            <label>Contact Number</label>
                            <input type="number" min="1900" max="2026">
                        </div>

                        <div class="form-actions">
                            <button type="submit"><b>Submit</b></button>
                        </div>

                    </form>
                </div>
            </div>

            <div id="borrowModal" class="modal">
                <div class="modal-content">
                    <span class="close" onclick="closeModal()">&times;</span>

                    <h2>Add Borrow Record</h2>

                    <form id="borrowForm">

                        <div class="form-group">
                            <label>Member ID</label>
                            <input type="text" placeholder="Enter member ID" required>
                        </div>


                        <div class="form-group">
                            <label>Book ID</label>
                            <input type="text" placeholder="Enter book ID" required>
                        </div>


                        <div class="form-group">
                            <label>Borrow Date</label>
                            <input type="date" required>
                        </div>

                        <div class="form-group">
                            <label>Due Date</label>
                            <input type="date" required>
                        </div>

                        <div class="form-group">
                            <label>Status</label>
                            <select>
                                <option>Borrowed</option>
                                <option>Available</option>
                            </select>
                        </div>

                        <div class="form-actions">
                            <button type="submit"><b>Submit</b></button>
                        </div>

                    </form>
                </div>
            </div>


            <!-- Information Pop Up -->
            <div class="MemberInfoModal">
                <div class="modal-content">
                    <span class="close" onclick="closeModal()">&times;</span>

                    <h2>Member Information</h2>

                    <div class="member-info-content">

                        <div class="member-header">
                            <h1>John Doe</h1>
                            <button class="edit-btn">Edit Information</button>
                            <button class="delete-btn">Delete Member</button>
                        </div>

                        <div class="info-row">
                            <span>ID Number:</span>
                            <p>#000001</p>
                        </div>

                        <div class="info-row">
                            <span>Age:</span>
                            <p>18</p>
                        </div>

                        <div class="info-row">
                            <span>Course:</span>
                            <p>Computer Science</p>
                        </div>

                        <div class="info-row">
                            <span>Year:</span>
                            <p>2</p>
                        </div>

                        <div class="info-row">
                            <span>Contact Number:</span>
                            <p>09084335123</p>
                        </div>

                        <div class="info-row">
                            <span>Email:</span>
                            <p>john.doe@example.com</p>
                        </div>

                    </div>
                </div>
            </div>



            <div class="BookInfoModal">
                <div class="modal-content">

                    <span class="close" onclick="closeModal()">&times;</span>

                    <h2>Book Information</h2>

                    <div class="book-info-content">

                        <!-- Book header -->
                        <div class="book-header">
                            <img src="Images/Book_Cover.png" alt="Book Cover" class="book-info-cover">

                            <div class="book-title-section">
                                <h1>I Have No Mouth But I Must Scream</h1>
                                <button class="edit-btn">Edit Book</button>
                                <button class="delete-btn">Delete Book</button>
                            </div>
                        </div>

                        <div class="info-row">
                            <span>Book ID:</span>
                            <p>#B00001</p>
                        </div>

                        <div class="info-row">
                            <span>Author:</span>
                            <p>Harlan Ellison</p>
                        </div>

                        <div class="info-row">
                            <span>Genre:</span>
                            <p>Horror / Sci-Fi</p>
                        </div>

                        <div class="info-row">
                            <span>Published Year:</span>
                            <p>1967</p>
                        </div>

                        <div class="info-row">
                            <span>Status:</span>
                            <p>Available</p>
                        </div>

                        <div class="info-row">
                            <span>Description:</span>
                            <p>A dystopian short story about AI torture and survival.</p>
                        </div>

                    </div>
                </div>
            </div>


            <div class="BorrowInfoModal">
                <div class="modal-content">

                    <span class="close" onclick="closeModal()">&times;</span>

                    <h2>Borrow Record Information</h2>

                    <div class="borrow-info-content">

                        <div class="borrow-header">

                            <img src="Images/Book_Cover.png" alt="Book Cover" class="borrow-info-cover">

                            <div class="book-title-section">
                                <h1>I Have No Mouth But I Must Scream</h1>
                                <button class="edit-btn">Edit Record</button>
                                <button class="delete-btn">Delete Record</button>
                            </div>

                        </div>


                        <div class="info-row">
                            <span>Borrow ID:</span>
                            <p>#000001</p>
                        </div>

                        <div class="info-row">
                            <span>Student ID:</span>
                            <p>#000001</p>
                        </div>

                        <div class="info-row">
                            <span>Borrow Date:</span>
                            <p>2026-01-01</p>
                        </div>

                        <div class="info-row">
                            <span>Due Date:</span>
                            <p>2026-01-15</p>
                        </div>

                        <div class="info-row">
                            <span>Status:</span>
                            <p>Overdue</p>
                        </div>

                    </div>

                </div>
            </div>


            <div id="confirmDeleteModal" class="modal">
                <div class="modal-content-delete">
                    <h2>Confirm Deletion</h2>
                    <p id="confirmMessage">Are you sure you want to delete this?</p>

                    <div class="form-actions">
                        <button id="cancelDelete">Cancel</button>
                        <button id="confirmDeleteBtn" style="background:red; color:white;">
                            Delete
                        </button>
                    </div>
                </div>
            </div>





        </div>

        <script src="script.js"></script>
</body>

</html>