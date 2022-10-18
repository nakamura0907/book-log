import fileUpload from "@/middlewares/fileUpload";
import type Express from "express";
import booksController from "./controller";
import PrismaBooksRepository from "./infrastructure/repository/prisma/BooksRepository";
import MinioStorage from "./infrastructure/storage/MinioStorage";

const booksRouter = (express: typeof Express) => {
  const router = express.Router();

  const repository = new PrismaBooksRepository();
  const storage = new MinioStorage();
  const controller = booksController(repository, storage);

  router
    .route("/books")
    .get(controller.fetchBookList)
    .post(fileUpload.single("coverImage"), controller.addBook);

  router.route("/books/:bookId").get(controller.fetchBookDetail);
  router.route("/books/:bookId/reviews").post(controller.writeReview);

  return router;
};

export default booksRouter;
