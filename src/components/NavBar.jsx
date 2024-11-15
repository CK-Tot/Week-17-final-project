// Importing necessary libraries and assets
import React, { useState } from "react";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import NavBarDropDown from "./NavBarDropDown";
import Menu from "./Menu";
import EditTaskModal from "../modals/EditTaskModal";
import EditBoardModal from "../modals/EditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../modals/DeleteModal";
import { deleteBoard, setBoardActive } from "../redux/boardsSlice"; // Updated import for specific actions

// NavBar component: Renders the application's main header
function NavBar({ setIsBoardModalOpen, isBoardModalOpen }) {
  const [openDropdown, setOpenDropdown] = useState(false);  // Controls dropdown visibility
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false); // Controls ellipsis menu visibility
  const [boardType, setBoardType] = useState("add"); // Determines type of board action
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Controls delete modal visibility
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false); // Controls task modal visibility

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards); // Accessing boards from the Redux store
  const board = boards.find((board) => board.isActive); // Finds the currently active board

  // Handles the dropdown click
  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  // Opens the edit modal
  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  // Opens the delete modal
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  // Handles the delete board action
  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(deleteBoard());
      dispatch(setBoardActive({ index: 0 }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
      {/* Main header with logo, title, and active board name */}
      <header className="flex justify-between dark:text-white items-center">
        
        {/* Left side: Text logo, app title, and active board name */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="text-logo text-[#24639e] font-bold text-2xl md:text-4xl">CK Tot</div>
          <h3 className="md:text-4xl hidden md:inline-block font-bold font-sans">
            Task Manager
          </h3>
          <div className="flex items-center">
            <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
              {board ? board.name : "Select a Board"}
            </h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt="dropdown icon"
              className="w-3 ml-2 md:hidden"
              onClick={onDropdownClick}
            />
          </div>
        </div>

        {/* Right side: Buttons for adding tasks and accessing the ellipsis menu */}
        <div className="flex space-x-4 items-center md:space-x-6">
          <button
            className="button hidden md:block"
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
          >
            Add New Task
          </button>
          <button
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
            className="button py-1 px-3 md:hidden"
          >
            +
          </button>

          {/* Ellipsis icon for menu access */}
          <img
            onClick={() => {
              setBoardType("edit");
              setOpenDropdown(false);
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
            src={elipsis}
            alt="elipsis"
            className="cursor-pointer h-6"
          />
          {isElipsisMenuOpen && (
            <Menu
              type="Boards"
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          )}
        </div>

        {/* Conditional rendering of dropdown and modals */}
        {openDropdown && (
          <NavBarDropDown
            setOpenDropdown={setOpenDropdown}
            setIsBoardModalOpen={setIsBoardModalOpen}
          />
        )}
      </header>

      {/* Task Modal */}
      {isTaskModalOpen && (
        <EditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}

      {/* Board Modal */}
      {isBoardModalOpen && (
        <EditBoardModal
          setBoardType={setBoardType}
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board ? board.name : ""}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}

export default NavBar;
