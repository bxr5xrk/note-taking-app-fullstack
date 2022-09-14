import { Request, Response } from "express";
import NoteService from "../services/NoteService";

class NoteController {
    getAll = (req: Request, res: Response) => {
        res.json(NoteService.getAll());
    };

    create = (req: Request, res: Response) => {
        try {
            const note = NoteService.create(req.body);
            res.json(note);
        } catch (e) {
            res.status(500).json(e);
        }
    };

    getOne = (req: Request, res: Response) => {
        try {
            const note = NoteService.getOne(Number(req.params.id));
            res.json(note);
        } catch (e: any) {
            res.status(500).json(e.message);
        }
    };

    update = (req: Request, res: Response) => {
        try {
            const note = NoteService.update(req.params.id, req.body);
            res.json(note);
        } catch (e: any) {
            res.status(500).json(e.message);
        }
    };

    delete = (req: Request, res: Response) => {
        try {
            const note = NoteService.delete(req.params.id);
            res.json(note);
        } catch (e: any) {
            res.status(500).json(e.message);
        }
    };
}

export default new NoteController();
