import BooksUseCase from "@/core/books/application/BooksUseCase";
import Book from "@/core/books/domain/model/Book";
import PrismaBooksRepository from "@/core/books/infrastructure/repository/prisma/BooksRepository";
import {
  AddBookRequest,
  FetchBookListRequest,
} from "@/core/books/domain/dto/Request";
import { Readable } from "stream";
import MinioStorage from "@/core/books/infrastructure/storage/MinioStorage";
import BookDetail from "@/core/books/domain/model/BookDetail";
import Review from "@/core/books/domain/model/Review";
import Id from "@/core/shared/Id";
import BookScore from "@/core/books/domain/value/BookScore";

describe("BooksUseCase", () => {
  const repository = new PrismaBooksRepository();
  const storage = new MinioStorage();
  jest
    .spyOn(repository, "add")
    .mockImplementation(async () => new Book(1, 1, "テスト書籍", "読みたい"));
  jest.spyOn(repository, "fetchBookList").mockImplementation(async () => {
    return [
      new Book(1, 1, "テスト書籍", "読みたい"),
      new Book(
        1,
        1,
        "テスト書籍2",
        "読みたい",
        "https://example.com/cover_image.png"
      ),
    ];
  });
  jest.spyOn(repository, "fetchBookDetail").mockImplementation(async () => {
    return new BookDetail(new Book(1, 1, "テスト書籍", "読みたい"), undefined);
  });
  jest.spyOn(repository, "writeReview").mockImplementation(async () => {
    return new Review(new Id(1), new BookScore(3), "テストレビュー");
  })


  jest.spyOn(storage, "uploadCoverImage").mockImplementation(async () => {});

  const usecase = new BooksUseCase(repository, storage);

  describe("add", () => {
    it("正常系", async () => {
      let request = new AddBookRequest(1, "テスト書籍", 0);
      let result = await usecase.add(request);

      expect(result).toStrictEqual({
        id: 1,
      });
      expect(storage.uploadCoverImage).toBeCalledTimes(0);

      const coverImage: Express.Multer.File = {
        fieldname: "coverImage",
        originalname: "test.png",
        encoding: "7bit",
        mimetype: "image/png",
        destination: "/tmp",
        filename: "test.png",
        path: "/tmp/test.png",
        size: 100,
        stream: new Readable(),
        buffer: Buffer.from("test"),
      };
      request = new AddBookRequest(1, "テスト書籍", 0, coverImage);
      result = await usecase.add(request);

      expect(storage.uploadCoverImage).toBeCalledTimes(1);
      expect(result).toStrictEqual({
        id: 1,
      });
    });
  });

  describe("fetchBookList", () => {
    it("正常系", async () => {
      const userId = 1;
      const options = {
        status: undefined,
        skip: undefined,
        q: undefined,
      };
      const request = new FetchBookListRequest(userId, options);

      const result = await usecase.fetchBookList(request);
      expect(result).toStrictEqual({
        books: [
          {
            id: 1,
            title: "テスト書籍",
            status: "読みたい",
            coverImage: undefined,
          },
          {
            id: 1,
            title: "テスト書籍2",
            status: "読みたい",
            coverImage: "https://example.com/cover_image.png",
          },
        ],
      });
    });
  });

  describe("fetchBookDetail", () => {
    it("正常系", async () => {
      const userId = 1;
      const bookId = 1;

      const result = await usecase.fetchBookDetail(userId, bookId);
      expect(result).toStrictEqual({
        id: 1,
        title: "テスト書籍",
        status: "読みたい",
        coverImage: undefined,
        review: {
          score: undefined,
          comment: undefined,
        },
      });
    });
  });

  describe("write review", () => {
    it("正常系", async () => {
      const userId = 1;
      const bookId = 1;
      const score = 3;
      const comment = "テストコメント";

      const result = await usecase.writeReview(userId, bookId, score, comment);
      expect(result).toStrictEqual({
          id: 1,
          score: 3,
          comment: "テストコメント",
      });
    });
  })
});
