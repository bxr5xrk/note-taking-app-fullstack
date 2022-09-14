import { INote } from "../../types";
import { data } from "../data";
import { format } from "date-fns";
import { parseDates } from "../helpers/parseDates";

class NoteService {
    getAll = () => {
        return data;
    };

    create = (note: Pick<INote, "title" | "content" | "category">) => {
        const { title, content, category } = note;
        const prettifyTitle = title.replace(/[^\w ]/g, "");
        const slug = prettifyTitle.replace(" ", "-").toLowerCase();

        const isExists = data.find((i) => i.slug === slug);
        if (!isExists) {
            const creationDate = format(new Date(), "dd.MM.yyyy");
            const parsedDates = parseDates(content);

            const newNote: INote = {
                id: Date.now(),
                title:
                    prettifyTitle.at(0)?.toUpperCase() + prettifyTitle.slice(1),
                content,
                creationDate,
                category,
                parsedDates,
                slug,
            };
            data.push(newNote);
            return newNote;
        } else {
            throw new Error(title + " already exists");
        }
    };

    getOne = (slug: string) => {
        if (!slug) {
            throw new Error("note not found");
        }
        const find = data.find((i) => i.slug === slug);
        if (!find) {
            throw new Error("Wrong note slug");
        } else {
            return find;
        }
    };

    update = (id: string, body: INote) => {
        const { title, content, category } = body;
        const prettifyTitle = title.replace(/[^\w ]/g, "");
        const slug = prettifyTitle.replace(" ", "-").toLowerCase();

        const isExists = data.find((i) => i.slug === slug);
        console.log(isExists);
        if (!isExists) {
            const note = data.find((i) => i.id === Number(id));
            const parsedDates = parseDates(content);

            if (note) {
                const newNote: INote = {
                    id: Date.now(),
                    title:
                        prettifyTitle.at(0)?.toUpperCase() +
                        prettifyTitle.slice(1),
                    content,
                    creationDate: note.creationDate,
                    category,
                    parsedDates,
                    slug,
                };
                const index = data.indexOf(note);
                data.splice(index, 1, newNote);
                return newNote;
            }
        } else {
            throw new Error(title + " already exists");
        }
    };

    delete = (slug: string) => {
        const find = data.find((i) => i.slug === slug);
        if (find) {
            const index = data.indexOf(find);
            data.splice(index, 1);
            return find;
        } else {
            throw new Error("Wrong slug");
        }
    };
}

export default new NoteService();
