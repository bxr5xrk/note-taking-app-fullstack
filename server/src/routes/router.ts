import { Router } from "express";
import NoteController from "../controllers/NoteController";

const router = Router();

router.get("/notes", NoteController.getAll);
router.post("/notes", NoteController.create);
router.get("/notes/:id", NoteController.getOne);
router.patch("/notes/:id", NoteController.update);
router.delete("/notes/:id", NoteController.delete);

export default router;
