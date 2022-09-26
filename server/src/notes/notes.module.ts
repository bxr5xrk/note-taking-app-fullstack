import { SequelizeModule } from "@nestjs/sequelize";
import { Module } from "@nestjs/common";
import { NotesController } from "./notes.controller";
import Note from "./notes.model";
import NotesService from "./notes.service";

@Module({
    controllers: [NotesController],
    providers: [NotesService],
    imports: [SequelizeModule.forFeature([Note])],
})
export class NotesModule {}
