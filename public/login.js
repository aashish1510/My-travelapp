// Name: Ashish Bhanvarbhai Yadav
// Student Number: 9004719 

// Import Firebase modules for app initialization and authentication
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

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

//Submit
const submit = document.getElementById('submit');

// Add event listener to handle form submission when the submit button is clicked
submit.addEventListener("click",function(event){
    event.preventDefault() // Prevent default form submission behavior

// Retrieve email and password input values from form fields
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;


// Firebase Sign-in process
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user; // Retrieve user object
    window.location.href="booking.html"; // Redirect user to the booking page
  })
  .catch((error) => {
     // Handle authentication errors
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage) // Display error message to the user
  });
})