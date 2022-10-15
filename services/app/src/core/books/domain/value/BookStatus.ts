import Exception from "@/lib/Exception";

// 読書状態
class BookStatus {
  private readonly _value: number;

  static validate(value: number) {
    if (value == 0) return new BookStatus(value);
    if (value == 1) return new BookStatus(value);
    if (value == 2) return new BookStatus(value);
    if (value == 3) return new BookStatus(value);
    throw new Exception("不正な読書状態です", 400);
  }

  constructor(value: number) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  get label() {
    if (this._value === 1) return "読みたい";
    if (this._value === 2) return "いま読んでる";
    if (this._value === 3) return "読み終わった";
    return "未設定";
  }
}

export default BookStatus;

