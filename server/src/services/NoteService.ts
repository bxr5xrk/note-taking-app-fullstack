import { Request, Response } from "express";
import { INote } from "../../types";
import { data } from "../data";

class NoteService {
    getAll = () => {
        return data;
    };

    create = (note: { title: string }) => {
        const { title } = note;
        const createdNote = { title, id: Date.now() };
        data.push(createdNote);
        return createdNote;
    };

    getOne = (id: number) => {
        if (!id) {
            throw new Error("Id not found");
        }
        const find = data.find((i) => i.id === id);
        if (!find) {
            throw new Error("Wrong id");
        } else {
            return find;
        }
    };

    update = (id: string, body: INote) => {
        if (!id) {
            throw new Error("Id not found");
        }
        const { title } = body;
        const find = data.find((i) => i.id === Number(id));

        if (find) {
            find.title = title;
            const index = data.indexOf(find);
            data.splice(index, 1, find);
            return find;
        } else {
            throw new Error("Wrong id");
        }
    };

    delete = (id: string) => {
        const find = data.find((i) => i.id === Number(id));
        if (find) {
            const index = data.indexOf(find);
            data.splice(index, 1);
            return find;
        } else {
            throw new Error("Wrong id");
        }
    };
}

export default new NoteService();
