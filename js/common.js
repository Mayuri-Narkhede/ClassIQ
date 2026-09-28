/* ================================
   1. Dynamic Component Loader (with file:// fallback)
================================ */
const TEMPLATES = {
    navbar: `
        <nav class="navbar">
            <div class="navbar-container">
                <a href="../Home/index.html" class="brand">
                    <span class="brand-name">ClassIQ</span>
                </a>
                <button class="nav-toggle" id="navToggle" onclick="toggleMobileMenu(event)">
                    <span class="hamburger"></span>
                </button>
                <div class="nav-menu" id="navMenu">
                    <div class="nav-center">
                        <a href="../Courses/courses.html" class="nav-link">Courses</a>
                    </div>
                    <div class="nav-actions">
                        <a href="../Authentication/signin.html" class="nav-button">Login</a>
                        <a href="../Authentication/signup.html" class="nav-button">SignUp</a>
                    </div>
                </div>
            </div>
        </nav>`,
    footer: `
        <footer class="site-footer">
            <div class="footer-container">
                <!-- LEFT SECTION -->
                <div class="footer-subscribe">
                    <a href="../Home/index.html" class="footer-logo">
                        <span class="footer-logo-icon">⛓</span>
                        <span class="footer-logo-text">ClassIQ</span>
                    </a>
                    <div class="subscribe-content">
                        <h3>Subscribe</h3>
                        <p>Subscribe for the latest courses, tips, and updates. Join our learning community today!</p>
                        <form class="subscribe-form">
                            <input type="email" placeholder="Enter your email" aria-label="Email address">
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>

                <!-- CLASSIQ BUSINESS -->
                <div class="footer-column">
                    <h3>ClassIQ Bussiness</h3>
                    <a href="#">Teach on ClassIQ</a>
                    <a href="#">Teaching Tools</a>
                    <a href="#">ClassIQ app</a>
                    <a href="#">Contact us</a>
                </div>

                <!-- CAREERS -->
                <div class="footer-column careers-column">
                    <h3>Careers</h3>
                    <a href="#">Blog</a>
                    <a href="#">Affiliate</a>
                    <a href="#">Support</a>
                </div>
            </div>

            <!-- BOTTOM FOOTER -->
            <div class="footer-bottom">
                <p>© 2024 ClassIQ. All rights reserved.</p>
                <div class="social-links">
                    <a href="#" aria-label="Instagram">◎</a>
                    <a href="#" aria-label="X">𝕏</a>
                    <a href="#" aria-label="LinkedIn">in</a>
                </div>
            </div>
        </footer>`
};

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
// document.addEventListener("DOMContentLoaded", async function () {
//     try {
//         const navbarResponse = await fetch("/components/Navbar.html");
//         if (navbarResponse.ok) {
//             const navbarHTML = await navbarResponse.text();
//             const navbarContainer = document.getElementById("navbar");
//             if (navbarContainer) {
//                 navbarContainer.innerHTML = navbarHTML;
//                 renderAuthUI();
//             }
//         }
//     } catch (error) {
//         console.error("Navbar loading failed:", error);
//     }

//     try {
//         const footerResponse = await fetch("/components/Footer.html");
//         if (footerResponse.ok) {
//             const footerHTML = await footerResponse.text();
//             const footerContainer = document.getElementById("footer");
//             if (footerContainer) {
//                 footerContainer.innerHTML = footerHTML;
//             }
//         }
//     } catch (error) {
//         console.error("Footer loading failed:", error);
//     }
// });

/* ================================
   Component Loader Helper
================================ */
async function loadDynamicComponent(containerId, relativePath) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Check if running directly via file:// protocol
    if (window.location.protocol === "file:") {
        console.warn(`file:// protocol detected. Using fallback template for #${containerId}.`);
        container.innerHTML = TEMPLATES[containerId] || "";
        return;
    }

    try {
        const response = await fetch(relativePath);
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`);
        }
        const html = await response.text();
        container.innerHTML = html;
    } catch (error) {
        console.warn(`Fetch failed for ${containerId}, rendering fallback template:`, error);
        container.innerHTML = TEMPLATES[containerId] || "";
    }
}

/* ================================
   Page Initialization
================================ */
document.addEventListener("DOMContentLoaded", async function () {
    // Correct depth calculation relative to D:/project/classIQ/pages/Home/index.html
    const path = window.location.pathname.replace(/\\/g, "/");
    const isSubfolder = path.includes("/pages/") || 
                        path.includes("/Home/") || 
                        path.includes("/Authentication/") || 
                        path.includes("/Courses/");

    const basePath = isSubfolder ? "../../Components/" : "Components/";

    // Load components sequentially
    await loadDynamicComponent("navbar", `${basePath}Navbar.html`);
    await loadDynamicComponent("footer", `${basePath}Footer.html`);

    // Render Auth buttons (Login/Logout)
    if (typeof renderAuthUI === "function") {
        renderAuthUI();
    }

    // Initialize password toggle logic
    if (typeof setupPasswordToggle === "function") {
        setupPasswordToggle();
    }
});

/* ================================
   Password Visibility Toggle Helper
================================ */
function setupPasswordToggle() {
    if (window.passwordToggleInitialized) return;
    window.passwordToggleInitialized = true;

    // Use event delegation on document level
    document.addEventListener("click", function (event) {
        // Match toggle button or any child element inside it
        const toggle = event.target.closest(".password-toggle, #passwordToggle");
        if (!toggle) return;

        // Prevent default form behavior/focus loss
        event.preventDefault();

        // Find the input element relative to wrapper or form-group
        const wrapper = toggle.closest(".password-wrapper") || toggle.closest(".form-group") || toggle.parentElement;
        const passwordInput = wrapper 
            ? wrapper.querySelector("input[type='password'], input[type='text']") 
            : document.getElementById("password");

        if (!passwordInput) return;

        // Toggle input type and icon
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            toggle.textContent = "🙈"; // Visible state icon
            toggle.setAttribute("aria-label", "Hide password");
        } else {
            passwordInput.type = "password";
            toggle.textContent = "👁"; // Hidden state icon
            toggle.setAttribute("aria-label", "Show password");
        }
    });
}

// Call setup immediately to ensure delegation listener is active
setupPasswordToggle();

// Also run on DOMContentLoaded as a fallback
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupPasswordToggle);
}