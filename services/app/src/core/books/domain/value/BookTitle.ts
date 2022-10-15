import Exception from "@/lib/Exception";

class BookTitle {
    static readonly MIN_LENGTH = 0;
    static readonly MAX_LENGTH = 255;

    static validate(value: string) {
        if (!value) throw new Exception("タイトルを入力してください", 400);
        if (value.length < this.MIN_LENGTH) throw new Exception(`タイトルを入力してください`, 400);
        if (value.length > this.MAX_LENGTH) throw new Exception(`タイトルは255文字以内で入力してください`, 400);
        return new BookTitle(value);
    }

    constructor(private readonly _value: string) {}

    get value() {
        return this._value;
    }
}

export default BookTitle