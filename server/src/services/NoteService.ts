import { INote } from "../../types";
import { data } from "../data";
import { format } from "date-fns";
import { parseDates } from "../helpers/parseDates";
import { calculateCategoriesCount } from "../helpers/calculateCategoriesCount";
import { createNoteObj } from "../helpers/createNoteObj";

class NoteService {
    getAll = () => data;

    create = (note: Pick<INote, "title" | "content" | "category">) => {
        const { title, content, category } = note;
        const newNote = createNoteObj(data, title, content, category);
        if (newNote) {
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

        const note = data.find((i) => i.id === Number(id));
        if (note) {
            const index = data.indexOf(note);
            const isExists = data
                .filter((i) => i.id !== Number(id))
                .find((i) => i.slug === slug);

            if (!isExists) {
                const parsedDates = parseDates(content);

                const newNote: INote = {
                    id: note.id,
                    title:
                        prettifyTitle.at(0)?.toUpperCase() +
                        prettifyTitle.slice(1),
                    content,
                    creationDate: note.creationDate,
                    category,
                    parsedDates,
                    slug,
                };

                data.splice(index, 1, newNote);
                return newNote;
            } else {
                throw new Error(title + " already exists");
            }
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

    getStats = () => calculateCategoriesCount(data);
}

export default new NoteService();
