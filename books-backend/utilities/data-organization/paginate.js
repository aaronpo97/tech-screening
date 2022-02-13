module.exports = function paginate(array, pageNumber, pageSize) {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};
