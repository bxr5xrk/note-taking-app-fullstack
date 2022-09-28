import { parseDates } from "./../../../client/src/utils/parseDates";
import { CreateNoteDTO } from "./../notes/dto/create-note.dto";

export const createNoteObj = (dto: CreateNoteDTO) => {
    const { title, content, category } = dto;
    const prettifyTitle = title
        .replace(/[^\w ]/g, "")
        .split(" ")
        .filter((i) => i)
        .join(" ");
    const slug = prettifyTitle.toLowerCase().split(" ").join("-");
    const newTitle =
        prettifyTitle.at(0)?.toUpperCase() + prettifyTitle.slice(1);

    return {
        title: newTitle,
        slug,
        content,
        category,
        parseddates: parseDates(content),
    };
};
