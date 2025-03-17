// selectionSort.js

export const selectionSort = async (array, setData, delay, isStoppedRef) => {
  for (let i = 0; i < array.length; i++) {
    if (isStoppedRef.current) return; // Exit if stopped
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (isStoppedRef.current) return; // Exit if stopped
      if (array[j] < array[minIndex]) minIndex = j;
    }
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      setData([...array]); // Trigger re-render
      await new Promise((resolve) => setTimeout(resolve, delay)); // Respect delay
    }
  }
};

