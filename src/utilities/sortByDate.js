function sortByDate(array) {
  const sorted = array.sort(function (a, b) {
    let c = new Date(a.date || a.startDate);
    let d = new Date(b.date || b.startDate);
    return d - c;
  });
  return sorted;
}

export default sortByDate;
