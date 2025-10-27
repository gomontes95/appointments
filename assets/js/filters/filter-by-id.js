/**
 * Filter that search by name and/or id
 * @param { String } searchValue Comparative value
 * @param { [PropertyKey] } fields Property contents that could be compared, could be multiple.
 * @param { Object } data The Object to be filter
 * @returns { Object } New Object with only the filtered Property
 */
const filterBy = (searchValue, fields = ['id', 'name'], data = []) => {
  if (!searchValue) return data;

  const search = String(searchValue).toLowerCase();

  return data.filter(patients =>
    fields.some(field =>
      String(patients[field] || '').toLowerCase().includes(search)
    )
  );
};
