/* ================================
   1. Global Toast Notification Utility
================================ */
window.showToast = function (message, type = "error") {
    let toast = document.getElementById("toast");

    // Dynamically build the container if it doesn't exist in DOM
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }

    // Set content and styles
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    // Remove visible state after 3 seconds
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
};

/* ================================
   2. Global Mobile Toggle
================================ */
window.toggleMobileMenu = function (event) {
    if (event) event.stopPropagation();

    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    if (navToggle && navMenu) {
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
    }
};

/* ================================
   3. Auth UI Updater
================================ */
function renderAuthUI() {
    const navActions = document.querySelector(".nav-actions");
    if (!navActions) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
        navActions.innerHTML = `
            <button id="logoutBtn" class="nav-button logout-button" type="button">
                Logout
            </button>
        `;

        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", handleLogout);
        }
    }
}

function handleLogout() {
    localStorage.removeItem("currentUser");
    window.showToast("Logged out successfully!", "success");

    setTimeout(() => {
        window.location.href = "../Home/index.html";
    }, 1000);
}

/* ================================
   4. Component Loader
================================ */
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const navbarResponse = await fetch("/components/navbar.html");
        if (navbarResponse.ok) {
            const navbarHTML = await navbarResponse.text();
            const navbarContainer = document.getElementById("navbar");
            if (navbarContainer) {
                navbarContainer.innerHTML = navbarHTML;
                renderAuthUI();
            }
        }
    } catch (error) {
        console.error("Navbar loading failed:", error);
    }

    try {
        const footerResponse = await fetch("/components/footer.html");
        if (footerResponse.ok) {
            const footerHTML = await footerResponse.text();
            const footerContainer = document.getElementById("footer");
            if (footerContainer) {
                footerContainer.innerHTML = footerHTML;
            }
        }
    } catch (error) {
        console.error("Footer loading failed:", error);
    }
});

/* ================================
   Password Visibility Toggle Helper
================================ */
function setupPasswordToggle() {
    // Select all elements with class .password-toggle or ID #passwordToggle
    const toggles = document.querySelectorAll(".password-toggle, #passwordToggle");

    toggles.forEach((toggle) => {
        // Prevent duplicate listener attachments
        if (toggle.dataset.listenerAttached) return;
        toggle.dataset.listenerAttached = "true";

        toggle.addEventListener("click", function () {
            // Find password input relative to container or adjacent sibling
            const container = toggle.closest(".form-group") || toggle.parentElement;
            const passwordInput = container ? container.querySelector("input[type='password'], input[type='text']") : document.getElementById("password");

            if (!passwordInput) return;

            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                toggle.textContent = "🙈"; // Icon when password is visible
                toggle.setAttribute("aria-label", "Hide password");
            } else {
                passwordInput.type = "password";
                toggle.textContent = "👁"; // Icon when password is hidden
                toggle.setAttribute("aria-label", "Show password");
            }
        });
    });
}

// Automatically initialize toggles when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    setupPasswordToggle();
});