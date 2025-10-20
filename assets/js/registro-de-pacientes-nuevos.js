const nameInput = document.getElementById("name");
const birthdayInput = document.getElementById("birthday");
const weightInput = document.getElementById("weight");
const weightConverted = document.getElementById("weight-converted");
const heightInput = document.getElementById("height");
const errorMsg = document.getElementById("error");
const recordsDiv = document.getElementById("records");
const appointmentInput = document.getElementById("appointment")
const reasonInput = document.getElementById("reason")

const weightError = document.getElementById("weight-error");
const heightError = document.getElementById("height-error");
const birthdayError = document.getElementById("birthday-error");
let isValid = true;
let status = false


 // Get existing patients from localStorage
let patients = JSON.parse(localStorage.getItem("patients")) || [];

 // Generate ID (01, 02, 03...)
let newId = (patients.length + 1).toString().padStart(2, "0");

  // Reset previous errors
  birthdayError.style.display = "none";
  weightError.style.display = "none";
  heightError.style.display = "none";

console.log("weightConverted:", document.getElementById("weight-converted"));

// --- Live input restrictions ---
nameInput.addEventListener("input", () => {
  nameInput.value = nameInput.value.replace(/[^\p{L}\s'-]/gu, '');
});

const borrar = 'Backspace' ;

const weightOnly = weight
weightInput.addEventListener("input", () => {
  const pounds = parseFloat( weightInput.value );
  if (!isNaN(pounds)) {

    weightConverted.textContent = `≈ ${convertPoundsToKg( pounds )} kg`;
  } else {
    weightConverted.textContent = "";
  }
});


// Limit calendar to today or before
birthdayInput.max = new Date().toISOString().split("T")[0]; // yyyy-mm-dd format

// --- Validation ---
function validateName(name) {
  return /^[\p{Lu}\p{Ll}]+([ '-][\p{Lu}\p{Ll}]+)*$/u.test(name)
}

function validateBirthday(birthday) {
  if (!birthday) return false;

  const today = new Date();
  const birthDate = new Date(birthday);

  console.log(birthDate);
  

  if (isNaN(birthDate.getTime())) return false;

  // Disallow future dates
  if (birthDate > today) {
    alert("❌ Birthday cannot be in the future!");
    return false;
  }
  
  if (birthDate.getFullYear() < 1900) {
    alert("❌ Birthday must be after 1900!");
    return false;
  }

  if ( birthday.value === "") {
    alert("❌ Birthday cannot be empty!");
    return false;
  }
  return true;
}

function validateWeight(weight) {
  return /^\d+(\.\d+)?$/.test(weight.trim());
}

function validateHeight(height) {
  return /^\d+(\.\d+)?$/.test(height.trim());
}

// --- Calculate age in years ---
function calculateAge(birthday) {
  const birthDate = new Date(birthday);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // If birthday hasn’t occurred yet this year → subtract 1
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  // Prevent negative ages
  if (age < 0) return 0;

  return age;
}



// --- Create record ---
function submitForm() {

  const name = nameInput.value.trim();
  const birthday = birthdayInput.value.trim();
  const reason = reasonInput.value.trim();
  const status = false;

  // Validate birthday
  if ( !birthday  ) {
    birthdayError.textContent = "Birthday is required.";
    birthdayError.style.display = "inline";
    isValid = false;
    return;
  } 
  
  const dateParts = birthday.split("-");
  const formattedBirthday = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  const age = calculateAge(birthday);
  const weight = weightInput.value.trim();
  const height = heightInput.value.trim();
  const newAppointment = new Date(appointmentInput.value).toLocaleString("en-US", {
    dateStyle: "short",
    timeStyle: "short"
  } )
  errorMsg.textContent = "";

  // Validate weight
  if (!weightInput.value.trim()) {
    weightError.textContent = "Weight is required.";
    weightError.style.display = "block";
    isValid = false;
  }

  // Validate height
  if (!heightInput.value.trim()) {
    heightError.textContent = "Height is required.";
    heightError.style.display = "block";
    isValid = false;
  }
  

    if (!isValid) {
    stop;
    }
        
  if (!validateName(name)) {
    errorMsg.textContent = "❌ Name must contain only letters.";
    nameInput.focus();
    return;
  }

  if (!validateWeight(weight)) {
    // errorMsg.textContent = "❌ Weight needs to be fill.";
    weightInput.focus();
    return;
  }

  if (!validateHeight(height)) {
    // errorMsg.textContent = "❌ Height needs to be fill.";
    heightInput.focus();
    return;
  }



  // Create a "filled form" div
  const record = document.createElement("div");
  record.classList.add("record");
  record.innerHTML = `
    <strong>ID:</strong> ${newId}<br>
    <strong>Name:</strong> ${name}<br>
    <strong>Birthday:</strong> ${formattedBirthday}<br>
    <strong>Age:</strong> ${age} years<br>
    <strong>Weight:</strong> ${weight} <strong> </strong> ${weightConverted.textContent}<br>
    <strong>Height:</strong> ${height} m<br>
    <strong>Reason:</strong> ${reason} <br>
    <strong>Appointment:</strong> ${newAppointment}<br>
    <strong>Status:${statusResult(status)}<br> 
  `;

  recordsDiv.appendChild(record);

// Create patient object
  let patient = {
    id: newId,
    name: name,
    birthday: birthday,
    age: calculateAge(birthday),
    weight,
    height: height,
    reason: reason, 
    appointment: newAppointment,
    status: statusResult(status)
  };
  

  // Save to array & localStorage
  patients.push(patient);
  localStorage.setItem("patients", JSON.stringify(patients));

    // Clear form
  alert("Patient saved successfully!");
  document.getElementById("myForm").reset();
}



// --- Attach button ---
document.getElementById("submitBtn").addEventListener("click", submitForm), {
  isValid: true
};






