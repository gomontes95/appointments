const filterById = (id, fieldSearchName = 'id', data = []) => {

  if (!id) {
    return data;
  }

  if (!fieldSearchName) {
    throw new Error('The parameter fieldSearchName should have a valid value');
  }

  if (!Array.isArray(data)) {
    throw new TypeError('The parameter data should be an array');
  }

  return data.filter(obj => String(obj[fieldSearchName]).includes(id));
}
