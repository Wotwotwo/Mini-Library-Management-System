// ------------------ Section toggle code ------------------
const navLinks = document.querySelectorAll('.nav-links a');
const overviewContent = document.querySelector('.content_overview');
const booksContent = document.querySelector('.content_books');
const membersContent = document.querySelector('.content_Members');
const borrowContent = document.querySelector('.content_borrow');


const overviewCards = document.querySelectorAll('.overview-card');

// Hide all sections
function hideAllContent() {
    overviewContent.style.display = 'none';
    booksContent.style.display = 'none';
    membersContent.style.display = 'none';
    borrowContent.style.display = 'none';
}

// Default (Dashboard)
hideAllContent();
overviewContent.style.display = 'flex';
navLinks[0].classList.add('active'); // highlight dashboard

// Click events
navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove highlight
        navLinks.forEach(l => l.classList.remove('active'));

        // Add highlight
        link.classList.add('active');

        hideAllContent();

        // Switch content using index
        if (index === 0) {
            overviewContent.style.display = 'flex';
        }
        else if (index === 1) {
            booksContent.style.display = 'flex';
            loadBooks();
            console.log("Books section loaded");
        }
        else if (index === 2) {
            membersContent.style.display = 'flex';
        }
        else if (index === 3) {
            borrowContent.style.display = 'flex';
        }
    });
});


overviewCards.forEach((card, index) => {
    card.addEventListener('click', () => {

        if (index === 0) {
            navLinks[2].click();
        } else if (index === 1) {
            navLinks[1].click();
        } else if (index === 2 || index === 3) {
            navLinks[3].click();
        }
    });
});



// ------------------ Modals and POPUPS ------------------
// ===================== EDIT FUNCTIONALITY =====================

// BOOK EDIT
document.querySelector(".BookInfoModal .edit-btn")
    ?.addEventListener("click", () => {
        bookModal.style.display = "flex";

        // Change modal title
        bookModal.querySelector("h2").textContent = "Edit Book";
    });

// MEMBER EDIT
document.querySelector(".MemberInfoModal .edit-btn")
    ?.addEventListener("click", () => {
        membersModal.style.display = "flex";

        membersModal.querySelector("h2").textContent = "Edit Member";
    });

// BORROW EDIT
document.querySelector(".BorrowInfoModal .edit-btn")
    ?.addEventListener("click", () => {
        borrowModal.style.display = "flex";

        borrowModal.querySelector("h2").textContent = "Edit Borrow Record";
    });


// ===================== DELETE SYSTEM =====================

const confirmDeleteModal = document.getElementById("confirmDeleteModal");
const confirmMessage = document.getElementById("confirmMessage");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDelete");

let deleteTarget = null;

// OPEN CONFIRM MODAL
function openDeleteConfirm(target, message) {
    deleteTarget = target;
    confirmMessage.textContent = message;
    confirmDeleteModal.style.display = "flex";
}

// CANCEL DELETE
cancelDeleteBtn.addEventListener("click", () => {
    deleteTarget = null;
    confirmDeleteModal.style.display = "none";
});

// CONFIRM DELETE
confirmDeleteBtn.addEventListener("click", () => {
    if (deleteTarget) {
        deleteTarget.remove();
        deleteTarget = null;
    }
    confirmDeleteModal.style.display = "none";
    closeModal(); // also close info modal after delete
});


// ===================== DELETE BUTTON HOOKS =====================

// BOOK DELETE
document.querySelector(".BookInfoModal .delete-btn")
    ?.addEventListener("click", () => {
        const activeCard = document.querySelector(".books-instance");
        openDeleteConfirm(activeCard, "Delete this book?");
    });

// MEMBER DELETE
document.querySelector(".MemberInfoModal .delete-btn")
    ?.addEventListener("click", () => {
        const activeCard = document.querySelector(".members-instance");
        openDeleteConfirm(activeCard, "Delete this member?");
    });

// BORROW DELETE
document.querySelector(".BorrowInfoModal .delete-btn")
    ?.addEventListener("click", () => {
        const activeCard = document.querySelector(".borrow-instance");
        openDeleteConfirm(activeCard, "Delete this record?");
    });


// CLOSE CONFIRM MODAL ON OUTSIDE CLICK
window.addEventListener("click", (e) => {
    if (e.target === confirmDeleteModal) {
        confirmDeleteModal.style.display = "none";
        deleteTarget = null;
    }
});




// ===================== MODALS =====================
const bookModal = document.getElementById("bookModal");
const membersModal = document.getElementById("membersModal");
const borrowModal = document.getElementById("borrowModal");

// Info modals
const memberInfoModal = document.querySelector(".MemberInfoModal");
const bookInfoModal = document.querySelector(".BookInfoModal");
const borrowInfoModal = document.querySelector(".BorrowInfoModal");


// ===================== OPEN MODALS =====================

// Add Book
document.querySelector(".content_books .add-book-btn")
    .addEventListener("click", () => {
        bookModal.style.display = "flex";
    });

// Add Member
document.querySelector(".content_Members .add-book-btn")
    .addEventListener("click", () => {
        membersModal.style.display = "flex";
    });

// Add Borrow
document.querySelector(".content_borrow .add-book-btn")
    ?.addEventListener("click", () => {
        borrowModal.style.display = "flex";
    });


