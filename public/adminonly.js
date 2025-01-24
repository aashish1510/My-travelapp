// Name: Ashish Bhanvarbhai Yadav
// Student Number: 9004719 

// Import Firebase modules for app initialization and authentication
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

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
 Function to retrieve and display booking data from Firebase.
  -Fetches booking records from the 'user' node.
  -Populates the HTML table with the retrieved data.
 */
// Function to retrieve and display data from Firebase
function SelectAllData() {
    const dbRef = ref(db, 'user');

    // Attach an event listener to fetch data in real-time
    onValue(dbRef, (snapshot) => {
        document.getElementById('tbody1').innerHTML = ""; // Clear the table before populating new data
        let sno = 0;
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                let data = childSnapshot.val();
                // Add retrieved data to the table
                AddItemsToTable(++sno, childSnapshot.key, data.name, data.email, data.phone, data.destinations.join(", "), data.date, data.travelers, data.message);
            });
        } else {
            // Display message if no bookings are found
            document.getElementById('tbody1').innerHTML = "<tr><td colspan='8'>No bookings available</td></tr>";
        }
    }, (error) => {
        // Handle any errors that occur while retrieving data
        console.error("Error retrieving data: ", error);
    });
}

// Function to add data to the table
function AddItemsToTable(sno, id, name, email, phone, destinations, date, travelers, message) {
    var tbody = document.getElementById('tbody1');
    var trow = document.createElement('tr');

    // Populate the row with booking details and action buttons
    trow.innerHTML = `
        <td>${sno}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${destinations}</td>
        <td>${date}</td>
        <td>${travelers}</td>
        <td>${message}</td>
        <td>
            <!-- Edit and Delete action buttons -->
            <button onclick="EditData('${id}', '${name}', '${email}', '${phone}', '${destinations}', '${date}', '${travelers}', '${message}')">Edit</button>
            <button onclick="DeleteData('${id}')">Delete</button>
        </td>
    `;

    tbody.appendChild(trow); // Append the newly created row to the table body
}

// Function to delete data from firebase
window.DeleteData = function (id) {
    if (confirm("Are you sure you want to delete this record?")) {
        remove(ref(db, 'user/' + id)).then(() => alert("Data deleted successfully!"));
    }
}

// Function to edit data
window.EditData = function (id, name, email, phone, destinations, date, travelers, message) {
    // Construct query parameters to pass data to the booking page
    const queryString = `?id=${id}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&destination=${encodeURIComponent(destinations)}&date=${date}&travelers=${travelers}&message=${encodeURIComponent(message)}`;

    // Redirect the user to the 'booknow.html' page with query parameters
    window.location.href = `booknow.html${queryString}`;
}

// Load all data on page load
window.onload = SelectAllData;

