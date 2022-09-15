import React, { FC } from "react";
import { INote } from "../../types";
import NoteItem from "../NoteItem/NoteItem";
import st from "./NotesList.module.scss";

interface NotesListProps {
    notes: INote[];
    type: "active" | "archive";
}

const NotesList: FC<NotesListProps> = ({ notes, type }) => {
    if (!notes.length) {
        return <h2>No notes</h2>;
    }

    return (
        <div className={st.root}>
            <h1>Notes</h1>
            <section className={st.list}>
                {notes.map((i) => (
                    <NoteItem
                        type={type}
                        key={i.slug}
                        title={i.title}
                        slug={i.slug}
                        content={i.content}
                        creationDate={i.creationDate}
                        category={i.category}
                        parsedDates={i.parsedDates}
                    />
                ))}
            </section>
        </div>
    );
};

export default NotesList;
