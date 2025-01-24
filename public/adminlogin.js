// Name: Ashish Bhanvarbhai Yadav
// Student Number: 9004719

// Import Firebase modules for app initialization and authentication
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

//Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFrozOivn2TOtb6HIWWP5t4OtCD21EwKY",
  authDomain: "travel-event-app-a545b.firebaseapp.com",
  projectId: "travel-event-app-a545b",
  storageBucket: "travel-event-app-a545b.firebasestorage.app",
  messagingSenderId: "526063209226",
  appId: "1:526063209226:web:38628b9f45c72a1c5288f3",
  measurementId: "G-8WKDLFNDB9"
};

// Initialize Firebase app 
const app = initializeApp(firebaseConfig);

// Get authentication service from Firebase
const auth = getAuth();


/* 
  Event listener for form submission.
  - Listens for a click event on the submit button.
  - Prevents default form submission behavior to handle the request via Firebase.
  - Retrieves user input values (email and password).
  - Triggers Firebase authentication for user login.
*/


// Selecting the submit button from the DOM
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
  event.preventDefault(); // Prevents page reload on form submission

  // Retrieve email and password values from input fields
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Basic input validation (checks if fields are empty)
  if (email === "" || password === "") {
    alert("Please enter both email and password.");
    return;
  }

  /* 
    Sign in user with email and password using Firebase Authentication.
    - If successful, redirects the user to the admin-only page.
    - If login fails, an alert displays the error message.
  */

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successfully signed in
      const user = userCredential.user; // User object containing authenticated user data
      window.location.href = "adminonly.html"; // Redirecting to the admin-only page
    })
    .catch((error) => {
      // Handle authentication errors
      const errorCode = error.code; // Firebase error code
      const errorMessage = error.message; // Firebase error message
      alert(errorMessage); // Display error message to the user
    });

});
