function truncate(str, limit) {
  limit = limit || 140;
  if (str.length < limit) {
    return str;
  }

  str = str.substr(0, limit + 1);
  str = str.substr(0, Math.min(str.length, str.lastIndexOf(' ')));
  str = `${str}...`;
  return str;
}

export default truncate;
