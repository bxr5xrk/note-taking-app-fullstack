import { Router } from "express";
import noteController from "../controllers/note.controller";
import NoteController from "../controllers/note.controller";

const router = Router();

// router.get("/notes", NoteController.getAll);
// router.post("/notes", NoteController.create);
// router.get("/notes/stats", NoteController.stats);
// router.get("/notes/:id", NoteController.getOne);
// router.patch("/notes/:id", NoteController.update);
// router.delete("/notes/:id", NoteController.delete);

router.post("/notes", noteController.createNote);
router.get("/notes", noteController.getAllActive);
router.get("/notes/archive", noteController.getAllArchive);
router.get("/notes/:slug", noteController.getNote);
router.patch("/notes/:id", noteController.updateNote);
router.delete("/notes/:id", noteController.deleteNote);
router.patch("/notes/arch/:id", noteController.archiveUnArchive);

export default router;
