import { Router } from "express";
import { deleteController, getController, updateController, uploadController } from "../controllers/controller.js";

const router = Router();

router.post("/upload-product", uploadController);
router.get("/get-product", getController);
router.put("/update-product/:id", updateController);
router.delete("/delete-product/:id", deleteController);

export default router