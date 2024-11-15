// Importing necessary libraries and assets
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import boardIcon from "../assets/icon-board.svg";
import DarkMode from "../hooks/DarkMode";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import { setBoardActive } from "../redux/boardsSlice"; // Importing the specific action

// NavBarDropDown component for managing board selection and theme toggle
function NavBarDropDown({ setOpenDropdown, setIsBoardModalOpen }) {
  const dispatch = useDispatch();

  // State to manage dark mode and theme
  const [colorTheme, setTheme] = DarkMode(); // Custom hook for theme management
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  // Toggle dark mode and update local state and root theme
  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  // Fetching boards data from Redux store
  const boards = useSelector((state) => state.boards);

  return (
    <div
      className="py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 dropdown"
      onClick={(e) => {
        // Close dropdown if click is outside of dropdown
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      {/* DropDown Modal container */}
      <div className="bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-full py-4 rounded-xl">
        <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
          ALL BOARDS ({boards?.length})
        </h3>

        {/* Boards listing */}
        <div className="dropdown-board">
          {boards.map((board, index) => (
            <div
              className={`flex items-baseline space-x-2 px-5 py-4 ${
                board.isActive &&
                "bg-[#635fc7] rounded-r-full text-white mr-8"
              }`}
              key={index}
              onClick={() => {
                // Set the selected board as active
                dispatch(setBoardActive({ index })); // Dispatch the action
              }}
            >
              <img src={boardIcon} className="filter-white h-4" alt="Board icon" />
              <p className="text-lg font-bold">{board.name}</p>
            </div>
          ))}

          {/* Option to add a new board */}
          <div
            onClick={() => {
              setIsBoardModalOpen(true);
              setOpenDropdown(false);
            }}
            className="flex items-baseline space-x-2 text-[#635fc7] px-5 py-4"
          >
            <img src={boardIcon} className="filter-white h-4" alt="Add board icon" />
            <p className="text-lg font-bold">Create New Board</p>
          </div>

          {/* Dark mode toggle section */}
          <div className="mx-2 p-4 space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
            <img src={lightIcon} alt="Sun icon for light mode" />

            {/* Switch for toggling between light and dark mode */}
            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={`${
                darkSide ? "bg-[#635fc7]" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable dark mode</span>
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
    </div>
  );
}

export default NavBarDropDown;
