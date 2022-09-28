import { Navigate } from "react-router-dom";
import Summary from "../components/Summary/Summary";
import ArchivePage from "../pages/archiveNotes/ArchivePage";
import NewNotePage from "../pages/newNote/NewNotePage";
import NotePage from "../pages/note/NotePage";
import NotesPage from "../pages/activeNotes/NotesPage";

export const routes = [
    { path: "/", element: <Navigate to="/notes" replace={true} /> },
    { path: "/notes", element: <NotesPage /> },
    { path: "/notes/:slugParams", element: <NotePage /> },
    { path: "/archive", element: <ArchivePage /> },
    { path: "/stats", element: <Summary /> },
    { path: "/new", element: <NewNotePage /> },
];
