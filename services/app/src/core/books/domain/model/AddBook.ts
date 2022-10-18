import Id from "@/core/shared/Id";
import BookTitle from "@/core/books/domain/value/BookTitle";
import BookStatus from "@/core/books/domain/value/BookStatus";
import CoverImage from "@/core/books/domain/value/CoverImage";
import Book from "./Book";
import { FileType } from "@/lib/File/File";

class AddBook {
  private readonly _userId: Id;
  private readonly _title: BookTitle;
  private readonly _status: BookStatus;
  private readonly _coverImage?: CoverImage;

  constructor(
    userId: Id,
    title: BookTitle,
    status: BookStatus,
    coverImage?: CoverImage
  ) {
    this._userId = userId;
    this._title = title;
    this._status = status;
    this._coverImage = coverImage;
    Object.freeze(this);
  }

  static create(
    userId: number,
    title: string,
    status: number,
    coverImage?: FileType
  ) {
    return new AddBook(
      Id.validate(userId),
      BookTitle.validate(title),
      BookStatus.validate(status),
      coverImage ? CoverImage.validate(coverImage) : undefined
    );
  }

  get userId() {
    return this._userId;
  }

  get title() {
    return this._title;
  }

  get status() {
    return this._status;
  }

  get coverImage() {
    return this._coverImage;
  }

  withBookId(id: number) {
    const userId = this._userId.value;
    const statusLabel = this._status.label;
    const coverImage = this._coverImage
      ? this._coverImage.value.originalname
      : undefined;
    return new Book(id, userId, this._title.value, statusLabel, coverImage);
  }
}

export default AddBook;
