import express from "express"
import { errorHandler } from "./infrastructure/middlewares/errorHandler.js";

const app = express();

app.use(errorHandler)
export default app;