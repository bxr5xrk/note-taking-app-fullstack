import { fetchArchiveNotes } from "./../../service/NoteService";
import { INote } from "./../../types/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { deleteOneNote, fetchActiveNotes } from "../../service/NoteService";

interface notesProps {
    activeNotes: INote[];
    archiveNotes: INote[];
    statusActive: "loading" | "success" | "rejected";
    statusArchive: "loading" | "success" | "rejected";
}

const initialState: notesProps = {
    activeNotes: [],
    archiveNotes: [],
    statusActive: "loading",
    statusArchive: "loading",
};

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setActive(state, action: PayloadAction<INote>) {
            const { id } = action.payload;
            const find = state.activeNotes.find((i) => i.id === id);

            if (find) {
                state.activeNotes.splice(
                    state.activeNotes.indexOf(find),
                    1,
                    action.payload
                );
            } else {
                state.activeNotes = [...state.activeNotes, action.payload];
            }
        },
        deleteNote(state, action: PayloadAction<number>) {
            const find = state.activeNotes.find((i) => i.id === action.payload);
            deleteOneNote(action.payload);
            if (find) {
                const index = state.activeNotes.indexOf(find);
                state.activeNotes.splice(index, 1);
            } else {
                if (state.archiveNotes) {
                    const find = state.archiveNotes.find(
                        (i) => i.id === action.payload
                    );
                    if (find) {
                        const index = state.archiveNotes.indexOf(find);
                        state.archiveNotes.splice(index, 1);
                    }
                }
            }
        },
        setArchive(state, action: PayloadAction<INote>) {
            const { id } = action.payload;
            const inActive = state.activeNotes.find((i) => i.id === id);

            if (inActive) {
                state.activeNotes.splice(
                    state.activeNotes.indexOf(inActive),
                    1
                );
            } else {
                const inArchive = state.archiveNotes.find((i) => i.id === id);
                if (inArchive) {
                    state.archiveNotes.splice(
                        state.archiveNotes.indexOf(inArchive),
                        1
                    );
                    state.activeNotes = [...state.activeNotes, inArchive];
                } else {
                    state.archiveNotes = [
                        ...state.archiveNotes,
                        action.payload,
                    ];
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchActiveNotes.pending, (state) => {
            state.statusActive = "loading";
            state.activeNotes = [];
        });
        builder.addCase(
            fetchActiveNotes.fulfilled,
            (state, action: PayloadAction<INote[]>) => {
                state.statusActive = "success";
                state.activeNotes = action.payload;
            }
        );
        builder.addCase(fetchActiveNotes.rejected, (state) => {
            state.statusActive = "rejected";
            state.activeNotes = [];
        });
        builder.addCase(fetchArchiveNotes.pending, (state) => {
            state.statusArchive = "loading";
            state.archiveNotes = [];
        });
        builder.addCase(
            fetchArchiveNotes.fulfilled,
            (state, action: PayloadAction<INote[]>) => {
                state.statusArchive = "success";
                state.archiveNotes = action.payload;
            }
        );
        builder.addCase(fetchArchiveNotes.rejected, (state) => {
            state.statusArchive = "rejected";
            state.archiveNotes = [];
        });
    },
});

export const { setArchive, setActive, deleteNote } = notesSlice.actions;

export const selectNotes = (state: RootState) => state.notes;

export default notesSlice.reducer;
