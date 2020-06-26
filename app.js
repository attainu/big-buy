const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const cors = require("cors")


dotenv.config();
require("./db");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


const PORT = process.env.PORT || 8080;



//-------------All Routes----------------




app.use(require("./api/routes/postRoutes"))
app.use(require("./api/routes/deleteRoutes"))
app.use(require("./api/routes/getRoutes"))
app.use(require("./api/routes/updateRoutes"))




app.listen(PORT,()=>console.log(`Server Started at PORT ${PORT}`))