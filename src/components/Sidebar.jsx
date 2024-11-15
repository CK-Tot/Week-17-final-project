// Importing necessary libraries and assets
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import boardIcon from "../assets/icon-board.svg";
import DarkMode from "../hooks/DarkMode";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import showSidebarIcon from "../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../assets/icon-hide-sidebar.svg";
import { setBoardActive } from "../redux/boardsSlice"; // Importing specific action
import EditBoardModal from "../modals/EditBoardModal";

// Sidebar component for navigating between boards and toggling dark mode
function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const dispatch = useDispatch();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  // Theme and dark mode state management
  const [colorTheme, setTheme] = DarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  // Function to toggle dark mode
  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  // Fetching board data from Redux store
  const boards = useSelector((state) => state.boards);

  // Function to toggle the sidebar's visibility
  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? `min-w-[261px] bg-white dark:bg-[#2b2c37] fixed top-[72px] h-screen items-center left-0 z-20`
            : `bg-[#635FC7] dark:bg-[#2b2c37] dark:hover:bg-[#635FC7] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer p-0 transition duration-300 transform fixed flex w-[56px] h-[48px] rounded-r-full`
        }
      >
        <div>
          {/* Sidebar content (boards list and dark mode toggle) */}
          {isSideBarOpen && (
            <div className="bg-white dark:bg-[#2b2c37] w-full py-4 rounded-xl">
              <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
                ALL BOARDS ({boards?.length})
              </h3>

              {/* List of boards with option to select active board */}
              <div className="dropdown-board flex flex-col h-[70vh] justify-between">
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={`flex items-baseline space-x-2 px-5 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white ${
                        board.isActive &&
                        "bg-[#635fc7] rounded-r-full text-white mr-8"
                      }`}
                      key={index}
                      onClick={() => {
                        dispatch(setBoardActive({ index }));
                      }}
                    >
                      <img src={boardIcon} className="filter-white h-4" alt="Board icon" />
                      <p className="text-lg font-bold">{board.name}</p>
                    </div>
                  ))}

                  {/* Option to create a new board */}
                  <div
                    className="flex items-baseline space-x-2 mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#635fc7] px-5 py-4 hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white"
                    onClick={() => {
                      setIsBoardModalOpen(true);
                    }}
                  >
                    <img src={boardIcon} className="filter-white h-4" alt="Add board icon" />
                    <p className="text-lg font-bold">Create New Board</p>
                  </div>
                </div>

                {/* Dark mode toggle switch */}
                <div className="mx-2 p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
                  <img src={lightIcon} alt="Sun icon for light mode" />

                  <Switch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    className={`${
                      darkSide ? "bg-[#635fc7]" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        darkSide ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>

                  <img src={darkIcon} alt="Moon icon for dark mode" />
                </div>
              </div>
            </div>
          )}

          {/* Sidebar show/hide toggle */}
          {isSideBarOpen ? (
            <div
              onClick={() => toggleSidebar()}
              className="flex items-center mt-2 absolute bottom-16 text-lg font-bold rounded-r-full hover:text-[#635FC7] cursor-pointer mr-6 mb-8 px-8 py-4 hover:bg-[#635fc71a] dark:hover:bg-white space-x-2 justify-center my-4 text-gray-500"
            >
              <img
                className="min-w-[20px]"
                src={hideSidebarIcon}
                alt="Hide sidebar icon"
              />
              {isSideBarOpen && <p>Hide Sidebar</p>}
            </div>
          ) : (
            <div className="absolute p-5" onClick={() => toggleSidebar()}>
              <img src={showSidebarIcon} alt="Show sidebar icon" />
            </div>
          )}
        </div>
      </div>

      {/* Modal for adding or editing boards */}
      {isBoardModalOpen && (
        <EditBoardModal
          type="add"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default Sidebar;
