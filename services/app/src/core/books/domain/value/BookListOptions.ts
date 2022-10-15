class BookListOptions {
  private readonly _skip: number;
  private readonly _status?: number;
  private readonly _q?: string;

  constructor(skip: number | undefined, status: number | undefined, q: string | undefined) {
    this._skip = skip ?? 1;
    this._status ??= status;
    this._q ??= q;
  }

  get skip() {
    return this._skip;
  }

  get status() {
    return this._status;
  }

  get q() {
    return this._q;
  }
}

export default BookListOptions

