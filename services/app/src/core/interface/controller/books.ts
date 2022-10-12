import BooksUseCase from "@/core/application/usecase/books/BooksUseCase";
import MinioStorage from "@/core/infrastructure/storage/minio/Storage";
import PrismaBooksRepository from "@/core/infrastructure/repository/prisma/BooksRepository";
import { AddBookRequest, FetchBookListRequest } from "@/core/domain/dto/request/books";
import { NextFunction, Request, Response } from "express"

const booksController = () => {
    const repository = new PrismaBooksRepository();
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

    const fetchBookList = (req: Request, res: Response, next: NextFunction) => {
        (async () => {
            // リクエスト内容の受け取り
            const { status, skip, q } = req.query;
            const userId = 1;

            // 書籍一覧取得ユースケース
            const options = {
                status: status ? Number(status) || -1 : undefined,
                skip: skip ? Number(skip) || -1 : undefined,
                q: q ? q.toString() : undefined,
            }
            const request = new FetchBookListRequest(userId, options);
            const result = await usecase.fetchBookList(request);

            // レスポンス
            res.status(200).send(result)
        })().catch(next);
    }

    return { add, fetchBookList }
}

export default booksController
