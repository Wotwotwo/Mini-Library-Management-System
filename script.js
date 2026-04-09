// ------------------ Section toggle code ------------------
const navLinks = document.querySelectorAll('.nav-links a');
const overviewContent = document.querySelector('.content_overview');
const booksContent = document.querySelector('.content_books');
const membersContent = document.querySelector('.content_Members');

// Helper to hide all content sections
function hideAllContent() {
    overviewContent.style.display = 'none';
    booksContent.style.display = 'none';
    membersContent.style.display = 'none';
}

// Show dashboard by default
hideAllContent();
overviewContent.style.display = 'flex';

// Add click listeners to sidebars
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        hideAllContent();

        const text = link.textContent.trim().toLowerCase();

        if(text === 'dashboard') {
            overviewContent.style.display = 'flex';
        } else if(text === 'books') {
            booksContent.style.display = 'flex';
        } else if(text === 'members') {
            membersContent.style.display = 'flex';
        } else if(text === 'borrow records') {
            // placeholder
            alert('Borrow Records section not implemented yet');
        }
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