import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import NotesList from "../../components/NotesList/NotesList";
import Summary from "../../components/Summary/Summary";
import { selectNotes } from "../../store/slices/notesSlice";
import st from "./NotesPage.module.scss";
import { getNotes } from "../../service/NoteService";

const NotesPage = () => {
    const { activeNotes } = useSelector(selectNotes);

    useEffect(() => {
        getNotes().then((res) => console.log(res));
    }, []);

    return (
        <main className={st.root}>
            <NotesList notes={activeNotes} type="active" />

            <Summary />
        </main>
    );
};

export default NotesPage;
