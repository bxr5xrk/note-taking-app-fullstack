import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const $host = axios.create({
    baseURL: "http://localhost:4000/api/",
});

export const fetchNotes = createAsyncThunk(
    "pizza/fetchNotesStatus",

    async () => {
        const { data } = await $host.get("notes");
        return data;
    }
);

export const postNote = async ({
    title,
    content,
    category,
}: {
    title: string;
    content: string;
    category: string;
}) => {
    await $host.post("notes", { title, content, category }).catch((e) => {
        console.log(e);
    });
};

export const deleteOneNote = async (slug: string) => {
    await $host.delete(`notes/${slug}`).catch((e) => {
        console.log(e);
    });
};
