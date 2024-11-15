// Import necessary libraries and components
import { shuffle } from "lodash"; // Import shuffle function from lodash for randomizing colors
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dragTask } from "../redux/boardsSlice"; // Import the dragTask action from Redux slice
import Task from "./Task"; // Import Task component for rendering individual tasks

// Column component to represent each column in the board
function Column({ colIndex }) {
  // Array of colors to assign a random background color to each column
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-sky-500",
  ];

  const dispatch = useDispatch(); // Hook to dispatch actions to Redux store
  const [color, setColor] = useState(null); // Local state to store the selected color for the column

  // Accessing board and column data from the Redux store
  const boards = useSelector((state) => state.boards); // Get all boards from Redux store
  const board = boards.find((board) => board.isActive === true); // Find the active board
  const col = board.columns.find((col, i) => i === colIndex); // Find the specific column by index

  // Randomly set a background color for the column on component mount
  useEffect(() => {
    setColor(shuffle(colors).pop()); // Use lodash shuffle to randomly select a color
  }, []); // Empty dependency array to ensure effect runs once on mount

  // Function to handle drop events for task reordering or movement between columns
  const handleOnDrop = (e) => {
    // Parse the data of the task being dragged
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    // Dispatch action only if the task is dropped in a different column
    if (colIndex !== prevColIndex) {
      dispatch(dragTask({ colIndex, prevColIndex, taskIndex }));
    }
  };

  // Function to allow dragging over the column
  const handleOnDragOver = (e) => {
    e.preventDefault(); // Prevent default to allow dropping
  };

  return (
    <div
      onDrop={handleOnDrop} // Set up drop handler for column
      onDragOver={handleOnDragOver} // Set up drag over handler
      className="scrollbar-hide mx-5 pt-[90px] min-w-[280px]"
    >
      {/* Column header displaying the column name and task count */}
      <div className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
        <span className={`rounded-full w-4 h-4 ${color}`} /> {/* Random color indicator */}
        {col.name} ({col.tasks.length}) {/* Column name and task count */}
      </div>

      {/* Map through tasks and render each task in the column */}
      {col.tasks.map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
}

export default Column;
