document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        console.error("loginForm element not found in DOM.");
        return;
    }

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
        const password = passwordInput ? passwordInput.value : "";

        // Helper trigger to handle toast safely
        function triggerToast(msg, type = "error") {
            if (typeof window.showToast === "function") {
                window.showToast(msg, type);
            } else {
                alert(msg); // Fallback if toast hasn't initialized
            }
        }

        if (!email || !password) {
            triggerToast("Please enter both email and password.", "error");
            return;
        }

        // Retrieve saved users array
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Validate user identity
        const validUser = existingUsers.find(
            (user) => user.email === email && user.password === password
        );

        if (!validUser) {
            triggerToast("Invalid email or password. Please try again.", "error");
            return;
        }

        // Save active user session
        localStorage.setItem("currentUser", JSON.stringify(validUser));

        triggerToast("Sign in successful! Redirecting...", "success");

        setTimeout(() => {
            window.location.href = "../Courses/courses.html";
        }, 1200);
    });
});