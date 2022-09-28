import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Select from "../../components/Select/Select";
import { getOneNote, patchNote } from "../../service/NoteService";
import { selectNotes, setActive } from "../../store/slices/notesSlice";
import { useAppDispatch } from "../../store/store";
import { INote } from "../../types";
import { wrongTitle } from "../../utils";
import st from "./NotePage.module.scss";

const NotePage = () => {
    const { slugParams } = useParams();
    const { activeNotes } = useSelector(selectNotes);
    const [note, setNote] = useState<INote | null>(null);
    const [showError, setShowError] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [category, setCategory] = useState<string>("");
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const titleRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (slugParams) {
            if (activeNotes.length) {
                const findItem = activeNotes.find((i) => i.slug === slugParams);
                if (findItem) {
                    setNote(findItem);
                } else {
                    setShowError(true);
                }
            } else {
                getOneNote(slugParams)
                    .then((i) => setNote(i))
                    .catch((e) => setShowError(true));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slugParams]);

    useEffect(() => {
        if (note) {
            setShowError(false);
            setTitle(note.title);
            setCategory(note.category);
            setContent(note.content);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [note]);

    if (showError) {
        return (
            <h3>
                no matches found for {slugParams}. Check that the slug params
                are correct
            </h3>
        );
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (note) {
            const { data } = await patchNote(note.id, {
                title,
                content,
                category,
            });
            if (data) {
                dispatch(setActive(data));
                setIsEditable(false);
            } else {
                wrongTitle(titleRef);
            }
        }
    };

    const handleEditClick = () => {
        setIsEditable(true);
        titleRef.current && titleRef.current.focus();
    };

    return (
        <form className={st.root} onSubmit={(e) => handleSubmit(e)}>
            {note && (
                <>
                    <Link to="/notes" className={st.back}>
                        back
                    </Link>

                    <div className={st.top}>
                        {!isEditable && (
                            <svg
                                onClick={handleEditClick}
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 490.305 490.305"
                            >
                                <path
                                    d="M472.469,81.443l-63.6-63.6c-13.1-16.4-53.2-30.2-83.4,0l-290.9,289.9l0,0c-4.4,4.4-6.5,10.1-6.2,15.6l-27.1,141.8
		c-4.2,16.2,11.9,26.6,22.9,25l147-29.2c4.2,0,7.3-2.1,10.4-5.2l290.9-289.8C495.469,142.943,495.469,104.443,472.469,81.443z
		 M354.669,46.043c6.3-7.3,18.8-7.3,26.1,0l17.3,17l-289.7,289.7l-30.1-30.4L354.669,46.043z M61.769,364.043l64.4,64.4l-80.1,15.8
		L61.769,364.043z M444.369,135.643l-276.8,276.8l-30.1-30.4l290-290l16.8,16.5C453.469,118.343,449.169,130.743,444.369,135.643z"
                                />
                            </svg>
                        )}
                        <input
                            ref={titleRef}
                            type="text"
                            readOnly={!isEditable}
                            placeholder="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={30}
                            minLength={2}
                        />
                    </div>

                    <p>{note.createdAt}</p>

                    <Select
                        category={category}
                        isEditable={isEditable}
                        setCategory={setCategory}
                    />

                    <textarea
                        readOnly={!isEditable}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter content"
                        maxLength={500}
                        minLength={1}
                    ></textarea>

                    {isEditable && (
                        <button className="btn" type="submit">
                            Submit
                        </button>
                    )}
                </>
            )}
        </form>
    );
};

export default NotePage;
