import React, { useEffect, useState } from "react";
import st from "../NotesList/NotesList.module.scss";
import st_ from "../NoteItem/NoteItem.module.scss";
import { getStats } from "../../service/NoteService";
import { useSelector } from "react-redux";
import { selectNotes } from "../../store/slices/notesSlice";
import { IStats } from "../../types";
import { addStatsForArchive } from "../../utils/addStatsForArchive";

const Summary = () => {
    const { activeNotes, archiveNotes } = useSelector(selectNotes);
    const [stats, setStats] = useState<IStats[] | null>(null);

    useEffect(() => {
        if (activeNotes.length > 1) {
            getStats().then((i) => setStats(i));
        }
    }, [activeNotes]);

    return (
        <section className={st.root}>
            {stats &&
                addStatsForArchive(archiveNotes!, stats).map((i) => (
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
