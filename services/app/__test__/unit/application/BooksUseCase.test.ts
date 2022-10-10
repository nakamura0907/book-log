import BooksUseCase from "@/core/application/usecase/books/BooksUseCase";
import FakeBooksRepository from "@/core/infrastructure/repository/fake/BooksRepository";
import Book from "@/core/domain/model/books/Book";
import MinioStorage from "@/core/infrastructure/storage/minio/Storage";
import { AddBookRequest } from "@/core/domain/dto/request/books";
import { Readable } from "stream";

describe("BooksUseCase", () => {
    describe("add", () => {
        it("正常系", async () => {
            const repository = new FakeBooksRepository();
            const storage = new MinioStorage();
            jest.spyOn(repository, "add").mockImplementation(async () => new Book(0, "userId", "テスト書籍", "読みたい"));
            jest.spyOn(storage, "uploadCoverImage").mockImplementation(async () => {});

            const usecase = new BooksUseCase(repository, storage);

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
}
);