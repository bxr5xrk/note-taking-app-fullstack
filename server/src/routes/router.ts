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
router.get("/notes", noteController.getAllNotes);
router.get("/notes/:id", noteController.getNote);
router.patch("/notes/:id", noteController.updateNote);
router.delete("/notes/:id", noteController.deleteNote);

// module.exports = router;

export default router;
