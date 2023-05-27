export default function removeDuplicatesFromArray(
  array: Array<string | number>
): Array<string | number> {
  let uniqueArray: Array<string | number> = [];
  array.forEach((element) => {
    if (!uniqueArray.includes(element)) {
      uniqueArray.push(element);
    }
  });

  return uniqueArray;
}