// ===================== CLOSE MODAL =====================
function closeModal() {
    bookModal.style.display = "none";
    membersModal.style.display = "none";
    borrowModal.style.display = "none";

    memberInfoModal.style.display = "none";
    bookInfoModal.style.display = "none";
    borrowInfoModal.style.display = "none";
}


// X BUTTONS
document.querySelectorAll(".close").forEach(btn => {
    btn.addEventListener("click", closeModal);
});


// OUTSIDE CLICK CLOSE
window.addEventListener("click", (e) => {
    if (e.target === bookModal) closeModal();
    if (e.target === membersModal) closeModal();
    if (e.target === borrowModal) closeModal();
    if (e.target === registerModal) closeModal();

    if (e.target === memberInfoModal) closeModal();
    if (e.target === bookInfoModal) closeModal();
    if (e.target === borrowInfoModal) closeModal();
});


// ESC KEY CLOSE
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});


// ===================== OPEN INFO MODALS =====================

// MEMBER VIEW BUTTON
document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        memberInfoModal.style.display = "flex";
    });
});


// BOOK CARD CLICK
document.querySelector(".books-container").addEventListener("click", async (e) => {

    const card = e.target.closest(".books-instance");

    if (!card) return;

    const bookId = card.dataset.id;

    bookInfoModal.style.display = "flex";

    try {
        const response = await fetch(
            `http://localhost/Mini-Library-Management-System/database.php?action=get_book_details&id=${bookId}`
        );



        const data = await response.json();

        console.log("Book data:", data);

        // if PHP returned an error
        if (data.error) {
            alert(data.error);
            return;
        }

        // fill modal with data
        const modal = document.querySelector(".BookInfoModal");

        // Title
        modal.querySelector(".book-title-section h1").textContent = data.title;

        // Book Cover (optional but useful)
        modal.querySelector(".book-info-cover").src =
            data.image_path ? "Images/" + data.image_path : "Images/Book_Cover.png";

        // Book ID
        modal.querySelectorAll(".info-row p")[0].textContent =
            "#B" + String(data.book_id).padStart(5, "0");

        // Author
        modal.querySelectorAll(".info-row p")[1].textContent = data.author;

        // Genre
        modal.querySelectorAll(".info-row p")[2].textContent = data.genre;

        // Published Year
        modal.querySelectorAll(".info-row p")[3].textContent = data.published_year;

        // Status
        modal.querySelectorAll(".info-row p")[4].textContent = data.status;

        // Description
        modal.querySelectorAll(".info-row p")[5].textContent = data.description;
    } catch (err) {
        console.error("Fetch failed:", err);
    }
});

// BORROW ROW CLICK
document.querySelectorAll(".borrow-instance").forEach(card => {
    card.addEventListener("click", () => {
        borrowInfoModal.style.display = "flex";
    });
});






// ------------------ Donut Chart for Books Status ------------------
const ctx = document.getElementById('bookDonutChart').getContext('2d');

// Data
const data = {
    labels: ['Available', 'Overdue', 'Borrwed'],
    datasets: [{
        data: [453, 12, 87],
        backgroundColor: [
            '#8979FF', // Available
            '#FF928A', // Overdue
            '#3CC3DF'  // Borrwed
        ],
        borderWidth: 0,
        cutout: '60%' // smaller cutout = thicker donut
    }]
};

// Determine largest value for center
const maxIndex = data.datasets[0].data.indexOf(Math.max(...data.datasets[0].data));
const percentage = Math.round((data.datasets[0].data[maxIndex] /
    data.datasets[0].data.reduce((a, b) => a + b) * 100));
const labelText = data.labels[maxIndex];

// Center Text
const centerTextPlugin = {
    id: 'centerText',
    beforeDraw(chart) {
        const { ctx, width, height } = chart;
        ctx.save();

        const centerY = height / 2 + 30;

        ctx.font = "bold 80px sans-serif"; // Size of main text
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(percentage + "%", (width + 35) / 2, centerY - 10);

        ctx.font = "20px sans-serif"; // size of label text
        ctx.fillStyle = "#666";
        ctx.fillText(labelText, (width) / 2, centerY + 45);

        ctx.restore();
    }
};

// Chart options
const options = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
            labels: {
                usePointStyle: true,  // circular dots for label Icon
                pointStyle: 'circle',
                boxWidth: 16,         // size of label Icon
                padding: 30,          // increased space between labels
                font: {
                    size: 16,         // text size of labels
                    weight: 'bold'
                }
            }
        },
        tooltip: { enabled: true }
    }
};

// Create chart
new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options,
    plugins: [centerTextPlugin]
});


// ===================== BACKEND CONNECTION ======================
function loadBooks() {
    const container = document.querySelector(".books-container");

    fetch("http://localhost/Mini-Library-Management-System/database.php?action=get_books")
        .then(res => res.json())
        .then(books => {

            container.innerHTML = "";

            books.forEach(book => {

                const status = (book.status || "Unknown").toLowerCase();

                container.innerHTML += `
                    <div class="books-instance" data-id="${book.book_id}">
                        <img src="${book.image_path ? 'Images/' + book.image_path : 'Images/Book_Cover.png'}" class="book-cover">

                        <h2>${book.title}</h2>
                        <p>${book.author}</p>

                        <span class="status ${status}">
                            ${book.status}
                        </span>
                    </div>
                `;
            });
        })
}   