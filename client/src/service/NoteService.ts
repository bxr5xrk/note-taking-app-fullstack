import { INote } from "./../types/index";
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

export const getOneNote = async (slug: string, setData: (i: INote) => void) => {
    const { data } = await $host.get<INote>(`notes/${slug}`);
    setData(data);
};

export const patchNote = async (
    id: number,
    obj: {
        title: string;
        content: string;
        category: string;
    }
) => {
    await $host.patch(`notes/${id}`, obj);
};
