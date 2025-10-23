import { statusResult } from "./use-cases/index.js";

function loadAppointments(filteredId = "") {
  let patients = localStorageHandler.getPatientList();
  let table = document.getElementById("appointmentTable");
  table.innerHTML = "";
  
  let filteredPatients = filteredId
  ? patients
      .map((p, idx) => ({ ...p, originalIndex: idx }))
      .filter(p => p.id.toString().includes(filteredId))
  : patients.map((p, idx) => ({ ...p, originalIndex: idx }));

  filteredPatients.forEach((p => {
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
  }));
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


window.toggleStatus = toggleStatus;


//TODO make it a reusable function
function filterAppointments() {
  let searchValue = document.getElementById("searchBar").value.trim();
  loadAppointments(searchValue);
}

window.filterAppointments = filterAppointments;

loadAppointments();