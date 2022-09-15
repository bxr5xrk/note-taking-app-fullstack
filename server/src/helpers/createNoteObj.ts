import { format } from "date-fns";
import { INote } from "../../types";
import { parseDates } from "./parseDates";

export const createNoteObj = (
    activeNotes: INote[],
    noteTitle: string,
    content: string,
    category: string,
    noteCreationDate?: string,
    noteId?: number
) => {
    const prettifyTitle = noteTitle.replace(/[^\w ]/g, "");
    const slug = prettifyTitle.replace(" ", "-").toLowerCase();
    const isExists = activeNotes.find((i) => i.slug === slug);
    const title = prettifyTitle.at(0)?.toUpperCase() + prettifyTitle.slice(1);

    if (isExists) {
        return null;
    } else {
        const creationDate = noteCreationDate
            ? noteCreationDate
            : format(new Date(), "dd.MM.yyyy");
        const parsedDates = parseDates(content);
        const id = noteId ? noteId : Date.now();

        return {
            id,
            title,
            content,
            creationDate,
            category,
            parsedDates,
            slug,
        };
    }
};
