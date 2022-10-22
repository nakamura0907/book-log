import Exception from "@/lib/Exception";

class BookScore {
    private readonly _value: number;

    constructor(value: number) {
        this._value = value;
    }

    static get UNSET() {
        return new BookScore(0);
    }

    static validate(value: number) {
        if (value < 0 || value > 5 || !Number.isInteger(value)) {
            throw new Exception("評価は0~5の整数で入力してください", 400);
        }
        return new BookScore(value);
    }

    get value() {
        return this._value;
    }
}

export default BookScore;
