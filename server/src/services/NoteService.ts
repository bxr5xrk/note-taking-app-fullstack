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
