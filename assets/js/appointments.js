function statusResult(status) {
  if (status === true) {
    return "Finished";
  } else {
    return "Pending";
  }
}

function loadAppointments(filteredId) {
  let patients = localStorageHandler.getPatientList();
  let table = document.getElementById("appointmentTable");
  table.innerHTML = "";

  const filteredPatients = filterById(
    filteredId,
    'id',
    patients,
  );

  filteredPatients.forEach((p) => {
  filteredPatients.forEach((p) => {
    let row = `<tr>
      <td>${p.id}</td>
      <td>${p.appointment}</td>
      <td>${statusResult(p.status)}</td>
      <td>${p.reason}</td>
      <td>
        <button onclick="toggleStatus(${p.originalIndex})">
        ${p.status ? "Mark Pending" : "Mark Finished"}
      </td>
    </tr>`;
    table.innerHTML += row;
  });
  });
}

function toggleStatus(index) {
  try {
    let patients = localStorageHandler.getPatientList();
    const patientFound = patients[index] ?? null;
    if (!patientFound) {
      throw new Error("Patient not found!");
    }
  try {
    let patients = localStorageHandler.getPatientList();
    const patientFound = patients[index] ?? null;
    if (!patientFound) {
      throw new Error("Patient not found!");
    }

    localStorageHandler.updatePatient(
      {
        ...patientFound,
        status: !patientFound.status,
      },
      index,
    );
    // Keep current filter if applied
    loadAppointments(document.getElementById("searchBar")?.value || "");
  } catch (e) {
    alert(e.message);
  }
    localStorageHandler.updatePatient(
      {
        ...patientFound,
        status: !patientFound.status,
      },
      index,
    );
    // Keep current filter if applied
    loadAppointments(document.getElementById("searchBar")?.value || "");
  } catch (e) {
    alert(e.message);
  }
}

window.toggleStatus = toggleStatus;

function filterAppointments() {
  const id = document.getElementById('searchBar').value.trim();
  loadAppointments(id);
}

>>>>>>> 91786c1 (10-create-a-new-javascript-file-to-centralize-reusables-functions • on develop-3)
loadAppointments();

