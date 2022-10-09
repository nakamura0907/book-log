import BookStatus from "@/core/domain/value/books/BookStatus";

describe("BookStatus", () => {
    test("バリデーション", () => {
        expect(() => BookStatus.validate(0)).not.toThrow(Error);
        expect(() => BookStatus.validate(1)).not.toThrow(Error);
        expect(() => BookStatus.validate(2)).not.toThrow(Error);
        expect(() => BookStatus.validate(3)).not.toThrow(Error);

        expect(() => BookStatus.validate(-1)).toThrow(Error);
        expect(() => BookStatus.validate(4)).toThrow(Error);
        expect(() => BookStatus.validate(1.1)).toThrow(Error);
    })
    test("ゲッター", () => {
        const value = 1;
        const bookStatus = BookStatus.validate(value);

        expect(bookStatus.value).toBe(value);
        expect(bookStatus.label).toBe("読みたい");
    })
})
