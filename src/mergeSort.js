// mergeSort.js

export const mergeSort = async (array, setData, delay, isStoppedRef) => {
  const merge = async (left, right) => {
    if (isStoppedRef.current) return []; // Exit if stopped
    let result = [];
    while (left.length && right.length) {
      if (isStoppedRef.current) return []; // Exit if stopped
      if (left[0] <= right[0]) result.push(left.shift());
      else result.push(right.shift());
      setData([...array]); // Update array (optional visualization step)
      await new Promise((resolve) => setTimeout(resolve, delay)); // Respect delay
    }
    return [...result, ...left, ...right];
  };

  const mergeSortRecursive = async (arr) => {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = await mergeSortRecursive(arr.slice(0, mid));
    const right = await mergeSortRecursive(arr.slice(mid));
    return await merge(left, right);
  };

  const sortedArray = await mergeSortRecursive(array);
  setData([...sortedArray]); // Trigger re-render with the sorted array
};
