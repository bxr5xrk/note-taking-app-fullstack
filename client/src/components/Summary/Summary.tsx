import { useEffect, useState } from "react";
import st from "../NotesList/NotesList.module.scss";
import st_ from "../NoteItem/NoteItem.module.scss";
import { getStats } from "../../service/NoteService";
import { IStats } from "../../types";

const Summary = () => {
    const [stats, setStats] = useState<IStats[] | null>(null);

    useEffect(() => {
        getStats().then((i) => setStats(i));
    }, []);

    return (
        <div className={st.root}>
            <h1>Summary</h1>
            <section className={st.list}>
                {stats &&
                    stats.map((i) => (
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
        </div>
    );
};

export default Summary;
