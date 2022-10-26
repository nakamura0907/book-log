import Exception from "@/lib/Exception";

export type OrderLatest = "createdAt" | "-createdAt";
export type OrderScore = "score" | "-score";
export type OrderUpdated = "-updatedAt";
export type OrderPrice = "price" | "-price";
export type Order = OrderLatest | OrderScore | OrderUpdated | OrderPrice;

class FetchOptions {
  private readonly _skip?: number;
  private readonly _query?: string;
  private readonly _status?: number;
  private readonly _order: Order;

  static LIMIT = 30;

  constructor(skip?: number, query?: string, status?: number, order?: string) {
    if (skip && !this.validateNum(skip))
      throw new Exception("skipは0以上の整数で入力してください", 400);
    if (status && !this.validateNum(status))
      throw new Exception("statusは0以上の整数で入力してください", 400);
    if (order && !this.validateOrder(order))
      throw new Exception(
        "orderはcreatedAt, -createdAt, score, -score, -updatedAtのいずれかで入力してください",
        400
      );

    this._skip = skip;
    this._query = query;
    this._status = status;
    this._order = order ? (order as Order) : "-updatedAt";
  }

  get skip() {
    return this._skip;
  }

  get query() {
    return this._query;
  }

  get status() {
    return this._status;
  }

  get order() {
    return this._order;
  }

  private validateNum(value: number) {
    if (value < 0 || !Number.isInteger(value)) return false;
    return true;
  }

  private validateOrder(value: string): value is Order {
    return [
      "createdAt",
      "-createdAt",
      "score",
      "-score",
      "-updatedAt",
      "price",
      "-price",
    ].includes(value);
  }
}

export default FetchOptions;
