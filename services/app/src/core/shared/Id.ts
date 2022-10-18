import Exception from "@/lib/Exception";

class Id {
  static validate(value: number) {
    if (value < 1 || !Number.isInteger(value)) {
      throw new Exception(`IDは1以上の整数で入力してください`, 400);
    }

    return new Id(value);
  }

  constructor(private readonly _value: number) {}

  get value() {
    return this._value;
  }
}

export default Id;
