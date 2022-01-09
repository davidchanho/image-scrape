import express from "express";
import imageRoutes from "./image.routes";

const app = express();

app.use("/images", imageRoutes);

export default app;
