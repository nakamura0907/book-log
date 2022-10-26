import Exception from "@/lib/Exception";

class BookStatus {
  private readonly _value: number;

  constructor(value: number) {
    this._value = value;

    Object.freeze(this);
  }

  static validate(value: number) {
    if (value < 0 || value > 3 || !Number.isInteger(value)) {
      throw new Exception("書籍状況は0〜3の間で入力してください", 400);
    }
    return new BookStatus(value);
  }

  static get UNSET() {
    return new BookStatus(0);
  }

  get value() {
    return this._value;
  }

  get label() {
    if (this._value === 1) {
      return "読みたい";
    }
    if (this._value === 2) {
      return "いま読んでる";
    }
    if (this._value === 3) {
      return "読み終わった";
    }
    return "未設定";
  }
}

export default BookStatus;
