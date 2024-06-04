import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    taskItems: []
}

const taskReducer = createSlice({
    name: 'task',
    initialState,
    reducers: {
        getTask: (state, action) => {
            state.taskItems = action.payload;
        },
        addTask: (state, action) => {
            state.taskItems.push(action.payload);
        },
        updateTask: (state, action) => {
            const {taskId, data} = action.payload;
            state.taskItems = state.taskItems.filter(task => task._id !== taskId);
            state.taskItems.push(data);
        },
        deleteTask: (state, action) => {
            state.taskItems = state.taskItems.filter(task => task._id !== action.payload);
        }
    }
});

export const { getTask, addTask, updateTask, deleteTask } = taskReducer.actions;
export default taskReducer.reducer;