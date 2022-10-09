import type Express from "express"

const booksRouter = (express: typeof Express) => {
    const router = express.Router();

    return router;
}

export default booksRouter