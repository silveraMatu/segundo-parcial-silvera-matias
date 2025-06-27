import { Router } from "express";
import { createBook, deleteBooks, getAllBooks, getBooksByID, updateBooks } from "../controllers/book.controllers.js";

const router = Router();

router.post("/books", createBook);
router.get("/books", getAllBooks);
router.get("/books/:id", getBooksByID);
router.patch("/books/:id", updateBooks);
router.delete("/books/:id", deleteBooks);

export default router;