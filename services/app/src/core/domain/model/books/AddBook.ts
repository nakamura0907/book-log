import Id from "@/core/domain/value/Id";
import BookTitle from "@/core/domain/value/books/BookTitle";
import BookStatus from "@/core/domain/value/books/BookStatus";
import CoverImage from "@/core/domain/value/books/CoverImage";
import { FileType } from "@/core/infrastructure/storage/multer/File";
import BooksEntity from "../../dto/entity/Books";
import Book from "./Book";

class AddBook {
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
        return new AddBook(
            Id.validate(userId),
            BookTitle.validate(title),
            BookStatus.validate(status),
            coverImage ? CoverImage.validate(coverImage) : undefined
        );
    }

    get coverImage() {
        return this._coverImage;
    }

    withBookId(id: number) {
        const userId = this._userId.value.toString();
        const statusLabel = this._status.label;
        const coverImage = this._coverImage ? this._coverImage.value.originalname : undefined;
        return new Book(id, userId, this._title.value, statusLabel, coverImage);
    }

    createEntity() {
        const userId = this._userId.value.toString();
        const coverImage = this._coverImage ? this._coverImage.value.originalname : undefined;
        return new BooksEntity(undefined, userId, this._title.value, this._status.value, coverImage);
    }
}

export default AddBook