/**
 * Based on the boolean reflect the status with a string
 * @param {Boolean} status
 * @returns {String}
 */
export function statusResult(status) {
  if (status === true) {
    return "Finished";
  } else {
    return "Pending";
  }
}
