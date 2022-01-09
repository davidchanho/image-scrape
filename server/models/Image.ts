import mongoose from "mongoose";
import { IImage } from "../types";

const imageSchema = new mongoose.Schema<IImage>({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creditedTo: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model<IImage>("image", imageSchema);

export default Image;
