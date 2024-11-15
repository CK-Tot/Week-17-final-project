// Import necessary dependencies from React
import React, { useState } from "react";

// Import the modal component for adding/editing boards
import EditBoardModal from "../modals/EditBoardModal";

// Define the Boards component that displays when there are no boards or columns
function Boards({ type }) {
  // Local state to manage whether the board modal is open or closed
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-[#2b2c37] h-screen w-screen flex flex-col items-center justify-center">
      {/* Display message based on whether we're editing a board or adding a new one */}
      <h3 className="text-gray-500 font-bold">
        {type === "edit"
          ? "This board is empty. Create a new column to get started."
          : "There are no boards available. Create a new board to get started"}
      </h3>
      
      {/* Button to open the modal for adding or editing a board */}
      <button
        onClick={() => {
          setIsBoardModalOpen(true);
        }}
        className="w-full items-center max-w-xs font-bold hover:opacity-70 dark:text-white dark:bg-[#5f9cc7] mt-8 relative text-white bg-[#635fc7] py-2 rounded-full"
      >
        {type === "edit" ? "+ Add New Column" : "+ Add New Board"}
      </button>

      {/* Conditionally render the AddEditBoardModal if isBoardModalOpen is true */}
      {isBoardModalOpen && (
        <EditBoardModal
          type={type}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default Boards;
