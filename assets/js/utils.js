/**
 * Capitalize the first letter of a string.
 * @param {String} str
 * @returns
 */
const capitilizeString = (str) => {
  if (typeof str !== 'string'|| !str.length) return str;

  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Calculate the years of life of a patient.
 * @param {Date} birthday
 * @returns
 */
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

/**
 * Based on the boolean change the status with a string
 * @param {Boolean} status
 * @returns {String}
 */
function statusResult(status) {
  if (status === true) {
    return "Finished";
  } else {
    return "Pending";
  }
}
