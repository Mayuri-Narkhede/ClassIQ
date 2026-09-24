
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get inputs matching the HTML element IDs
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const email = emailInput ? emailInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value : "";

    console.log("Login submitted:", {
        email,
        password
    });

    // Redirect to Courses page
    window.location.href = "../Courses/courses.html";
});