import BookTitle from "@/core/domain/value/books/BookTitle";

describe("BookTitle", () => {
    test("バリデーション", () => {
        expect(() => BookTitle.validate("a")).not.toThrow(Error);

        expect(() => BookTitle.validate("")).toThrow(Error);
        expect(() => BookTitle.validate("a".repeat(256))).toThrow(Error);
    });
});