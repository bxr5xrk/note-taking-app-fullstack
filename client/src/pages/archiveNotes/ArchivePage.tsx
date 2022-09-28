import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import NotesList from "../../components/NotesList/NotesList";
import { fetchArchiveNotes } from "../../service/NoteService";
import { selectNotes } from "../../store/slices/notesSlice";
import { useAppDispatch } from "../../store/store";
import st from "../activeNotes/NotesPage.module.scss";

const ArchivePage = () => {
    const { archiveNotes, statusArchive } = useSelector(selectNotes);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (archiveNotes.length < 2) {
            dispatch(fetchArchiveNotes());
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main className={st.root}>
            <NotesList
                notes={archiveNotes}
                type="archive"
                status={statusArchive}
            />
        </main>
    );
};

export default ArchivePage;
