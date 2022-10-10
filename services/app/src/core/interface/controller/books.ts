import BooksUseCase from "@/core/application/usecase/books/BooksUseCase";
import FakeBooksRepository from "@/core/infrastructure/repository/fake/BooksRepository";
import MinioStorage from "@/core/infrastructure/storage/minio/Storage";
import { AddBookRequest } from "@/core/domain/dto/request/books";
import { NextFunction, Request, Response } from "express"

const booksController = () => {
    const repository = new FakeBooksRepository();
    const storage = new MinioStorage();
    const usecase = new BooksUseCase(repository, storage);

    const add = (req: Request, res: Response, next: NextFunction) => {
        (async () => {
            // リクエスト内容の取得
            const { title, status } = req.body
            const file = req.file;
            const userId = 1; // TODO: あとでなおす

            // 書籍追加ユースケース
            const request = new AddBookRequest(userId, title, status, file);
            const result = await usecase.add(request);

            // レスポンス
            const url = req.protocol + '://' + req.get('host') + req.originalUrl;
            const location = `${url}/${result.id}`;
            res.status(201).location(location).send(result);
        })().catch(next);
    }

    return { add }
}

export default booksController