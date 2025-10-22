function convertPoundsToKg(pounds) {
  return (pounds * 0.453592).toFixed(2);
}

function statusResult(status) {
  if (status === true) {
    return "Finished";
  } else {
    return "Pending";
  }
}
// investigar porque una arrow function no corre bien en front end desde otro archivo html. Diferencia del scope
