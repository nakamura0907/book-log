import { NextFunction, Request, Response } from "express";
import {
  AddBookRequest,
  FetchBookListRequest,
} from "@/core/books/domain/dto/Request";
import BooksUseCase from "./application/BooksUseCase";
import IBooksStorage from "./domain/repository/IBooksStorage";
import IBooksRepository from "./domain/repository/IBooksRepository";

const controller = (repository: IBooksRepository, storage: IBooksStorage) => {
  const usecase = new BooksUseCase(repository, storage);

  const addBook = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      // リクエスト内容の取得
      const { title, status } = req.body;
      const file = req.file;
      const userId = 1;

      console.log(file);
      console.log(req.query);
      // 書籍追加ユースケース
      const request = new AddBookRequest(userId, title, status, file);
      const result = await usecase.add(request);

      // レスポンス
      const url =
        req.protocol +
        "://" +
        req.get("host") +
        req.originalUrl +
        `/${result.id}`;
      res.status(201).location(url).send(result);
    })().catch(next);
  };

  const fetchBookList = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      // リクエスト内容の受け取り
      const { status, skip, q } = req.query;
      const userId = 1;

      // 書籍一覧ユースケース
      const options = {
        status: status ? Number(status) || -1 : undefined,
        skip: skip ? Number(skip) || -1 : undefined,
        q: q ? q.toString() : undefined,
      };
      const request = new FetchBookListRequest(userId, options);
      const result = await usecase.fetchBookList(request);

      // レスポンス
      res.status(200).send(result);
    })().catch(next);
  };

  return { addBook, fetchBookList };
};

export default controller;
