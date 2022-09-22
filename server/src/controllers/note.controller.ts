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
        const { title, slug, content, category, parsedDates } = req.body;
        const newNote = await db.query(
            "insert into active (title, slug, content, category, parsedDates) values ($1, $2, $3, $4, $5) returning *",
            [title, slug, content, category, parsedDates]
        );
        res.json(newNote.rows[0]);
    };

    getNote = async (req: Request, res: Response) => {
        const { slug } = req.params;
        const note = await db.query("select * from active where slug = $1", [
            slug,
        ]);
        res.json(note.rows[0]);
    };

    getAllActive = async (req: Request, res: Response) => {
        const allNotes = await db.query("select * from active ORDER BY id asc");

        res.json(allNotes.rows);
    };

    getAllArchive = async (req: Request, res: Response) => {
        const allNotes = await db.query(
            "select * from archive ORDER BY id asc"
        );

        res.json(allNotes.rows);
    };

    updateNote = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, slug, content, category, parsedDates } = req.body;
        const note = await db.query(
            "update active set title = $1, slug = $2, content = $3, category = $4, parsedDates = $5 where id = $6 returning *",
            [title, slug, content, category, parsedDates, id]
        );
        res.json(note.rows[0]);
    };

    deleteNote = async (req: Request, res: Response) => {
        const { id } = req.params;
        const note = await db.query("select * from active where id = $1", [id]);
        if (note.rows[0]) {
            await db.query("delete from active where id = $1", [id]);
        } else {
            await db.query("delete from archive where id = $1", [id]);
        }
        res.json(note.rows[0]);
    };

    archiveUnArchive = async (req: Request, res: Response) => {
        const { id } = req.params;
        const note = await db.query("select * from active where id = $1", [id]);
        if (note.rows[0]) {
            await db.query(
                "with item as (delete from active where id = $1 returning *) insert into archive select * from item",
                [id]
            );
        } else {
            await db.query(
                "with item as (delete from archive where id = $1 returning *) insert into active select * from item",
                [id]
            );
        }
        res.json("ok");
    };
}

export default new NoteController();

// WITH moved_rows AS (
//     DELETE FROM <original_table> a
//     USING <other_table> b
//     WHERE <condition>
//     RETURNING a.* -- or specify columns
// )
// INSERT INTO <existing_table> --specify columns if necessary
// SELECT [DISTINCT] * FROM moved_rows;

// WITH ah_well AS (
//     DELETE FROM active
//           WHERE NOT started
//       RETURNING *
// )
// INSERT INTO archive
//             SELECT * FROM ah_well;

// with item as (delete from active where id = 4 returning *) insert into archive select * from item;
// with item as (delete from archive where id = 4 returning *) insert into active select * from item;
