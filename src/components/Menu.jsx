// Importing React library
import React from "react";

// Menu component for rendering edit and delete options as a dropdown
function Menu({ type, setOpenEditModal, setOpenDeleteModal }) {
  return (
    // Container with positioning based on the type of menu
    <div
      className={
        type === "Boards"
          ? "absolute top-16 right-5" // Positioned for Boards menu
          : "absolute top-6 right-4"  // Positioned for other types
      }
    >
      {/* Flex container to align the content to the right */}
      <div className="flex justify-end items-center">
        <div className="w-40 text-sm z-50 font-medium shadow-md shadow-[#364e7e1a] bg-white dark:bg-[#20212c] space-y-4 py-5 px-4 rounded-lg h-auto pr-12">
          
          {/* Edit Option */}
          <p
            onClick={setOpenEditModal}  // Calls function to open edit modal
            className="cursor-pointer dark:text-gray-400 text-gray-700"
          >
            Edit {type}  {/* Dynamic text to show the type of item being edited */}
          </p>

          {/* Delete Option */}
          <p
            onClick={setOpenDeleteModal}  // Calls function to open delete modal
            className="cursor-pointer text-red-500"
          >
            Delete {type}  {/* Dynamic text to show the type of item being deleted */}
          </p>
        </div>
      </div>
    </div>
  );
}

// Exporting the Menu component as default
export default Menu;
