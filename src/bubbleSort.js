// bubbleSort.js

export const bubbleSort = async (array, setData, delay, isStoppedRef) => {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      if (isStoppedRef.current) return; // Exit if stopped
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        setData([...array]); // Trigger re-render
        await new Promise((resolve) => setTimeout(resolve, delay)); // Respect delay
        swapped = true;
      }
    }
  } while (swapped);
};


