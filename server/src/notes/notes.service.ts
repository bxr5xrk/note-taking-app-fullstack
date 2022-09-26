import { CreateNoteDTO } from "./dto/create-note.dto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { createNoteObj } from "src/utils/toolsForNoteObj";
import ActiveNote from "./activeNotes.model";
import ArchiveNote from "./archiveNotes.model";

@Injectable()
class NotesService {
    constructor(
        @InjectModel(ActiveNote) private activeNoteRep: typeof ActiveNote,
        @InjectModel(ArchiveNote) private archiveNoteRep: typeof ArchiveNote
    ) {}

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
        const note = await this.activeNoteRep.create(createNoteObj(dto));
        return note;
    }

    async getAllActive() {
        return await this.activeNoteRep.findAll();
    }

    async getAllArchive() {
        return await this.archiveNoteRep.findAll();
    }

    async getNoteBySlug(slug: string) {
        const note = await this.activeNoteRep.findOne({ where: { slug } });
        return note;
    }

    async deleteById(id: number) {
        const note = await this.activeNoteRep.destroy({ where: { id: id } });
        return note;
    }
}

export default NotesService;
