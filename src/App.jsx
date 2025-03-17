import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import { bubbleSort } from "./bubbleSort";
import { selectionSort } from "./selectionSort";
import { mergeSort } from "./mergeSort";
import { insertionSort } from "./insertionSort";
import { quickSort } from "./quickSort";
import { heapSort } from "./heapSort";
import { shellSort } from "./shellSort";

// Algorithm colors mapping
const algorithmColors = {
  "Bubble Sort": "#007bff", // Blue
  "Selection Sort": "#28a745", // Green
  "Insertion Sort": "#ffc107", // Yellow
  "Merge Sort": "#17a2b8", // Cyan
  "Quick Sort": "#6f42c1", // Purple
  "Heap Sort": "#fd7e14", // Orange
  "Shell Sort": "#dc3545", // Red
};

export default function App() {
  const [arraySize, setArraySize] = useState(10); // Default array size
  const [data, setData] = useState([]); // Array data
  const [speed, setSpeed] = useState(2); // Default speed
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(""); // Selected algorithm
  const [isStopped, setIsStopped] = useState(false); // To stop the algorithm
  const [isSorting, setIsSorting] = useState(false); // Flag for sorting state
  const canvasRef = useRef(null); // Reference to the canvas
  const isStoppedRef = useRef(false); // Sync with state for real-time behavior

  // Sync the ref with `isStopped` state
  useEffect(() => {
    isStoppedRef.current = isStopped;
  }, [isStopped]);

  // Generate a random array
  const randomizeArray = (size) => {
    setIsStopped(true); // Stop any ongoing sorting
    const randomArray = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100) + 1
    );
    setData(randomArray);
  };

  // Draw the graph on the canvas
  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    const barColor = algorithmColors[selectedAlgorithm] || "grey"; // Default color
    const barWidth = canvas.width / data.length;

    data.forEach((value, index) => {
      const barHeight = (value / 100) * canvas.height;
      const x = index * barWidth;
      const y = canvas.height - barHeight;

      ctx.fillStyle = barColor;
      ctx.fillRect(x, y, barWidth - 2, barHeight); // Draw the bar
    });
  };

  // Re-draw the graph whenever `data` or `selectedAlgorithm` changes
  useEffect(() => {
    drawGraph();
  }, [data, selectedAlgorithm]);

  // Update the array when arraySize changes
  useEffect(() => {
    randomizeArray(arraySize);
  }, [arraySize]);

  // Handle Speed Change
  const handleSpeedChange = (event) => {
    setSpeed(Number(event.target.value));
  };

  const getSpeedDelay = () => {
    if (speed === 1) return 500; // Slow (500ms delay)
    if (speed === 2) return 200; // Medium (200ms delay)
    if (speed === 3) return 50;  // Fast (50ms delay)
    return 200; // Default to medium
  };

  const handleStart = async () => {
    if (!selectedAlgorithm) {
      alert("Please select an algorithm first!");
      return;
    }

    setIsSorting(true);
    setIsStopped(false);
    isStoppedRef.current = false;

    const delay = getSpeedDelay();
    switch (selectedAlgorithm) {
      case "Bubble Sort":
        await bubbleSort([...data], setData, delay, isStoppedRef);
        break;
      case "Selection Sort":
        await selectionSort([...data], setData, delay, isStoppedRef);
        break;
      case "Insertion Sort":
        await insertionSort([...data], setData, delay, isStoppedRef);
        break;
      case "Merge Sort":
        await mergeSort([...data], setData, delay, isStoppedRef);
        break;
      case "Quick Sort":
        await quickSort([...data], setData, delay, isStoppedRef);
        break;
      case "Heap Sort":
        await heapSort([...data], setData, delay, isStoppedRef);
        break;
      case "Shell Sort":
        await shellSort([...data], setData, delay, isStoppedRef);
        break;
      default:
        alert("Please select an algorithm first!");
    }

    setIsSorting(false);
  };

  return (
    <div className="app">
      <aside className="left-side">
        <nav>
          <button onClick={() => setSelectedAlgorithm("Bubble Sort")} disabled={isSorting}>
            Bubble Sort
          </button>
          <button onClick={() => setSelectedAlgorithm("Selection Sort")} disabled={isSorting}>
            Selection Sort
          </button>
          <button onClick={() => setSelectedAlgorithm("Insertion Sort")} disabled={isSorting}>
            Insertion Sort
          </button>
          <button onClick={() => setSelectedAlgorithm("Merge Sort")} disabled={isSorting}>
            Merge Sort
          </button>
          <button onClick={() => setSelectedAlgorithm("Quick Sort")} disabled={isSorting}>
            Quick Sort
          </button>
          <button onClick={() => setSelectedAlgorithm("Heap Sort")} disabled={isSorting}>
            Heap Sort
          </button>
          <button onClick={() => setSelectedAlgorithm("Shell Sort")} disabled={isSorting}>
            Shell Sort
          </button>
        </nav>
      </aside>

      <div className="visual">
        {/* Dynamic Title Section */}
        <div className="top">
          <p>
            Sorting Algorithm Visualizer
            {selectedAlgorithm && ` - ${selectedAlgorithm}`}
          </p>
        </div>
        
        <canvas ref={canvasRef} width="800" height="400"></canvas>

        <div id="controls">
          <div className="speed-control">
            <label htmlFor="speed">Speed:</label>
            <input
              type="range"
              id="speed"
              min="1"
              max="3"
              step="1"
              value={speed}
              onChange={handleSpeedChange}
              disabled={isSorting}
            />
            <span>{speed === 1 ? "Slow" : speed === 2 ? "Medium" : "Fast"}</span>
          </div>
          <div className="size-control">
            <label htmlFor="arraySize">Array Size:</label>
            <input
              type="range"
              id="arraySize"
              min="2"
              max="100"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              disabled={isSorting}
            />
            <span>{arraySize}</span>
          </div>
          <div className="button-group">
            <button onClick={() => randomizeArray(arraySize)} disabled={isSorting}>
              Randomize
            </button>
            <button onClick={handleStart} disabled={isSorting}>
              Start
            </button>
            <button onClick={() => setIsStopped(true)} disabled={!isSorting}>
              Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
