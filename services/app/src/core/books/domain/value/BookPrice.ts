import Exception from "@/lib/Exception";

class BookPrice {
  private readonly _value: number;

  constructor(value: number) {
    this._value = value;

    Object.freeze(this);
  }

  static validate(value: number) {
    if (value < 0 || value > 50000 || !Number.isInteger(value)) {
      throw new Exception("書籍価格は0〜50000の間で入力してください", 400);
    }
    return new BookPrice(value);
  }

  get value() {
    return this._value;
  }
}

export default BookPrice;
