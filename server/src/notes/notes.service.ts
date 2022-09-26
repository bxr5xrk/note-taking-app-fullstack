import { CreateNoteDTO } from "./dto/create-note.dto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Note from "./notes.model";
import { createNoteObj } from "src/utils/toolsForNoteObj";

@Injectable()
class NotesService {
    constructor(@InjectModel(Note) private noteRep: typeof Note) {}

    async createNote(dto: CreateNoteDTO) {
        // const { slug, newTitle } = (dto.title);
        // const find = await this.findTitle(slug, "create");
        // if (!find) {
        // const note = (
        //     await db.query(
        //         `insert into active (title, slug, content, category, parseddates) values ($1, $2, $3, $4, $5) returning *`,
        //         [newTitle, slug, content, category, parseDates(content)]
        //     )
        // ).rows[0];
        // return note;
        const note = await this.noteRep.create(createNoteObj(dto));
        return note;
    }

    async getAllActive() {
        return await this.noteRep.findAll();
    }

    async getNoteBySlug() {}
}

export default NotesService;
