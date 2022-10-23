import Exception from "@/utils/Exception";

class BookComment {
    constructor(private readonly _value: string) {}

    static get EMPTY() {
        return new BookComment("");
    }

    static validate(value: string) {
        if (value.length > 1000) {
            throw new Exception("コメントは1000文字以内で入力してください", 400);
        }
        return new BookComment(value);
    }

    get value() {
        return this._value;
    }
}

export default BookComment;
