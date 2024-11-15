// Importing necessary libraries and assets
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSubtaskCompleted } from "../redux/boardsSlice"; // Import setSubtaskCompleted action

// Subtask component to render individual subtasks with a checkbox for completion status
function Subtask({ index, taskIndex, colIndex }) {
  const dispatch = useDispatch();

  // Accessing the boards data from the Redux store
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true); // Find the active board
  const col = board.columns.find((col, i) => i === colIndex); // Find the specified column
  const task = col.tasks.find((task, i) => i === taskIndex); // Find the specified task
  const subtask = task.subtasks.find((subtask, i) => i === index); // Find the specified subtask
  const checked = subtask.isCompleted; // Check if the subtask is completed

  // Handle change in checkbox status for subtask completion
  const onChange = () => {
    dispatch(
      setSubtaskCompleted({ index, taskIndex, colIndex }) // Directly use imported setSubtaskCompleted action
    );
  };

  return (
    <div className="w-full flex hover:bg-[#635fc740] dark:hover:bg-[#635fc740] rounded-md relative items-center justify-start dark:bg-[#20212c] p-3 gap-4 bg-[#f4f7fd]">
      {/* Checkbox to toggle subtask completion */}
      <input
        className="w-4 h-4 accent-[#635fc7] cursor-pointer"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {/* Subtask title, with line-through if completed */}
      <p className={checked ? "line-through opacity-30" : ""}>
        {subtask.title}
      </p>
    </div>
  );
}

export default Subtask;
