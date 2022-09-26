import { Router } from "express";
import noteController from "../controllers/noteController";

const router = Router();

router.post("/notes", noteController.createNote);
router.get("/notes", noteController.getAllActive);
router.get("/notes/archive", noteController.getAllArchive);
router.get("/notes/stats", noteController.getStats);
router.get("/notes/:slug", noteController.getNote);
router.patch("/notes/:id", noteController.updateNote);
router.delete("/notes/:id", noteController.deleteNote);
router.patch("/notes/arch/:id", noteController.archiveUnArchive);

export default router;
