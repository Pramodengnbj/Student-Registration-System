// Accessing the elements
let student = document.getElementById("Name");
let studentID = document.getElementById("ID");
let email = document.getElementById("Email");
let contacts = document.getElementById("Contacts");
let submit = document.getElementById("submit");
let tablebody = document.getElementById("tb");
let clearall = document.getElementById("clear");

let editIndex = null;

// Load stored data on page load
document.addEventListener("DOMContentLoaded", loadData);

submit.addEventListener("click", function (e) {
    e.preventDefault();

    // Validation
    if (!validateInputs()) return;

    let studentData = {
        name: student.value.trim(),
        id: studentID.value.trim(),
        email: email.value.trim(),
        contact: contacts.value.trim()
    };

    let records = JSON.parse(localStorage.getItem("students")) || [];

    if (editIndex !== null) {
        // Editing existing
        records[editIndex] = studentData;
        editIndex = null;
    } else {
        // Adding new
        records.push(studentData);
    }
localStorage.setItem("students", JSON.stringify(records));
    displayData();
    document.getElementById("studentForm").reset();
});

// Display data
function displayData() {
    tablebody.innerHTML = "";
    let records = JSON.parse(localStorage.getItem("students")) || [];

    records.forEach((record, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${record.name}</td>
            <td>${record.id}</td>
            <td>${record.email}</td>
            <td>${record.contact}</td>
            <td>
                <button class="edit-btn" onclick="editData(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteData(${index})">Delete</button>
            </td>
        `;
        tablebody.appendChild(row);
    });
}

// Edit record
function editData(index) {
    let records = JSON.parse(localStorage.getItem("students")) || [];
    let record = records[index];

    student.value = record.name;
    studentID.value = record.id;
    email.value = record.email;
    contacts.value = record.contact;

    editIndex = index;
}

// Delete record
function deleteData(index) {
    let records = JSON.parse(localStorage.getItem("students")) || [];
    records.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(records));
    displayData();
}

// Clear all
clearall.addEventListener("click", function () {
    localStorage.removeItem("students");
    displayData();
});

// Load data
function loadData() {
    displayData();
}

// Validation function
function validateInputs() {
    let nameRegex = /^[A-Za-z ]+$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let idRegex = /^[0-9]+$/;
    let contactRegex = /^[0-9]{10,}$/;

    if (!student.value.trim().match(nameRegex)) {
        alert("Name should contain only letters.");
        return false;
    }
    if (!studentID.value.trim().match(idRegex)) {
        alert("Student ID should contain only numbers.");
        return false;
    }
    if (!email.value.trim().match(emailRegex)) {
    alert("Please enter a valid email address.");
        return false;
    }
    if (!contacts.value.trim().match(contactRegex)) {
        alert("Contact number must be at least 10 digits.");
        return false;
    }
 return true;
}