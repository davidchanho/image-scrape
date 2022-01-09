import compression from "compression";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import routes from "./routes";

mongoose.connect("mongodb://localhost:27017/nasa", () => {
  const app = express();
  const PORT = process.env.PORT ?? 4000;

  app.use(express.json());
  app.use(morgan("dev"));
  app.use(compression());

  app.use("/api", routes);

  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});
