import { Body, Controller, Get, Post } from "@nestjs/common";
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
    getAll() {
        return this.notesService.getAllActive();
    }
}
