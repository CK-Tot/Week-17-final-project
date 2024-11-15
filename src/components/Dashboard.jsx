// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditBoardModal from "../modals/EditBoardModal";
import Column from "./Column";
import Sidebar from "./Sidebar";
import Boards from "./Boards";

// Dashboard component to display the main content area of the board, including columns and tasks
function Dashboard() {
  // State to manage the window size
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  // Effect to handle resizing of the window
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleWindowResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  // State to manage the visibility of the board modal
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  // Access the boards and find the active board from the Redux store
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  // State to manage the visibility of the sidebar
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <div
      className={
        // Conditional styling based on screen width and sidebar state
        windowSize[0] >= 768 && isSideBarOpen
          ? " bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6 ml-[261px]"
          : "bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6"
      }
    >
      {/* Render Sidebar only if screen width is >= 768px */}
      {windowSize[0] >= 768 && (
        <Sidebar
          setIsBoardModalOpen={setIsBoardModalOpen}
          isBoardModalOpen={isBoardModalOpen}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}

      {/* Columns Section */}
      {columns.length > 0 ? (
        <>
          {/* Map through columns and render each one */}
          {columns.map((col, index) => (
            <Column key={index} colIndex={index} />
          ))}
          {/* Button to add a new column */}
          <div
            onClick={() => {
              setIsBoardModalOpen(true);
            }}
            className=" h-screen dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2 mx-5 pt-[90px] min-w-[280px] text-[#828FA3] mt-[135px] rounded-lg"
          >
            + New Column
          </div>
        </>
      ) : (
        // Render EmptyBoard component if no columns are present
        <>
          <Boards type="edit" />
        </>
      )}

      {/* Conditional rendering of the Add/Edit Board Modal */}
      {isBoardModalOpen && (
        <EditBoardModal
          type="edit"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default Dashboard;
