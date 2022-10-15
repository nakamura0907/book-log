import { NextFunction, Request, Response } from "express";

class Controller {
    addBook (req: Request, res: Response, next: NextFunction) {
        (async () => {
            // 書籍追加ユースケース
            // const request = AddBookRequest(userId, req.body, req.file);
            // const body = await usecase.addBook(request);
            const body = {};

            // レスポンス
            const url = req.protocol + '://' + req.get('host') + req.originalUrl + '/0';
            res.status(201).location(url).send(body);
        })().catch(next);
    }
}

export default Controller;
