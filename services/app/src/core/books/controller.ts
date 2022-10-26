import Exception from "@/utils/Exception";
import BooksUseCase from "./BooksUseCase";
import IBooksRepository from "./domain/repository/IBooksRepository";
import IBooksStorage from "./domain/repository/IBooksStorage";
import { toNumber } from "@/utils/util";
import { NextFunction, Request, Response } from "express";
import {
  AddBookRequest,
  EditBookRequest,
  FetchOptionsRequest,
} from "./domain/dto/Request";

const controller = (repository: IBooksRepository, storage: IBooksStorage) => {
  const usecase = new BooksUseCase(repository, storage);

  const addBook = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      // リクエスト内容の取得
      const { title, status } = req.body;
      const file = req.file;

      if (!title) throw new Exception("title is required", 400);

      const requestDto = new AddBookRequest(title, toNumber(status), file);

      // ユースケース
      const result = await usecase.addBook(requestDto);

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
      // リクエスト内容の取得
      const { skip, query, status, order } = req.query;

      const requestDto = new FetchOptionsRequest(
        toNumber(skip),
        query?.toString(),
        toNumber(status),
        order?.toString()
      );

      // ユースケース
      const result = await usecase.fetchBookList(requestDto);

      // レスポンス
      res.status(200).send(result);
    })().catch(next);
  };

  const fetchById = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      // リクエスト内容の取得
      const id = toNumber(req.params.bookId);
      if (!id) throw new Exception("bookId is not a valid value.", 400);

      // ユースケース
      const result = await usecase.fetchById(id);

      // レスポンス
      res.status(200).send(result);
    })().catch(next);
  };

  const editBook = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      // リクエスト内容の取得
      const id = toNumber(req.params.bookId);
      if (!id) throw new Exception("bookId is not a valid value.", 400);

      const { title, status, score, comment } = req.body;
      const file = req.file;

      const requestDto = new EditBookRequest(
        title,
        toNumber(status),
        file,
        toNumber(score),
        comment
      );

      // ユースケース
      const result = await usecase.editBook(id, requestDto);

      // レスポンス
      res.status(200).send(result);
    })().catch(next);
  };

  const removeBook = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      // リクエスト内容の取得
      const id = toNumber(req.params.bookId);
      if (!id) throw new Exception("bookId is not a valid value.", 400);

      // ユースケース
      await usecase.removeBook(id);

      // レスポンス
      res.status(204).send();
    })().catch(next);
  };

  return {
    addBook,
    fetchBookList,
    fetchById,
    editBook,
    removeBook,
  };
};

export default controller;
