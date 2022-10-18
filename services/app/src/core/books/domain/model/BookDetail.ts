import Book from "./Book";
import Review from "./Review";

class BookDetail {
  private readonly _book: Book;
  private readonly _review?: Review;

  constructor(book: Book, review?: Review) {
    this._book = book;
    this._review = review;

    Object.freeze(this);
  }

  get book() {
    return this._book;
  }

  get review() {
    return this._review;
  }
}

export default BookDetail;
