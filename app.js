import express from "express";
import { config } from "dotenv";
import { join } from "path";

config({ path: join(__dirname, ".env") });

import { dbConnect } from "./db";

const { MONGODB_URI, MONGODB_PASSWORD } = process.env;

dbConnect(MONGODB_URI, MONGODB_PASSWORD).then(() => {
  console.log("DB Connected");
});

import cors from "cors";

const app = express();

import { postRouter } from "./api/routes/postRoutes";
import { deleteRouter } from "./api/routes/deleteRoutes";
import { getRouter } from "./api/routes/getRoutes";
import { updateRouter } from "./api/routes/updateRoutes";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8080;

//-------------All Routes----------------

app.use(postRouter);
app.use(deleteRouter);
app.use(getRouter);
app.use(updateRouter);

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
