import { Request, Response } from "express";
import db from "../db";
import NoteService from "../services/NoteService";

class NoteController {
    // getAll = (req: Request, res: Response) => {
    //     res.json(NoteService.getAll());
    // };

    // create = (req: Request, res: Response) => {
    //     try {
    //         const note = NoteService.create(req.body);
    //         res.json(note);
    //     } catch (e: any) {
    //         res.status(500).json(e.message);
    //     }
    // };

    // getOne = (req: Request, res: Response) => {
    //     try {
    //         const note = NoteService.getOne(req.params.id);
    //         res.json(note);
    //     } catch (e: any) {
    //         res.status(500).json(e.message);
    //     }
    // };

    // update = (req: Request, res: Response) => {
    //     try {
    //         const note = NoteService.update(req.params.id, req.body);
    //         res.json(note);
    //     } catch (e: any) {
    //         res.status(500).json(e.message);
    //     }
    // };

    // delete = (req: Request, res: Response) => {
    //     try {
    //         const note = NoteService.delete(req.params.id);

    //         res.json(note);
    //     } catch (e: any) {
    //         res.status(500).json(e.message);
    //     }
    // };

    // stats = (req: Request, res: Response) => {
    //     res.json(NoteService.getStats());
    // };
    createNote = async (req: Request, res: Response) => {
        const { title, content } = req.body;
        const newNote = await db.query(
            "insert into activenotes (title, content) values ($1, $2) returning *",
            [title, content]
        );
        res.json(newNote.rows[0]);
    };
    getNote = async (req: Request, res: Response) => {
        const { id } = req.params;
        const note = await db.query("select * from activenotes where id = $1", [
            id,
        ]);
        res.json(note.rows[0]);
    };

    getAllNotes = async (req: Request, res: Response) => {
        const allNotes = await db.query("select * from activenotes");
        res.json(allNotes.rows);
    };
    updateNote = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, content } = req.body;
        const note = await db.query(
            "update activenotes set title = $1, content = $2 where id = $3 returning *",
            [title, content, id]
        );
        res.json(note.rows[0]);
    };
    deleteNote = async (req: Request, res: Response) => {
        const { id } = req.params;
        const note = await db.query("delete from activenotes where id = $1", [
            id,
        ]);
        res.json(note.rows[0]);
    };
}

export default new NoteController();
