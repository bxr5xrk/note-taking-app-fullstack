import { INote } from "./../types/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const $host = axios.create({
    baseURL: "http://localhost:5000/api/",
});

export const fetchActiveNotes = createAsyncThunk(
    "pizza/active/notesStatus",

    async () => {
        const { data } = await $host.get("notes");
        return data;
    }
);

export const fetchArchiveNotes = createAsyncThunk(
    "pizza/archive/notesStatus",

    async () => {
        const { data } = await $host.get("notes/archive");
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
    const note = await $host
        .post<INote>("notes", { title, content, category })
        .catch((e) => e);
    return note;
};

export const deleteOneNote = async (id: number) => {
    await $host.delete(`notes/${id}`).catch((e) => {
        console.log(e);
    });
};

export const getOneNote = async (slug: string) => {
    const { data } = await $host.get(`notes/${slug}`);

    return data;
};

export const patchNote = async (
    id: number,
    obj: {
        title: string;
        content: string;
        category: string;
    }
) => {
    const note = await $host.patch(`notes/${id}`, obj).catch((e) => e);
    return note;
};

export const archiveOrUnArchive = async (id: number) => {
    const note = await $host.patch(`notes/archive/${id}`).catch((e) => e);
    return note;
};

export const getStats = async () => {
    const { data } = await $host.get("notes/stats");
    return data;
};
