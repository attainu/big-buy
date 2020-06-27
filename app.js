import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import cors from "cors";

dotenv.config();
require("./db");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

//-------------All Routes----------------

app.use(require("./api/routes/postRoutes"));
app.use(require("./api/routes/deleteRoutes"));
app.use(require("./api/routes/getRoutes"));
app.use(require("./api/routes/updateRoutes"));

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
