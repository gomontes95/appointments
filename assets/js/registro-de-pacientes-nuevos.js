const nameInput = document.getElementById("name");
const birthdayInput = document.getElementById("birthday");
const weightInput = document.getElementById("weight");
const weightConverted = document.getElementById("weight-converted");
const heightInput = document.getElementById("height");
const errorMsg = document.getElementById("error");
const recordsDiv = document.getElementById("records");
const appointmentInput = document.getElementById("appointment");
const reasonInput = document.getElementById("reason");

const appointmentError = document.getElementById("appointment-error");
const nameError = document.getElementById("name-error");
const weightError = document.getElementById("weight-error");
const heightError = document.getElementById("height-error");
const birthdayError = document.getElementById("birthday-error");
let isValid = true;
let status = false;

// Get existing patients from localStorage
let patients = JSON.parse(localStorage.getItem("patients")) || [];

// Generate ID (01, 02, 03...)
let newId = (patients.length + 1).toString().padStart(2, "0");

// Reset previous errors
birthdayError.style.display = "none";
weightError.style.display = "none";
heightError.style.display = "none";

// --- Live input restrictions ---
nameInput.addEventListener("input", () => {
  nameInput.value = nameInput.value.replace(/[^\p{L}\s'-]/gu, "");
});

const borrar = "Backspace";

const weightOnly = weight;
weightInput.addEventListener("input", () => {
  const pounds = parseFloat(weightInput.value);
  if (!isNaN(pounds)) {
    weightConverted.textContent = `≈ ${convertPoundsToKg(pounds)} kg`;
  } else {
    weightConverted.textContent = "";
  }
});

// Limit calendar to today or before
birthdayInput.max = new Date().toISOString().split("T")[0]; // yyyy-mm-dd format

// --- Validation ---
function validateName(name) {
  return /^[\p{Lu}\p{Ll}]+([ '-][\p{Lu}\p{Ll}]+)*$/u.test(name);
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

  if (birthday.value === "") {
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
  const weight = weightInput.value.trim();
  const height = heightInput.value.trim();
  const appointment = appointmentInput.value.trim();
  const formObject = {
    appointment: {
      elementHTML: appointmentError,
      value: appointment,
    },
    birthday: {
      elementHTML: birthdayError,
      value: birthday,
    },
    height: {
      elementHTML: heightError,
      value: height
    },
    name: {
      elementHTML: nameError,
      value: name,
    },
    weight: {
      elementHTML: weightError,
      value: weight
    },
  };
  let isFormValid = true;
  for (const key of Object.keys(formObject)) {
    const { elementHTML, value }  = formObject[key];
    try {
      elementHTML.textContent = '';
      elementHTML.style.display = 'none';
      validator[`validate${capitilize(key)}`](value);
    } catch (e) {
      elementHTML.textContent = e.message;
      elementHTML.style.display = 'block';
      isFormValid = isFormValid && false;
    }
  }

  if (!isFormValid) {
    return;
  }

  const status = true;
  const dateParts = birthday.split("-");
  const formattedBirthday = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  const age = calculateAge(birthday);

  const newAppointment = new Date(appointmentInput.value).toLocaleString(
    "en-US",
    {
      dateStyle: "short",
      timeStyle: "short",
    },
  );
  errorMsg.textContent = "";

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
    status: statusResult(status),
  };

  // Save to array & localStorage
  localStorageHandler.storePatient(patient);

  // Clear form
  alert("Patient saved successfully!");
  document.getElementById("myForm").reset();
}

// --- Attach button ---
(document.getElementById("submitBtn").addEventListener("click", submitForm),
  {
    isValid: true,
  });
