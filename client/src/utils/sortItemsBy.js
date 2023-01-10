export default function sortItemsBy(arr, direction, sortKey) {
  return arr.sort((a, b) => {
    if (direction === "asc")
      return typeof a[sortKey] === "string"
        ? a[sortKey].localeCompare(b[sortKey])
        : a[sortKey] - b[sortKey];
    else
      return typeof a[sortKey] === "string"
        ? b[sortKey].localeCompare(a[sortKey])
        : b[sortKey] - a[sortKey];
  });
}
