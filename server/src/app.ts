import express from "express";
import { data } from "./data";
import router from "./routes/router";

const PORT = 5000;

const app = express();

app.use(express.json());
app.use('/api', router)

const startApp = () => {
    try {
        app.listen(PORT, () => console.log("PORT: " + PORT));
    } catch (e) {
        console.error(e);
    }
};

// app.post('/api/notes', (req, res) => {
//     const {value, key} = req.body

//     const note = {value, key}
//     res.json(note) 
// })

startApp();
