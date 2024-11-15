import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./boardsSlice"; // Corrected path

// Configuring the Redux store with the boards slice
const store = configureStore({
  reducer: {
    boards: boardsSlice, // Assigning boards slice reducer
  },
});

export default store;
