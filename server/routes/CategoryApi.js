import { Router } from "express";
import * as CategoryController from "../controller/CategoryController.js";

const router = Router();

router.post("/", CategoryController.create);
router.patch("/:id", CategoryController.update);
router.delete("/:id", CategoryController.remove);

export default router;
