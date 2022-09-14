import React, { FC } from "react";
import { categories } from "../../config";
import st from "./Select.module.scss";

interface SelectProps {
    category: string;
    isEditable: boolean;
    setCategory: (i: string) => void;
}

const Select: FC<SelectProps> = ({ category, isEditable, setCategory }) => {
    return (
        <div className={st.root}>
            {isEditable && <p>Select Category:</p>}
            <select
                value={category}
                disabled={!isEditable}
                onChange={(e) => setCategory(e.target.value)}
            >
                {categories.map((i) => (
                    <option key={i} value={i}>
                        {i}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
