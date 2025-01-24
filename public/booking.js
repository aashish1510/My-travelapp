// Name: Ashish Bhanvarbhai Yadav
// Student Number: 9004719 

// Import Firebase modules for app initialization and authentication
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, push, update } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

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
const db = getDatabase(app);

/*
 * Function to validate user's full name.
 * Allows only alphabets and spaces.
 */
function validateName(name) {
    const namePattern = /^[A-Za-z\s]+$/;
    return name.trim() !== "" && namePattern.test(name);
}

/* Function to validate phone number format (XXX)-XXX-XXXX.*/
function validatePhone(phone) {
    const phonePattern = /^\(\d{3}\)-\d{3}-\d{4}$/;
    return phonePattern.test(phone);
}

/*Function to validate email address format.*/
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* Function to validate number of travelers.
 * Ensures a positive integer is entered.*/
function validateTravelers(travelers) {
    return travelers > 0 && Number.isInteger(Number(travelers));
}

/* Function to validate travel date.
 * Ensures the selected date is today or a future date.*/
function validateDate(date) {
    const today = new Date().toISOString().split('T')[0];
    return date >= today;
}

/*Function to ensure at least one destination is selected.*/
function validateDestination(destination) {
    return destination !== "";
}

// Function to get selected checkbox values
function getSelectedDestinations() {
    const checkboxes = document.querySelectorAll('input[name="destination"]:checked');
    let selectedDestinations = [];
    checkboxes.forEach((checkbox) => {
        selectedDestinations.push(checkbox.value);
    });
    return selectedDestinations;
}

// Function to prefill form with data from URL params. Extracts data from the query string and populates the form.
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id'),
        name: params.get('name'),
        email: params.get('email'),
        phone: params.get('phone'),
        destinations: params.get('destination') ? params.get('destination').split(",") : [],
        date: params.get('date'),
        travelers: params.get('travelers'),
        message: params.get('message')
    };
}


// Populate form fields if editing an existing booking
const formData = getQueryParams();
if (formData.id) {
    document.getElementById('name').value = formData.name;
    document.getElementById('email').value = formData.email;
    document.getElementById('phone').value = formData.phone;
    document.getElementById('date').value = formData.date;
    document.getElementById('travelers').value = formData.travelers;
    document.getElementById('message').value = formData.message;
    document.getElementById('submit').value = "Update Booking";

    // Prefill checkbox values
    formData.destinations.forEach(dest => {
        let checkbox = document.querySelector(`input[value="${dest}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }
    });
}

// Form submission event listener
document.querySelector('.bookingForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve input values from the form
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value.trim();
    const travelers = document.getElementById('travelers').value.trim();
    const message = document.getElementById('message').value.trim();
    const destinations = getSelectedDestinations();  // Get selected destinations


    // Perform input validations
    if (!validateName(name)) {
        alert("Full name is required and should contain only letters.");
        return;
    }
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    if (!validatePhone(phone)) {
        alert("Please enter a valid phone number in the format (XXX)-XXX-XXXX.");
        return;
    }

    if (!validateTravelers(travelers)) {
        alert("Please enter a valid number of travelers (minimum 1).");
        return;
    }
    if (!validateDate(date)) {
        alert("Please select a valid future travel date.");
        return;
    }

    if (destinations.length === 0) {
        alert("Please select at least one destination.");
        return;
    }

    // Create booking data object
    const bookingData = { name, email, phone, destinations, date, travelers, message };


    // Update existing booking or create a new one
    if (formData.id) {
        update(ref(db, 'user/' + formData.id), bookingData)
            .then(() => {
                alert("Booking updated successfully!");
                window.location.href = "adminonly.html";
            })
            .catch((error) => {
                console.error("Error updating data: ", error);
            });
    } else {
        push(ref(db, 'user'), bookingData)
            .then(() => {
                alert("Booking added successfully!");
                window.location.href = "booking.html";
            })
            .catch((error) => {
                console.error("Error adding data: ", error);
            });
    }
});
