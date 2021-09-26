const truncateString = (str, length, ending) => {
  if (str.length > length) {
    let truncated = str.substring(0, length);
    return truncated + ending;
  } else {
    return str;
  }
};

export default truncateString;
