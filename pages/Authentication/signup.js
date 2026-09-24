/* ================================
   Load Common Components
================================ */

async function loadComponent(elementId, filePath) {

    try {

        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Unable to load ${filePath}`);
        }

        const html = await response.text();

        document.getElementById(elementId).innerHTML = html;

    } catch (error) {

        console.error(error);

    }
}


loadComponent("navbar", "../Components/Navbar.html");
loadComponent("footer", "../Components/Footer.html");


/* ================================
   Signup Form
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

    /*
       Example valid:
       abc@gmail.com
       test123@gmail.com

       Invalid:
       abc@
       abc@gmail
       abc.com
    */

    const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


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


    if (nameValue === "") {

        showError(fullName);

        return false;
    }


    /*
       Name should contain only letters and spaces.
       Allows names such as:

       Mayuri
       Mayuri Narkhede
       John Smith
    */

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


    /*
       Password requirements:

       Minimum 8 characters
       At least 1 uppercase
       At least 1 number
       At least 1 special character
    */

    const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=[\]\\;'\/`~]).{8,}$/;


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
   Submit
================================ */

signupForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const isEmailValid = validateEmail();
    const isNameValid = validateName();
    const isPasswordValid = validatePassword();


    if (
        !isEmailValid ||
        !isNameValid ||
        !isPasswordValid
    ) {

        return;
    }


    /*
       All validations passed.
       Backend/API integration can be added here.
    */

    window.location.href = "../Authentication/Signin.html";

});


/* ================================
   Real-time Validation
================================ */

email.addEventListener("blur", validateEmail);

fullName.addEventListener("blur", validateName);

password.addEventListener("blur", validatePassword);


/* ================================
   Remove Error While Typing
================================ */

email.addEventListener("input", function () {

    if (email.value.trim() !== "") {
        hideError(email);
    }

});


fullName.addEventListener("input", function () {

    if (fullName.value.trim() !== "") {
        hideError(fullName);
    }

});


password.addEventListener("input", function () {

    if (password.value !== "") {
        hideError(password);
    }

});


/* ================================
   Show / Hide Password
================================ */

const passwordToggle =
    document.getElementById("passwordToggle");


passwordToggle.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        passwordToggle.textContent = "🙈";

        passwordToggle.setAttribute(
            "aria-label",
            "Hide password"
        );

    } else {

        password.type = "password";

        passwordToggle.textContent = "👁";

        passwordToggle.setAttribute(
            "aria-label",
            "Show password"
        );

    }

});