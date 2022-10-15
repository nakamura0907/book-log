class FetchOptions {
    private readonly _limit = 30;
    constructor(private readonly _skip?: number, private readonly _q?: string, private readonly _status?: number) {}

    get skip() {
        return this._skip;
    }

    get q() {
        return this._q;
    }

    get status() {
        return this._status;
    }

    get limit() {
        return this._limit;
    }
}

export default FetchOptions