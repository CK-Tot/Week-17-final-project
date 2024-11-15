// Importing necessary dependencies and components
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu from "../components/Menu"; // Renamed component to uppercase for React component standards
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import { setTaskStatus, deleteTask } from "../redux/boardsSlice"; // Import specific actions
import Subtask from "../components/Subtask";
import EditTaskModal from "./EditTaskModal";
import DeleteModal from "./DeleteModal";

// TaskModal component for displaying and editing a selected task along with its subtasks
function TaskModal({ taskIndex, colIndex, setIsTaskModalOpen }) {
  const dispatch = useDispatch();
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false); // Manages elipsis menu visibility
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Manages delete modal visibility
  
  // Selecting the active board and specific task data from Redux store
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const columns = board.columns;
  const col = columns[colIndex];
  const task = col.tasks[taskIndex];
  const subtasks = task.subtasks;

  // Count of completed subtasks
  const completed = subtasks.reduce((count, subtask) => count + (subtask.isCompleted ? 1 : 0), 0);

  // State for task status and its new column index if moved
  const [status, setStatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(colIndex);

  // Function to handle changes in task status
  const onChange = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  // Function to handle closing the modal and updating task status in Redux
  const onClose = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(setTaskStatus({ taskIndex, colIndex, newColIndex, status }));
      setIsTaskModalOpen(false);
    }
  };

  // Function to handle delete button click
  const onDeleteBtnClick = () => {
    dispatch(deleteTask({ taskIndex, colIndex }));
    setIsTaskModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  // State to handle visibility of Add/Edit task modal
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  // Opens the edit modal and closes the elipsis menu
  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  // Opens the delete modal and closes the elipsis menu
  const setOpenDeleteModal = () => {
    setIsElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      onClick={onClose}
      className="fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 left-0 bottom-0 justify-center items-center flex dropdown"
    >
      {/* Main Modal Section */}
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <div className="relative flex justify-between w-full items-center">
          {/* Task Title */}
          <h1 className="text-lg">{task.title}</h1>

          {/* Elipsis Menu Toggle */}
          <img
            onClick={() => setIsElipsisMenuOpen(!isElipsisMenuOpen)}
            src={elipsis}
            alt="elipsis"
            className="cursor-pointer h-6"
          />
          {isElipsisMenuOpen && (
            <Menu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            />
          )}
        </div>

        {/* Task Description */}
        <p className="text-gray-500 font-[600] tracking-wide text-xs pt-6">
          {task.description}
        </p>

        {/* Subtask Count */}
        <p className="pt-6 text-gray-500 tracking-widest text-sm">
          Subtasks ({completed} of {subtasks.length})
        </p>

        {/* Subtasks Section */}
        <div className="mt-3 space-y-2">
          {subtasks.map((subtask, index) => (
            <Subtask key={index} index={index} taskIndex={taskIndex} colIndex={colIndex} />
          ))}
        </div>

        {/* Current Status Section */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            className="select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
            value={status}
            onChange={onChange}
          >
            {columns.map((col, index) => (
              <option key={index} className="status-options">
                {col.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <DeleteModal
          onDeleteBtnClick={onDeleteBtnClick}
          type="task"
          title={task.title}
        />
      )}

      {/* Add/Edit Task Modal */}
      {isAddTaskModalOpen && (
        <EditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="edit"
          taskIndex={taskIndex}
          prevColIndex={colIndex}
        />
      )}
    </div>
  );
}

export default TaskModal;
