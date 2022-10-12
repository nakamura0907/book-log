import type Express from "express"
import fileUpload from "@/middlewares/fileUpload";
import booksController from "../controller/books";

const booksRouter = (express: typeof Express) => {
    const router = express.Router();
    const controller = booksController();

    router.route("/books").get(controller.fetchBookList).post(fileUpload.single("coverImage"), controller.add);

    return router;
}

export default booksRouter