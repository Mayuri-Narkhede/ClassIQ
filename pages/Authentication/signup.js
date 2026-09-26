/* ================================
   Signup Form Elements
================================ */
const signupForm = document.getElementById("signupForm");
const email = document.getElementById("email");
const fullName = document.getElementById("fullName");
const password = document.getElementById("password");

/* ================================
   Validation Helpers
================================ */
function showError(input, message) {
    const formGroup = input.closest(".form-group");
    const errorText = formGroup.querySelector(".error-text");
    
    if (errorText) {
        errorText.textContent = message;
    }
    
    formGroup.classList.add("error");
}

function hideError(input) {
    const formGroup = input.closest(".form-group");
    formGroup.classList.remove("error");
}

/* ================================
   Email Validation
================================ */
function validateEmail() {
    const emailValue = email.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailValue === "") {
        showError(email, "Please fill out this field.");
        return false;
    }

    if (!emailRegex.test(emailValue)) {
        showError(email, "Please enter a valid email address.");
        return false;
    }

    hideError(email);
    return true;
}

/* ================================
   Name Validation
================================ */
function validateName() {
    const nameValue = fullName.value.trim();
    const nameRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;

    if (nameValue === "") {
        showError(fullName, "Please fill out this field.");
        return false;
    }

    if (!nameRegex.test(nameValue)) {
        showError(fullName, "Name must contain letters and spaces only.");
        return false;
    }

    hideError(fullName);
    return true;
}

/* ================================
   Password Validation
================================ */
function validatePassword() {
    const passwordValue = password.value;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=[\]\\;'\/`~]).{8,}$/;

    if (passwordValue === "") {
        showError(password, "Please fill out this field.");
        return false;
    }

    if (!passwordRegex.test(passwordValue)) {
        showError(
            password,
            "Password must be 8+ chars with uppercase, number, & special char."
        );
        return false;
    }

    hideError(password);
    return true;
}

/* ================================
   Signup Form Submission
================================ */
if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const isEmailValid = validateEmail();
        const isNameValid = validateName();
        const isPasswordValid = validatePassword();

        if (!isEmailValid || !isNameValid || !isPasswordValid) {
            window.showToast("Please fix the errors in the form.", "error");
            return;
        }

        const emailValue = email.value.trim().toLowerCase();
        const passwordValue = password.value;
        const nameValue = fullName.value.trim();

        // Retrieve existing users list from localStorage
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Check if user already registered
        const userExists = existingUsers.some(user => user.email === emailValue);

        if (userExists) {
            window.showToast("An account with this email already exists!", "error");
            return;
        }

        // Save new user object
        const newUser = {
            name: nameValue,
            email: emailValue,
            password: passwordValue
        };

        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));

        window.showToast("Sign up successful! Redirecting to login...", "success");

        // Redirect to Signin page after delay
        setTimeout(() => {
            window.location.href = "../Authentication/signin.html";
        }, 1500);
    });
}

/* ================================
   Real-time & Input Event Listeners
================================ */
if (email && fullName && password) {
    email.addEventListener("blur", validateEmail);
    fullName.addEventListener("blur", validateName);
    password.addEventListener("blur", validatePassword);

    email.addEventListener("input", function () {
        if (email.value.trim() !== "") hideError(email);
    });

    fullName.addEventListener("input", function () {
        if (fullName.value.trim() !== "") hideError(fullName);
    });

    password.addEventListener("input", function () {
        if (password.value !== "") hideError(password);
    });
}

/* ================================
   Show / Hide Password
================================ */
const passwordToggle = document.getElementById("passwordToggle");

if (passwordToggle && password) {
    passwordToggle.addEventListener("click", function () {
        if (password.type === "password") {
            password.type = "text";
            passwordToggle.textContent = "🙈";
            passwordToggle.setAttribute("aria-label", "Hide password");
        } else {
            password.type = "password";
            passwordToggle.textContent = "👁";
            passwordToggle.setAttribute("aria-label", "Show password");
        }
    });
}