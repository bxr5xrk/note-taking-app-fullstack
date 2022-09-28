import React, { FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "../../components/Select/Select";
import { categories } from "../../config";
import { postNote } from "../../service/NoteService";
import { setActive } from "../../store/slices/notesSlice";
import { useAppDispatch } from "../../store/store";
import { wrongTitle } from "../../utils";
import st from "./NewNotePage.module.scss";

const NewNotePage: FC = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState(categories[0]);
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const [validate, setValidate] = useState(false);
    const titleRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { data } = await postNote({ title, content, category });
        if (data) {
            dispatch(setActive(data));
            navigate("/notes");
        } else {
            wrongTitle(titleRef);

            setValidate(true);

            setTimeout(() => {
                setValidate(false);
            }, 1000);
        }
    };

    return (
        <form className={st.root} onSubmit={(e) => handleSubmit(e)}>
            <input
                ref={titleRef}
                className={validate ? st.notValid : ""}
                type="text"
                autoFocus
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={30}
                minLength={2}
            />

            <Select
                category={category}
                isEditable={true}
                setCategory={setCategory}
            />

            <textarea
                className={validate ? st.notValid : ""}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter content"
                minLength={1}
                maxLength={500}
            ></textarea>

            <button className="btn" type="submit">
                Submit
            </button>
        </form>
    );
};

export default NewNotePage;
