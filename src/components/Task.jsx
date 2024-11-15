// Importing necessary libraries and components
import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modals/TaskModal";

// Task component to display individual tasks within a column
function Task({ colIndex, taskIndex }) {
  // Accessing boards data from Redux store
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true); // Find the active board
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex); // Find the specified column
  const task = col.tasks.find((task, i) => i === taskIndex); // Find the specified task
  
  // State to control the visibility of the TaskModal
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // Calculate the number of completed subtasks
  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  // Function to handle drag event for task movement between columns
  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <div>
      {/* Task Container */}
      <div
        onClick={() => {
          setIsTaskModalOpen(true); // Open the TaskModal on task click
        }}
        draggable // Enable task to be draggable
        onDragStart={handleOnDrag} // Set data on drag start
        className=" w-[280px] first:my-5 rounded-lg  bg-white  dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer "
      >
        {/* Display task title */}
        <p className=" font-bold tracking-wide ">{task.title}</p>
        
        {/* Display completed subtasks count */}
        <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-500">
          {completed} of {subtasks.length} completed tasks
        </p>
      </div>

      {/* Render TaskModal if isTaskModalOpen is true */}
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}

export default Task;
