import Id from "@/core/domain/value/Id";
import BookTitle from "@/core/domain/value/books/BookTitle";
import BookStatus from "@/core/domain/value/books/BookStatus";
import CoverImage from "@/core/domain/value/books/CoverImage";
import { FileType } from "@/core/infrastructure/file/File";

class AddBooks {
    private readonly _userId: Id;
    private readonly _title: BookTitle;
    private readonly _status: BookStatus;
    private readonly _coverImage?: CoverImage;

    constructor(userId: Id, title: BookTitle, status: BookStatus, coverImage?: CoverImage) {
        this._userId = userId;
        this._title = title;
        this._status = status;
        this._coverImage = coverImage;
    }

    static create(userId: string | number, title: string, status: number, coverImage?: FileType) {
        return new AddBooks(
            Id.validate(userId),
            BookTitle.validate(title),
            BookStatus.validate(status),
            coverImage ? CoverImage.validate(coverImage) : undefined
        );
    }
}

export default AddBooks