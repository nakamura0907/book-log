import Exception from "@/lib/Exception";

type Score = 0 | 1 | 2 | 3 | 4 | 5;

class BookScore {
  static readonly MIN_SCORE = 0;
  static readonly MAX_SCORE = 5;

  constructor(private readonly _value: Score) {}

  get value() {
    return this._value;
  }

  static validate(value: number) {
    if (!Number.isInteger(value)) throw new Exception("不正なスコアです");
    if (value < this.MIN_SCORE || value > this.MAX_SCORE)
      throw new Exception(
        `書籍のスコアは${this.MIN_SCORE}から${this.MAX_SCORE}までの数値です`
      );

    return new BookScore(value as Score);
  }
}

export default BookScore;
