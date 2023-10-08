import express from 'express';
import dotenv from "dotenv"
dotenv.config()

import { DbConfig } from "./db/DbConfig"
import { routes } from "./routes"

DbConfig.initializeDb()
const app = express()
app.use(express.json())

app.use(routes)
const port = process.env.PORT || 3333

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});