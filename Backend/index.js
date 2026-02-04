import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectionDB from "../Backend/Data_base/dataconnection.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


import route from "./routes/urlroutes.route.js";

app.use("/api/url",route);
// http://localhost:8000/api/url/shorten
// http://localhost:8000/api/url/{shortid}

app.listen(process.env.PORT || "0.0.0.0" ,async () =>
{
    await connectionDB();
    console.log(`Server running on port ${process.env.PORT}`)
})
