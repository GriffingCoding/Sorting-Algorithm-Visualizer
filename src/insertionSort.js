// insertionSort.js

export const insertionSort = async (array, setData, delay, isStoppedRef) => {
  for (let i = 1; i < array.length; i++) {
    if (isStoppedRef.current) return; // Exit if stopped
    let current = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > current) {
      if (isStoppedRef.current) return; // Exit if stopped
      array[j + 1] = array[j];
      j--;
      setData([...array]); // Trigger re-render
      await new Promise((resolve) => setTimeout(resolve, delay)); // Respect delay
    }
    array[j + 1] = current;
    setData([...array]); // Trigger re-render
  }
};
