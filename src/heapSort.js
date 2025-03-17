// heapSort.js 

export const heapSort = async (array, setData, delay, isStoppedRef) => {
  const heapify = async (arr, n, i) => {
    if (isStoppedRef.current) return; // Exit if stopped
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setData([...arr]); // Trigger re-render
      await new Promise((resolve) => setTimeout(resolve, delay)); // Respect delay
      await heapify(arr, n, largest);
    }
  };

  const n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    if (isStoppedRef.current) return; // Exit if stopped
    await heapify(array, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    if (isStoppedRef.current) return; // Exit if stopped
    [array[0], array[i]] = [array[i], array[0]];
    setData([...array]); // Trigger re-render
    await new Promise((resolve) => setTimeout(resolve, delay)); // Respect delay
    await heapify(array, i, 0);
  }
};

