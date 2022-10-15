import express from "express";
import Controller from "./controller";

const router = express.Router();
const controller = new Controller();

router.route('/books').post(controller.addBook);

export default router;