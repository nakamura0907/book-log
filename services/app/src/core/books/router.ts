import fileUpload from "@/middlewares/fileUpload";
import type Express from "express";
import BooksController from "./controller";
import MinioBooksStorage from "./infrastructure/minio/MinioBooksStorage";
import PrismaBooksRepository from "./infrastructure/prisma/PrismaBooksRepository";

const booksRouter = (express: typeof Express) => {
    const router = express.Router();

    const repository = new PrismaBooksRepository();
    const storage = new MinioBooksStorage();
    const controller = BooksController(repository, storage);

    router.route("/books")
        .get(controller.fetchBookList)
        .post(fileUpload.single("coverImage"), controller.addBook);

    router.route("/books/:bookId")
        .get(controller.fetchById)
        .put(fileUpload.single("coverImage"), controller.editBook)
        .delete(controller.removeBook);

    return router;
}

export default booksRouter;
