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
            <h1>{type === "active" ? "Active notes" : "Archive notes"}</h1>
            <section className={st.list}>
                {notes.map((i) => (
                    <NoteItem
                        type={type}
                        id={i.id}
                        key={i.slug}
                        title={i.title}
                        slug={i.slug}
                        content={i.content}
                        createdAt={i.createdAt}
                        category={i.category}
                        parseddates={i.parseddates}
                    />
                ))}
            </section>
        </div>
    );
};

export default NotesList;
