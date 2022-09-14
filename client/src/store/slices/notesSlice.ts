// import { prepopulatedData } from "./../../.data";
import { INote } from "./../../types/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
    deleteOneNote,
    fetchNotes,
    patchNote,
} from "../../service/NoteService";

// const getActiveFromLS = () => {
//     const data = localStorage.getItem("active");
//     return data ? JSON.parse(data) : prepopulatedData;
// };

const getArchiveFromLS = () => {
    const data = localStorage.getItem("archive");
    return data ? JSON.parse(data) : null;
};

interface notesProps {
    activeNotes: INote[];
    archiveNotes: INote[] | null;
    status: "loading" | "success" | "rejected";
}

const initialState: notesProps = {
    // activeNotes: getActiveFromLS(),
    activeNotes: [],
    archiveNotes: getArchiveFromLS(),
    status: "loading",
};

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setActive(state, action: PayloadAction<INote>) {
            const { id, title, content, category } = action.payload;

            const find = state.activeNotes.find((i) => i.id === id);

            if (find) {
                patchNote(action.payload.id, {
                    title,
                    content,
                    category,
                });
                // const newNote = {
                //     ...find,
                //     title,
                //     category,
                //     content,
                // };
                const index = state.activeNotes.indexOf(find);
                state.activeNotes.splice(index, 1, action.payload);
            } else {
                state.activeNotes = [...state.activeNotes, action.payload];
            }
        },
        // setActive(state, action: PayloadAction<INote>) {
        //     const find = state.activeNotes.find(
        //         (i) => i.id === action.payload.id
        //     );

        //     if (find) {
        //         const index = state.activeNotes.indexOf(find);
        //         state.activeNotes.splice(index, 1, action.payload);
        //     } else {
        //         state.activeNotes = [...state.activeNotes, action.payload];
        //     }

        //     localStorage.setItem("active", JSON.stringify(state.activeNotes));
        // },
        deleteNote(state, action: PayloadAction<string>) {
            deleteOneNote(action.payload);
            const find = state.activeNotes.find(
                (i) => i.slug === action.payload
            );

            if (find) {
                const index = state.activeNotes.indexOf(find);
                state.activeNotes.splice(index, 1);
            } else {
                if (state.archiveNotes) {
                    const find = state.archiveNotes.find(
                        (i) => i.slug === action.payload
                    );
                    if (find) {
                        const index = state.archiveNotes.indexOf(find);
                        state.archiveNotes.splice(index, 1);
                    }
                }
            }
        },
        setArchive(state, action: PayloadAction<string>) {
            const find = state.activeNotes.find(
                (i) => i.slug === action.payload
            );
            if (find) {
                notesSlice.caseReducers.deleteNote(state, action);
                if (state.archiveNotes) {
                    state.archiveNotes = [...state.archiveNotes, find];
                } else {
                    state.archiveNotes = [find];
                }
            } else {
                if (state.archiveNotes) {
                    const find = state.archiveNotes.find(
                        (i) => i.slug === action.payload
                    );
                    if (find) {
                        const index = state.archiveNotes.indexOf(find);
                        state.archiveNotes.splice(index, 1);
                        state.activeNotes = [...state.activeNotes, find];
                    }
                }
            }
            localStorage.setItem("active", JSON.stringify(state.activeNotes));
            localStorage.setItem("archive", JSON.stringify(state.archiveNotes));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotes.pending, (state) => {
            state.status = "loading";
            state.activeNotes = [];
        });
        builder.addCase(
            fetchNotes.fulfilled,
            (state, action: PayloadAction<INote[]>) => {
                state.status = "success";
                state.activeNotes = action.payload;
            }
        );
        builder.addCase(fetchNotes.rejected, (state) => {
            state.status = "rejected";
            state.activeNotes = [];
        });
    },
});

export const { setArchive, setActive, deleteNote } = notesSlice.actions;

export const selectNotes = (state: RootState) => state.notes;

export default notesSlice.reducer;
