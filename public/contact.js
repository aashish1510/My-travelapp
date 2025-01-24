// Name: Ashish Bhanvarbhai Yadav
// Student Number: 9004719 

document.addEventListener("DOMContentLoaded", function () {

    // Select the form element from the document
    const form = document.querySelector("form");

    // Add an event listener to handle form submission
    form.addEventListener("submit", function (event) {
        let isValid = true; // Variable to track form validity

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        // Clear any existing error messages before re-validating
        clearErrors();

        // Name validation (at least 3 characters, letters only)
        if (!/^[A-Za-z\s]{3,}$/.test(name)) {
            showError("name", "Full name must be at least 3 characters and contain only letters.");
            isValid = false;
        }

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError("email", "Please enter a valid email address.");
            isValid = false;
        }

        // Phone validation (10 digits only and valid format)
        if (!/^\([0-9]{3}\)-[0-9]{3}-[0-9]{4}$/.test(phone)) {
            showError("phone", "Please enter a valid 10-digit phone number format (XXX)-XXX-XXXX.");
            isValid = false;
        }

        // Message validation (at least 10 characters)
        if (message.length < 10) {
            showError("message", "Message must be at least 10 characters long.");
            isValid = false;
        }

        // Prevent form submission if any validation fails
        if (!isValid) {
            event.preventDefault();  // Stop form submission if validation fails
        } else {
            // Show success message and reset form if validation passes
            alert("Form submitted successfully!");
            form.reset();  // Clear the form fields after successful submission
        }
    });

    // Function to display error messages next to invalid input fields.
    function showError(inputId, message) {
        const inputElement = document.getElementById(inputId);
        const errorElement = document.createElement("small");

        // Add error message class and styles
        errorElement.className = "error-message";
        errorElement.style.color = "red";
        errorElement.innerText = message;

        // Remove existing error message if present
        if (inputElement.nextElementSibling && inputElement.nextElementSibling.classList.contains("error-message")) {
            inputElement.nextElementSibling.remove();
        }

        // Insert the error message after the input field
        inputElement.insertAdjacentElement("afterend", errorElement);
    }

    /* Function to remove all error messages before re-validation. Ensures previous validation errors do not persist.*/
    function clearErrors() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(error => error.remove());
    }
});
