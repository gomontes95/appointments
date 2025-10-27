//HTML variables
const appointmentError = document.getElementById("appointment-error"),
      appointmentInput = document.getElementById("appointment"),
      birthdayError = document.getElementById("birthday-error"),
      birthdayInput = document.getElementById("birthday"),
      heightError = document.getElementById("height-error"),
      heightInput = document.getElementById("height"),
      nameError = document.getElementById("name-error"),
      nameInput = document.getElementById("name"),
      reasonInput = document.getElementById("reason"),
      recordsDiv = document.getElementById("records"),
      weightConverted = document.getElementById("weight-converted"),
      weightError = document.getElementById("weight-error"),
      weightInput = document.getElementById("weight");

// Get existing patients from localStorage
let patients = localStorageHandler.getPatientList();

// Generate ID (01, 02, 03...)
let newId = (patients.length + 1).toString().padStart(2, "0");

// Reset previous errors
birthdayError.style.display = "none";
heightError.style.display = "none";
weightError.style.display = "none";

// --- Live input restrictions ---
nameInput.addEventListener("input", () => {
  nameInput.value = nameInput.value.replace(/[^\p{L}\s'-]/gu, "");
});

weightInput.addEventListener("input", () => {
  const pounds = parseFloat(weightInput.value);
  if (!isNaN(pounds)) {
    weightConverted.textContent = `≈ ${convertPoundsToKg(pounds)} kg`;
  } else {
    weightConverted.textContent = "";
  }
});

// --- Create record ---
function submitForm() {
  const appointment = appointmentInput.value.trim(),
        birthday = birthdayInput.value.trim(),
        height = heightInput.value.trim(),
        name = nameInput.value.trim(),
        weight = weightInput.value.trim(),
        formObject = {
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
      validator[`validate${capitilizeString(key)}`](value);
    } catch (e) {
      elementHTML.textContent = e.message;
      elementHTML.style.display = 'block';
      isFormValid = false;
    }
  }

  if (!isFormValid) {
    return;
  }

  const age = calculateAge(birthday),
        dateParts = birthday.split("-"),
        formattedBirthday = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`,
        status = true;

  const newAppointment = new Date(appointmentInput.value).toLocaleString(
    "en-US",
    {
      dateStyle: "short",
      timeStyle: "short",
    },
  );

  // Create a "filled form" div
  const reason = reasonInput.value.trim();
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
    age: calculateAge(birthday),
    appointment: newAppointment,
    birthday: birthday,
    height: height,
    id: newId,
    name: name,
    reason: reason,
    status: statusResult(status),
    weight,
  };

  // Save to array & localStorage
  localStorageHandler.storePatient(patient);

  // Clear form
  alert("Patient saved successfully!");
  document.getElementById("myForm").reset();
}

// --- Attach button ---
document.getElementById("submitBtn").addEventListener("click", submitForm);
