document.addEventListener("DOMContentLoaded", function () {
    const openRegister = document.getElementById("openRegister");
    const registerModal = document.getElementById("register-confirmation");

    openRegister.addEventListener("click", function (e) {
        e.preventDefault();
        registerModal.style.display = "flex";
    });

    registerModal.addEventListener("click", function (e) {
        if (e.target === registerModal) {
            registerModal.style.display = "none";
        }
    });
});

function goToRegister(role) {
    if (role === "admin") {
        window.location.href = "register_admin.html";
    } else if (role === "student") {
        window.location.href = "register_student.html";
    }
}
