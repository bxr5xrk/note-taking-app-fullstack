import { CreateNoteDTO } from "./dto/create-note.dto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { createNoteObj } from "src/utils/toolsForNoteObj";
import ActiveNote from "./activeNotes.model";
import ArchiveNote from "./archiveNotes.model";

export interface INote {
    id: number;
    title: string;
    slug: string;
    content: string;
    category: string;
    parseddates: string[];
    createdAt: string;
    updatedAt: string;
}

@Injectable()
class NotesService {
    constructor(
        @InjectModel(ActiveNote) private activeNoteRep: typeof ActiveNote,
        @InjectModel(ArchiveNote) private archiveNoteRep: typeof ArchiveNote
    ) {}

    async createNote(dto: CreateNoteDTO) {
        const note = await this.activeNoteRep.create(createNoteObj(dto));
        return note;
    }

    async getAllActive() {
        return await this.activeNoteRep.findAll({ order: [["id", "ASC"]] });
    }

    async getAllArchive() {
        return await this.archiveNoteRep.findAll({ order: [["id", "ASC"]] });
    }

    async getNoteBySlug(slug: string) {
        const note = await this.activeNoteRep.findOne({ where: { slug } });
        return note;
    }

    async deleteById(id: number) {
        const findInActive = await this.activeNoteRep.findOne({
            where: { id: id },
        });
        if (findInActive) {
            return await this.activeNoteRep.destroy({ where: { id: id } });
        } else {
            return await this.archiveNoteRep.destroy({ where: { id: id } });
        }
    }

    async updateNote(id: number, dto: CreateNoteDTO) {
        const note = await this.activeNoteRep.update(
            { ...createNoteObj(dto) },
            {
                where: { id: id },
            }
        );
        return note;
    }

    async archiveUnArchive(id: number) {
        if (!id) {
            throw new Error("No id");
        }
        const findInActive = await this.activeNoteRep.findOne({
            where: { id: id },
        });

        if (findInActive) {
            return this.moveNote(findInActive, "archive");
        } else {
            const findInArchive = await this.archiveNoteRep.findOne({
                where: { id: id },
            });
            if (findInArchive) {
                return this.moveNote(findInArchive, "unarchive");
            }
        }
    }

    async moveNote(note: ActiveNote, type: "archive" | "unarchive") {
        const {
            id,
            title,
            content,
            category,
            parseddates,
            slug,
            createdAt,
            updatedAt,
        } = note;

        const newNote =
            type === "archive"
                ? await this.archiveNoteRep.create()
                : await this.activeNoteRep.create();

        const updateMe =
            type === "archive" ? this.archiveNoteRep : this.activeNoteRep;

        await updateMe.update(
            {
                id,
                title,
                content,
                category,
                parseddates,
                slug,
                createdAt,
                updatedAt,
            },
            {
                where: { id: newNote.id },
            }
        );

        const destroyMe =
            type === "archive" ? this.activeNoteRep : this.archiveNoteRep;

        return await destroyMe.destroy({ where: { id: id } });
    }
}

export default NotesService;
