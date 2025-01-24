// Name: Ashish Bhanvarbhai Yadav
// Student Number: 9004719 

// Import Firebase modules for app initialization and authentication
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFrozOivn2TOtb6HIWWP5t4OtCD21EwKY",
  authDomain: "travel-event-app-a545b.firebaseapp.com",
  projectId: "travel-event-app-a545b",
  storageBucket: "travel-event-app-a545b.firebasestorage.app",
  messagingSenderId: "526063209226",
  appId: "1:526063209226:web:38628b9f45c72a1c5288f3",
  measurementId: "G-8WKDLFNDB9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Select the form submit button by its ID
const submit = document.getElementById('submit');

// Event listener for form submission when the submit button is clicked
submit.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get user input values
    const firstname = document.getElementById('firstname').value.trim();
    const lastname = document.getElementById('lastname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validation functions

    // Function to validate first and last name (only letters allowed)
    function validateName(name) {
        // Regular expression to allow only letters (uppercase and lowercase)
        const namePattern = /^[A-Za-z]+$/;
        return name.trim() !== "" && namePattern.test(name);
    }

    // Function to validate phone number (format: (XXX)-XXX-XXXX)
    function validatePhone(phone) {
        const phonePattern = /^\([0-9]{3}\)-[0-9]{3}-[0-9]{4}$/;
        return phonePattern.test(phone);
    }

    // Function to validate email address format
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

     // Function to validate password (minimum 6 characters, at least one uppercase, one number, and one special character)
    function validatePassword(password) {
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);
    }

    // Error messages (Validation Checks)
    if (!validateName(firstname)) {
        alert("First name is required and should contain only letters.");
        return;
    }

    if (!validateName(lastname)) {
        alert("Last name is required and should contain only letters.");
        return;
    }

    if (!validatePhone(phone)) {
        alert("Please enter a valid phone number in the format (XXX)-XXX-XXXX.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!validatePassword(password)) {
        alert("Password must be at least 6 characters long, contain at least one uppercase letter, one number, and one special character.");
        return;
    }

    // Firebase Signup Process
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Successful account creation
            alert("Account created successfully!");
            window.location.replace("./public/login.html"); // Redirect user to the login page
        })
        .catch((error) => {
            // Handle errors from Firebase signup
            const errorMessage = error.message;
            alert(errorMessage); // Display error message to the user
        });
});
