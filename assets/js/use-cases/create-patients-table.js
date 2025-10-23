import { convertPoundsToKg } from "./operaciones-conversion.js"

export const createPatientTable = ( htmlId ) => {
    document.addEventListener('DOMContentLoaded', function () {
    let patients = localStorageHandler.getPatientList();
    let table = document.getElementById( htmlId );
    console.log(patients);
    patients.forEach(p => {
        let row = `<tr>
                  <td>${p.id}</td>
                  <td>${p.name}</td>
                  <td>${p.birthday}</td>
                  <td>${p.weight} (${convertPoundsToKg(p.weight)} kg) </td>
                  <td>${p.height} m</td>
                  <td>${p.age}</td>
                  <td>${p.reason}</td>
                  <td>${p.appointment}</td>
              </tr>`;
        table.innerHTML += row;
    })
});
} 

