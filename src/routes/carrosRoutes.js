import express from "express";
import {getAllCarros, getByIdCarros, createCarros, deleteCarros} from "../controllers/carrosController.js";

const router = express.Router();

router.get("/", getAllCarros);
router.get("/:id", getByIdCarros);
router.post("/", createCarros);
router.delete("/:id", deleteCarros);

export default router;