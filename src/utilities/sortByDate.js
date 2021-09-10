function sortByDate(array) {
  const sorted = array.sort(function (a, b) {
    let c = new Date(a.date);
    let d = new Date(b.date);
    return d - c;
  });
  return sorted;
}

export default sortByDate;
