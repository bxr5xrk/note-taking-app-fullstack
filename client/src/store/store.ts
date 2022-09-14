import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import notesSlice from "./slices/notesSlice";

export const store = configureStore({
    reducer: {
        notes: notesSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
