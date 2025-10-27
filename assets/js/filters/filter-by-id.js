/**
 * Filter that search by name and/or id
 * @param { String } searchValue Comparative value
 * @param { [PropertyKey] } fields Property contents that could be compared, could be multiple.
 * @param { Array } data The Array to be filter
 * @returns { Array } New Array with only the filtered Property
 */
const filterBy = (searchValue, fields = ['id', 'name'], data = []) => {
  if (!searchValue) return data;

  if (!searchValue) {
    throw new Error('The parameter fieldSearchName should have a valid value');
  }

  if (!Array.isArray(data)) {
    throw new TypeError('The parameter data should be an array');
  }

  const search = String(searchValue);

  return data.filter(obj =>
    fields.some(field =>
      String(obj[field]).includes(search)
    )
  );
};
