// Importing React and related hooks and libraries
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import { addTask, editTask } from "../redux/boardsSlice";

// EditTaskModal component allows users to add or edit tasks within a board
function EditTaskModal({
  type,
  device,
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
}) {
  const dispatch = useDispatch();

  // State variables for modal functionality and form fields
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Get the active board from Redux store
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  const columns = board.columns;
  const col = columns[prevColIndex];
  const task = col ? col.tasks[taskIndex] : null;

  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  // Load existing task details when editing
  if (type === "edit" && isFirstLoad && task) {
    setTitle(task.title);
    setDescription(task.description);
    setSubtasks(task.subtasks.map((subtask) => ({ ...subtask, id: uuidv4() })));
    setIsFirstLoad(false);
  }

  // Update a specific subtask title by ID
  const onChangeSubtasks = (id, newValue) => {
    setSubtasks((prevState) =>
      prevState.map((subtask) =>
        subtask.id === id ? { ...subtask, title: newValue } : subtask
      )
    );
  };

  // Handle status change and update column index
  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  // Validation to ensure all fields are filled before submission
  const validate = () => {
    setIsValid(false);
    if (!title.trim()) return false;
    if (subtasks.some((subtask) => !subtask.title.trim())) return false;
    setIsValid(true);
    return true;
  };

  // Remove a specific subtask by ID
  const onDelete = (id) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  };

  // Submit the form data to create or edit a task
  const onSubmit = () => {
    const taskPayload = {
      title,
      description,
      subtasks,
      status,
      newColIndex,
    };

    if (type === "add") {
      dispatch(addTask(taskPayload));
    } else {
      dispatch(
        editTask({
          ...taskPayload,
          taskIndex,
          prevColIndex,
        })
      );
    }
    setIsAddTaskModalOpen(false);
    if (type === "edit") setIsTaskModalOpen(false);
  };

  return (
    <div
      className={`py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 ${
        device === "mobile" ? "bottom-[-100vh]" : "bottom-0"
      } top-0 dropdown`}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsAddTaskModalOpen(false);
      }}
    >
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <h3 className="text-lg">{type === "edit" ? "Edit" : "Add New"} Task</h3>

        {/* Task Name Input */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">Task Name</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="bg-transparent px-4 py-2 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7]"
            placeholder="e.g Take coffee break"
          />
        </div>

        {/* Description Input */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-transparent px-4 py-2 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7]"
            placeholder="e.g. It's always good to take a break. This 15-minute break will recharge the batteries a little."
          />
        </div>

        {/* Subtasks Section */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">Subtasks</label>
          {subtasks.map((subtask, index) => (
            <div key={index} className="flex items-center w-full">
              <input
                onChange={(e) => onChangeSubtasks(subtask.id, e.target.value)}
                type="text"
                value={subtask.title}
                className="bg-transparent px-4 py-2 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7]"
                placeholder="e.g Take coffee break"
              />
              <img
                src={crossIcon}
                onClick={() => onDelete(subtask.id)}
                className="m-4 cursor-pointer"
                alt="delete subtask"
              />
            </div>
          ))}
          <button
            onClick={() =>
              setSubtasks([...subtasks, { title: "", isCompleted: false, id: uuidv4() }])
            }
            className="w-full text-white bg-[#635fc7] py-2 rounded-full"
          >
            + Add New Subtask
          </button>
        </div>

        {/* Status Selection */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">Current Status</label>
          <select
            value={status}
            onChange={onChangeStatus}
            className="px-4 py-2 rounded-md text-sm bg-transparent border-[1px] border-gray-300 focus:outline-[#635fc7]"
          >
            {columns.map((column, index) => (
              <option key={index}>{column.name}</option>
            ))}
          </select>
          <button
            onClick={() => {
              if (validate()) onSubmit();
            }}
            className="w-full text-white bg-[#635fc7] py-2 rounded-full"
          >
            {type === "edit" ? "Save Changes" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTaskModal;
