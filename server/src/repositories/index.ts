import { Request, Response } from "express";
import { data } from "../data";

export const GET = (req: Request, res: Response) => {
    const { id } = req.body;
    res.json(data);
};

