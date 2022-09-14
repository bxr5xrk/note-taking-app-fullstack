import { Request, Response } from "express";
import { data } from "../data";

export const GET = (req: Request, res: Response) => {
    res.json(data);
};

class NoteController {
    getAll = (req: Request, res: Response) => {
        res.json(data);
    };

    post = (req: Request, res: Response) => {
        try {
            const { title } = req.body;
            const note = { title, id: Date.now() };
            data.push(note);
            res.json(data);
        } catch (e) {
            res.status(500).json(e);
        }
    };

    getOne = (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            !id && res.status(400).json({ message: "Id not found" });

            const find = data.find((i) => i.id === Number(id));

            !find && res.status(400).json({ message: "Wrong id" });

            res.json(find);
        } catch (e) {
            res.status(500).json(e);
        }
    };

    update = (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            !id && res.status(400).json({ message: "Id not found" });

            const { title } = req.body;
            const find = data.find((i) => i.id === Number(id));

            if (find) {
                find.title = title;
                const index = data.indexOf(find);
                data.splice(index, 1, find);
                res.json(find);
            } else {
                res.status(400).json({ message: "Wrong id" });
            }
        } catch (e) {
            res.status(500).json(e);
        }
    };

    delete = (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            !id && res.status(400).json({ message: "Id not found" });

            const find = data.find((i) => i.id === Number(id));
            if (find) {
                const index = data.indexOf(find);
                data.splice(index, 1);
                res.json(find);
            } else {
                res.status(400).json({ message: "Wrong id" });
            }
        } catch (e) {
            res.status(500).json(e);
        }
    };
}

export default new NoteController();
