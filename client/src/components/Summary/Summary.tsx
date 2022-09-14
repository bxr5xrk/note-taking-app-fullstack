import React from "react";
import { useSelector } from "react-redux";
import { selectNotes } from "../../store/slices/notesSlice";
import { calculateCategoriesCount } from "../../utils/calculateCategoriesCount";
import st from "../NotesList/NotesList.module.scss";
import st_ from "../NoteItem/NoteItem.module.scss";

const Summary = () => {
    const { activeNotes, archiveNotes } = useSelector(selectNotes);

    const items = archiveNotes
        ? calculateCategoriesCount(activeNotes, archiveNotes)
        : calculateCategoriesCount(activeNotes);

    return (
        <section className={st.root}>
            {items.map((i) => (
                <div key={i.category} className={st_.root}>
                    <h1>{i.category}</h1>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <h3>Total: {i.count.total}</h3>
                        <h3>Active: {i.count.active}</h3>
                        <h3>Archive: {i.count.archive}</h3>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Summary;
