// quickSort.js

export const quickSort = async (array, setData, delay, isStoppedRef) => {
  const quickSortRecursive = async (arr) => {
    if (isStoppedRef.current) return []; // Exit if stopped
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length - 1; i++) {
      if (isStoppedRef.current) return []; // Exit if stopped
      if (arr[i] < pivot) left.push(arr[i]);
      else right.push(arr[i]);
    }
    const sortedLeft = await quickSortRecursive(left);
    const sortedRight = await quickSortRecursive(right);
    const merged = [...sortedLeft, pivot, ...sortedRight];
    setData([...merged]); // Trigger re-render
    await new Promise((resolve) => setTimeout(resolve, delay)); // Respect delay
    return merged;
  };

  const sortedArray = await quickSortRecursive(array);
  setData([...sortedArray]); // Trigger re-render with sorted array
};
