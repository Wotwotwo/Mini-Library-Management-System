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
document.querySelectorAll(".books-instance").forEach(card => {
    card.addEventListener("click", () => {
        bookInfoModal.style.display = "flex";
    });
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
                   data.datasets[0].data.reduce((a,b) => a+b) * 100));
const labelText = data.labels[maxIndex];

// Center Text
const centerTextPlugin = {
    id: 'centerText',
    beforeDraw(chart) {
        const {ctx, width, height} = chart;
        ctx.save();

        const centerY = height / 2 + 30;

        ctx.font = "bold 80px sans-serif"; // Size of main text
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(percentage + "%", (width +35)/ 2, centerY - 10);

        ctx.font = "20px sans-serif"; // size of label text
        ctx.fillStyle = "#666";
        ctx.fillText(labelText, (width ) / 2, centerY + 45);

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