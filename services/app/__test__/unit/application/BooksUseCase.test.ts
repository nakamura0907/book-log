import BooksUseCase from "@/core/application/usecase/books/BooksUseCase";
import FakeBooksRepository from "@/core/infrastructure/repository/fake/BooksRepository";
import Book from "@/core/domain/model/books/Book";
import { AddBookRequest } from "@/core/domain/dto/request/books";

describe("BooksUseCase", () => {
    describe("add", () => {
        it("正常系", async () => {
            const repository = new FakeBooksRepository();
            jest.spyOn(repository, "add").mockImplementation(async () => new Book(0, "userId", "テスト書籍", "読みたい"));
            const usecase = new BooksUseCase(repository);

            let request = new AddBookRequest("userId", "テスト書籍", 0);
            const result = await usecase.add(request);

            expect(result).toStrictEqual({
                id: 0
            });

            // TODO: 表紙画像あり版のテスト
        })
    })
}
);