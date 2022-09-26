import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateNoteDTO } from "./dto/create-note.dto";
import NotesService from "./notes.service";

@Controller("notes")
export class NotesController {
    constructor(private notesService: NotesService) {}

    @Post()
    create(@Body() noteDto: CreateNoteDTO) {
        return this.notesService.createNote(noteDto);
    }

    @Get()
    getAllActive() {
        return this.notesService.getAllActive();
    }

    @Get("/archive")
    getAllArchive() {
        return this.notesService.getAllArchive();
    }

    @Get(":slug")
    getOne(@Param("slug") slug: string) {
        return this.notesService.getNoteBySlug(slug);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.notesService.deleteById(+id);
    }
}
