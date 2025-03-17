// shellSort.js

export const shellSort = async (array, setData, delay, isStoppedRef) => {
  const n = array.length;
  let gap = Math.floor(n / 2);

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      if (isStoppedRef.current) return; // Exit if stopped
      const temp = array[i];
      let j = i;
      while (j >= gap && array[j - gap] > temp) {
        if (isStoppedRef.current) return; // Exit if stopped
        array[j] = array[j - gap];
        j -= gap;
        setData([...array]); // Trigger re-render
        await new Promise((resolve) => setTimeout(resolve, delay)); // Respect delay
      }
      array[j] = temp;
      setData([...array]); // Trigger re-render
    }
    gap = Math.floor(gap / 2);
  }
};
