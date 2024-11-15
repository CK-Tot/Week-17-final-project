// Importing React and related hooks and libraries
import React, { useState, useEffect } from "react";
import crossIcon from "../assets/icon-cross.svg";
import { addBoard, editBoard } from "../redux/boardsSlice"; // Import specific actions
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

// EditBoardModal component allows users to add or edit boards
function EditBoardModal({ setIsBoardModalOpen, type }) {
  const dispatch = useDispatch();

  // State variables for modal functionality and form fields
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", tasks: [], id: uuidv4() },
    { name: "Doing", tasks: [], id: uuidv4() },
  ]);
  const [isValid, setIsValid] = useState(true);

  // Fetch the active board from the Redux store
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  // Load data for editing an existing board (runs only once on initial load)
  useEffect(() => {
    if (type === "edit" && board) {
      setName(board.name);
      setNewColumns(
        board.columns.map((col) => ({
          ...col,
          id: uuidv4(), // Ensure unique IDs for columns
        }))
      );
    }
  }, [type, board]);

  // Function to validate form inputs
  const validate = () => {
    if (!name.trim()) return false; // Check if name is empty
    for (let column of newColumns) {
      if (!column.name.trim()) return false; // Ensure no empty column names
    }
    return true;
  };

  // Update column name in state when edited
  const onChange = (id, newValue) => {
    setNewColumns((prevState) =>
      prevState.map((col) =>
        col.id === id ? { ...col, name: newValue } : col
      )
    );
  };

  // Remove column by ID from the state
  const onDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((col) => col.id !== id));
  };

  // Submit form data to create or update a board
  const onSubmit = () => {
    setIsBoardModalOpen(false);
    const payload = { name, newColumns };
    if (type === "add") {
      dispatch(addBoard(payload));
    } else {
      dispatch(editBoard(payload));
    }
  };

  return (
    // Modal container and click-to-close background functionality
    <div
      className="fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 left-0 bottom-0 justify-center items-center flex dropdown"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsBoardModalOpen(false); // Close modal on background click
      }}
    >
      {/* Modal content area */}
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto my-auto w-full px-8 py-8 rounded-xl">
        <h3 className="text-lg">
          {type === "edit" ? "Edit" : "Add New"} Board
        </h3>

        {/* Board Name Input */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Board Name
          </label>
          <input
            className="bg-transparent px-4 py-2 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7]"
            placeholder="e.g., Web Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="board-name-input"
          />
        </div>

        {/* Board Columns Section */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Board Columns
          </label>

          {/* Map through newColumns to create input fields for each column */}
          {newColumns.map((column, index) => (
            <div key={index} className="flex items-center w-full">
              <input
                className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7]"
                onChange={(e) => onChange(column.id, e.target.value)}
                type="text"
                value={column.name}
              />
              <img
                src={crossIcon}
                onClick={() => onDelete(column.id)}
                className="m-4 cursor-pointer"
                alt="delete column"
              />
            </div>
          ))}

          {/* Buttons to add a new column and submit the form */}
          <div>
            <button
              className="w-full items-center hover:opacity-70 dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] py-2 rounded-full"
              onClick={() =>
                setNewColumns((state) => [
                  ...state,
                  { name: "", tasks: [], id: uuidv4() },
                ])
              }
            >
              + Add New Column
            </button>
            <button
              onClick={() => {
                if (validate()) onSubmit(); // Only submit if valid
              }}
              className="w-full items-center hover:opacity-70 dark:text-white dark:bg-[#635fc7] mt-8 text-white bg-[#635fc7] py-2 rounded-full"
            >
              {type === "add" ? "Create New Board" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBoardModal;
