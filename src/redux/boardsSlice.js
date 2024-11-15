import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

const boardsSlice = createSlice({
  name: "boards",
  initialState: data.boards || [],
  reducers: {
    addBoard: (state, action) => {
      const isActive = state.length === 0;
      const { name, newColumns = [] } = action.payload;
      const newBoard = {
        name,
        isActive,
        columns: newColumns,
      };
      state.push(newBoard);
    },

    editBoard: (state, action) => {
      const { name, newColumns } = action.payload;
      const activeBoard = state.find((board) => board.isActive);
      if (activeBoard) {
        activeBoard.name = name;
        activeBoard.columns = newColumns;
      }
    },

    deleteBoard: (state) => {
      const activeBoardIndex = state.findIndex((board) => board.isActive);
      if (activeBoardIndex !== -1) {
        state.splice(activeBoardIndex, 1);
        if (state.length > 0) {
          state[0].isActive = true;
        }
      }
    },

    setBoardActive: (state, action) => {
      if (!state[action.payload.index]?.isActive) {
         state.forEach((board, index) => {
           board.isActive = index === action.payload.index;
         });
      }
    },

    addTask: (state, action) => {
      const { title, description, subtasks, status, newColIndex } = action.payload;
      const newTask = { title, description, subtasks, status };
      const activeBoard = state.find((board) => board.isActive);
      if (activeBoard) {
        const column = activeBoard.columns[newColIndex];
        column.tasks.push(newTask);
      }
    },

    editTask: (state, action) => {
      const { title, description, subtasks, status, prevColIndex, newColIndex, taskIndex } = action.payload;
      const activeBoard = state.find((board) => board.isActive);
      if (activeBoard) {
        const prevColumn = activeBoard.columns[prevColIndex];
        const task = prevColumn.tasks[taskIndex];
        if (task) {
          task.title = title;
          task.description = description;
          task.subtasks = subtasks;
          task.status = status;
          if (prevColIndex !== newColIndex) {
            prevColumn.tasks.splice(taskIndex, 1);
            activeBoard.columns[newColIndex].tasks.push(task);
          }
        }
      }
    },

    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const activeBoard = state.find((board) => board.isActive);
      if (activeBoard) {
        const prevColumn = activeBoard.columns[prevColIndex];
        const task = prevColumn.tasks.splice(taskIndex, 1)[0];
        activeBoard.columns[colIndex].tasks.push(task);
      }
    },

    setSubtaskCompleted: (state, action) => {
      const { colIndex, taskIndex, index } = action.payload;
      const activeBoard = state.find((board) => board.isActive);
      if (activeBoard) {
        const task = activeBoard.columns[colIndex].tasks[taskIndex];
        const subtask = task.subtasks[index];
        if (subtask) {
          subtask.isCompleted = !subtask.isCompleted;
        }
      }
    },

    setTaskStatus: (state, action) => {
      const { colIndex, taskIndex, newColIndex, status } = action.payload;
      const activeBoard = state.find((board) => board.isActive);
      if (activeBoard) {
        const task = activeBoard.columns[colIndex].tasks[taskIndex];
        task.status = status;
        if (colIndex !== newColIndex) {
          activeBoard.columns[colIndex].tasks.splice(taskIndex, 1);
          activeBoard.columns[newColIndex].tasks.push(task);
        }
      }
    },

    deleteTask: (state, action) => {
      const { colIndex, taskIndex } = action.payload;
      const activeBoard = state.find((board) => board.isActive);
      if (activeBoard) {
        activeBoard.columns[colIndex].tasks.splice(taskIndex, 1);
      }
    },
  },
});

export const {
  addBoard,
  editBoard,
  deleteBoard,
  setBoardActive,
  addTask,
  editTask,
  dragTask,
  setSubtaskCompleted,
  setTaskStatus,
  deleteTask,
} = boardsSlice.actions;

export default boardsSlice.reducer;
