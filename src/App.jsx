import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar"; // Header component for the app
import Dashboard from "./components/Dashboard"; // Main content area or dashboard component
import Boards from './components/Boards'; // Component shown when no boards are available
import boardsSlice from "./redux/boardsSlice"; // Importing actions and reducers from boardsSlice

function App() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false); // State to control modal visibility
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards); // Fetching boards from Redux store
  const activeBoard = boards.find((board) => board.isActive); // Finding the currently active board
  
  // Set the first board as active if none is currently active
  if (!activeBoard && boards.length > 0) {
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  }

  return (
    <div className="overflow-hidden overflow-x-scroll">
      {/* Main conditional rendering based on whether boards are available */}
      <>
        {boards.length > 0 ? (
          <>
            {/* Render the Header with props to control the board modal */}
            <NavBar
              setIsBoardModalOpen={setIsBoardModalOpen}
              isBoardModalOpen={isBoardModalOpen}
            />
            {/* Render the Home component when boards exist */}
            <Dashboard
              setIsBoardModalOpen={setIsBoardModalOpen}
              isBoardModalOpen={isBoardModalOpen}
            />
          </>
        ) : (
          <>
            {/* Render the EmptyBoard component if no boards exist */}
            <Boards type="add" />
          </>
        )}
      </>
    </div>
  );
}

export default App;
