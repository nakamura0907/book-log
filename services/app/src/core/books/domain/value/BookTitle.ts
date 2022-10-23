import Exception from "@/utils/Exception";

class BookTitle {
    private readonly _value: string;

    constructor(value: string) {
        this._value = value;

        Object.freeze(this);
    }

    static validate(value: string) {
        if (!value || value === "") {
            throw new Exception("書籍タイトルを入力してください", 400);
        }
        if (value.length > 255) {
            throw new Exception("書籍タイトルは255文字以内で入力してください", 400);
        }
        return new BookTitle(value);
    }

    get value() {
        return this._value;
    }
}

export default BookTitle;
