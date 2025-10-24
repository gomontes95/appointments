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
    // Find the index of this patient in the original patients array
    const originalIndex = patients.findIndex(item => String(item.id) === String(p.id));

    let row = `<tr>
      <td>${p.id}</td>
      <td>${p.appointment}</td>
      <td>${statusResult(p.status)}</td>
      <td>${p.reason}</td>
      <td>
        <button onclick="toggleStatus(${originalIndex})">
          ${p.status ? "Mark Pending" : "Mark Finished"}
        </button>
      </td>
    </tr>`;
    table.innerHTML += row;
  });
}

function toggleStatus(index) {
    try {
        let patients = localStorageHandler.getPatientList();
        const patientFound = patients[index] ?? null;
        if (!patientFound) {
            throw new Error('Patient not found!');
        }

        localStorageHandler.updatePatient({
            ...patientFound,
            status: !patientFound.status
        }, index);
        // Keep current filter if applied
        loadAppointments(document.getElementById("searchBar")?.value || "");
    } catch (e) {
        alert(e.message);
    }
}

function filterAppointments() {
  const id = document.getElementById('searchBar').value.trim();
  loadAppointments(id);
}

loadAppointments();
