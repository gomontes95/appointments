function statusResult(status) {
  if (status === true) {
    return "Finished";
  } else {
    return "Pending";
  }
}

function loadAppointments(filteredId = "") {
  let patients = JSON.parse(localStorage.getItem("patients")) || [];
  let table = document.getElementById("appointmentTable");
  table.innerHTML = "";

  let filteredPatients = filteredId
    ? patients
        .map((p, idx) => ({ ...p, originalIndex: idx }))
        .filter((p) => p.id.toString().includes(filteredId))
    : patients.map((p, idx) => ({ ...p, originalIndex: idx }));

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
}

function toggleStatus(index) {
  let patients = JSON.parse(localStorage.getItem("patients")) || [];
  patients[index].status = !patients[index].status; // toggle
  localStorage.setItem("patients", JSON.stringify(patients));
  // Keep current filter if applied
  loadAppointments(document.getElementById("searchBar")?.value || "");
}

function filterAppointments() {
  let searchValue = document.getElementById("searchBar").value.trim();
  loadAppointments(searchValue);
}

loadAppointments();

{
  /* <button onclick="markFinished(${index})">Mark as Finished</button> */
}
