import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import NotesList from "../../components/NotesList/NotesList";
import Summary from "../../components/Summary/Summary";
import { fetchNotes } from "../../service/NoteService";
import { selectNotes } from "../../store/slices/notesSlice";
import { useAppDispatch } from "../../store/store";
import st from "./NotesPage.module.scss";

const NotesPage = () => {
    const { activeNotes } = useSelector(selectNotes);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!activeNotes.length) {
            dispatch(fetchNotes());
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main className={st.root}>
            <NotesList notes={activeNotes} type="active" />

            <Summary />
        </main>
    );
};

export default NotesPage;