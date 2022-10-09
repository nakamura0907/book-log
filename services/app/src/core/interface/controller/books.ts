import { NextFunction, Request, Response } from "express"

const bookController = () => {
    const addBook = (req: Request, res: Response, next: NextFunction) => {
        (async () => {
            // リクエスト内容の取得

            // レスポンス
            res.status(201).end();
        })().catch(next);
    }

    return { addBook }
}

export default bookController