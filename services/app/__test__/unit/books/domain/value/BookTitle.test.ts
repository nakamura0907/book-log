import BookTitle from "@/core/books/domain/value/BookTitle";

describe("BookTitle", () => {
    test("バリデーション", () => {
        expect(() => BookTitle.validate("a")).not.toThrow(Error);

        expect(() => BookTitle.validate("")).toThrow(Error);
        expect(() => BookTitle.validate("a".repeat(256))).toThrow(Error);
    });
});