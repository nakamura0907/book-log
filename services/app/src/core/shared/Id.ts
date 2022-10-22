import Exception from "@/lib/Exception";

export class GeneratedId {
  private readonly _value: number;
  readonly isGenerated = true as const;

  constructor(value: number) {
    this._value = value;

    Object.freeze(this);
  }

  static validate(value: number) {
    if (value < 1 || !Number.isInteger(value)) {
      throw new Exception(`IDは1以上の整数で入力してください`, 400);
    }

    return new GeneratedId(value);
  }

  get value() {
    return this._value;
  }
}

export class NoneId {
  static readonly instance = new NoneId();
  readonly isGenerated = false as const;

  private constructor() {}

  get value() {
    throw new Exception(`IDが生成されていません`, 400);
  }
}

export type Id = GeneratedId | NoneId;