import express from "express";
import router from "./routes/router";
import cors from "cors";

const PORT = 4000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);

const startApp = () => {
    try {
        app.listen(PORT, () => console.log("PORT: " + PORT));
    } catch (e) {
        console.error(e);
    }
};

startApp();
