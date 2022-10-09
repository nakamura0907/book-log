import BookScore from "@/core/domain/value/BookScore";

describe("BookScore", () => {
    test("バリデーション", () => {
        const minScore = BookScore.MIN_SCORE;
        const maxScore = BookScore.MAX_SCORE;

        expect(BookScore.validate(minScore)).toStrictEqual(new BookScore(minScore));
        expect(BookScore.validate(maxScore)).toStrictEqual(new BookScore(maxScore));

        expect(() => BookScore.validate(1.1)).toThrow(Error)
        expect(() => BookScore.validate(minScore - 1)).toThrow(Error)
        expect(() => BookScore.validate(maxScore + 1)).toThrow(Error)
    })
    test("ゲッター", () => {
        expect(new BookScore(0).value).toBe(0);
        expect(new BookScore(3).value).toBe(3);
        expect(new BookScore(5).value).toBe(5);
    })
})