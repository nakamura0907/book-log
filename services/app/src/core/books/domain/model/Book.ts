import Id from "@/core/shared/Id";
import Review from "./Review";

class Book {
  readonly id: number;
  readonly userId: number;
  readonly title: string;
  readonly statusLabel: string;
  readonly coverImage?: string;

  constructor(
    id: number,
    userId: number,
    title: string,
    statusLabel: string,
    coverImage?: string
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.statusLabel = statusLabel;
    this.coverImage = coverImage;
    Object.freeze(this);
  }

  static writeReview(bookId: Id, value: Omit<Review, "id">) {
    return new Review(bookId, value.score, value.comment);
  }
}

export default Book;
