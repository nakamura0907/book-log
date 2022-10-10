import BooksUseCase from "@/core/application/usecase/books/BooksUseCase";
import FakeBooksRepository from "@/core/infrastructure/repository/fake/BooksRepository";
import { AddBookRequest } from "@/core/domain/dto/request/books";
import { NextFunction, Request, Response } from "express"

const bookController = () => {
    const repository = new FakeBooksRepository();
    const usecase = new BooksUseCase(repository);

    const add = (req: Request, res: Response, next: NextFunction) => {
        (async () => {
            // リクエスト内容の取得
            const { title, status } = req.body
            const file = req.file;
            const userId = 1; // TODO: あとでなおす

            const request = new AddBookRequest(userId, title, status, file);
            const result = await usecase.add(request);

            // レスポンス
            res.status(201).location(`/books/${result.id}`).send(result);
        })().catch(next);
    }

    return { add }
}

export default bookController