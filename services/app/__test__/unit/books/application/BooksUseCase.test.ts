import BooksUseCase from "@/core/books/application/BooksUseCase";
import Book from "@/core/books/domain/model/Book";
import MinioStorage from "@/core/shared/infrastructure/storage/minio/Storage";
import PrismaBooksRepository from "@/core/books/infrastructure/repository/prisma/BooksRepository";
import { AddBookRequest, FetchBookListRequest } from "@/core/books/domain/dto/Request";
import { Readable } from "stream";

describe("BooksUseCase", () => {
   const repository = new PrismaBooksRepository();
   const storage = new MinioStorage();
   jest.spyOn(repository, "add").mockImplementation(async () => new Book(0, "userId", "テスト書籍", "読みたい"));
   jest.spyOn(repository, "fetchBookList").mockImplementation(async () => {
    return [
      new Book(0, "userId", "テスト書籍", "読みたい"),
      new Book(1, "userId", "テスト書籍2", "読みたい", "https://example.com/cover_image.png"),
    ];
   });
   jest.spyOn(storage, "uploadCoverImage").mockImplementation(async () => {});

   const usecase = new BooksUseCase(repository, storage);

   describe("add", () => {
        it("正常系", async () => {
            let request = new AddBookRequest("userId", "テスト書籍", 0);
            let result = await usecase.add(request);

            expect(result).toStrictEqual({
                id: 0
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
                buffer: Buffer.from("test")
            };
            request = new AddBookRequest("userId", "テスト書籍", 0, coverImage);
            result = await usecase.add(request);

            expect(storage.uploadCoverImage).toBeCalledTimes(1);
            expect(result).toStrictEqual({
                id: 0
            });
        })
    })
    describe("fetchBookList", () => {
      it("正常系", async () => {
        const userId = 0;
        const options = {
         status: undefined,
         skip: undefined, 
         q: undefined,
        };
        const request = new FetchBookListRequest(userId, options);

        const result = await usecase.fetchBookList(request);
        expect(result).toStrictEqual({
          books: [{
            id: 0,
            title: "テスト書籍",
            status: "読みたい",
            coverImage: undefined,
          }, {
            id: 1,
            title: "テスト書籍2",
            status: "読みたい",
            coverImage: "https://example.com/cover_image.png",
          }],
        });
      });
    });
}
);
