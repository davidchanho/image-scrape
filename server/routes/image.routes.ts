import express from "express";
import * as controller from "../controllers/image.controller";

const router = express.Router();

router.route("").get(controller.getImages);

router.route("/pod").post(controller.getPOD);

router.route("/:_id").get(controller.getImage);

export default router;
