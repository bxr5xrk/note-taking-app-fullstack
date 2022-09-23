import { Request, Response } from "express";
import NoteService from "../services/noteService";

class NoteController {
    createNote = async (req: Request, res: Response) => {
        try {
            const { title, content, category } = req.body;
            res.json(
                await NoteService.create({
                    title,
                    content,
                    category,
                })
            );
        } catch (e: any) {
            res.status(500).json(e.message);
        }
    };

    getNote = async (req: Request, res: Response) => {
        try {
            const { slug } = req.params;
            res.json(await NoteService.getOneById(slug));
        } catch (e: any) {
            res.status(500).json(e.message);
        }
    };

    getAllActive = async (req: Request, res: Response) => {
        try {
            res.json(await NoteService.getActive());
        } catch (e: any) {
            res.status(500).json(e.message);
        }
    };

    getAllArchive = async (req: Request, res: Response) => {
        try {
            res.json(await NoteService.getArchive());
        } catch (e: any) {
            res.status(500).json(e.message);
        }
    };

    updateNote = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const note = req.body;
            res.json(await NoteService.update({ id: Number(id), ...note }));
        } catch (e: any) {
            res.status(500).json(e.message);
        }
    };

    deleteNote = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            res.json(await NoteService.delete(Number(id)));
        } catch (e: any) {
            res.status(500).json(e.message);
        }
    };

    archiveUnArchive = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            res.json(await NoteService.archiveOrUnArchive(Number(id)));
        } catch (e: any) {
            res.status(500).json(e.message);
        }
    };

    getStats = async (req: Request, res: Response) => {
        res.json(await NoteService.stats());
    };
}

export default new NoteController();
