import Exception from "@/lib/Exception";
import BookTitle from "../value/BookTitle";
import Review from "./Review";
import BookStatus from "../value/BookStatus";
import BookScore from "../value/BookScore";
import BookComment from "../value/BookComment";
import { CoverImageFile, CoverImageURL } from "../value/CoverImage";
import { now } from "@/lib/Date";
import { EditBookRequest } from "../dto/Request";
import { GeneratedId, Id, NoneId } from "@/core/shared/Id";
import BookPrice from "../value/BookPrice";

class Book {
  private readonly _id: Id;
  private readonly _title: BookTitle;
  private readonly _price: BookPrice;
  private readonly _status: BookStatus;
  private readonly _coverImage?: CoverImageURL;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  private readonly _review: Review;

  constructor(
    id: Id,
    title: BookTitle,
    price: BookPrice,
    status: BookStatus,
    coverImage: CoverImageURL | undefined,
    createdAt: Date,
    updatedAt: Date,
    review: Review
  ) {
    this._id = id;
    this._title = title;
    this._price = price;
    this._status = status;
    this._coverImage = coverImage;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._review = review;
  }

  /**
   * 書籍の新規作成を行う
   */
  static init(
    title: string,
    price: number,
    status: number | undefined,
    coverImage: CoverImageFile | undefined
  ) {
    const bookTitle = BookTitle.validate(title);
    const bookPrice = BookPrice.validate(price);
    const bookStatus = status ? BookStatus.validate(status) : BookStatus.UNSET;
    const coverImageURL = coverImage ? coverImage.fullUrl : undefined;
    const initDate = now();

    const review = Review.init();

    return new Book(
      NoneId.instance,
      bookTitle,
      bookPrice,
      bookStatus,
      coverImageURL,
      initDate,
      initDate,
      review
    );
  }

  /**
   * リポジトリから取得した書籍情報をBookインスタンスに変換する
   */
  static create(
    id: number,
    title: string,
    price: number,
    status: number,
    coverImage: string | undefined,
    createdAt: Date,
    updatedAt: Date,
    review: Review | undefined
  ) {
    const bookId = new GeneratedId(id);
    const bookTitle = new BookTitle(title);
    const bookPrice = new BookPrice(price);
    const bookStatus = new BookStatus(status);
    const bookCoverImage = coverImage
      ? new CoverImageURL(coverImage)
      : undefined;

    const bookReview = review ?? Review.init();

    return new Book(
      bookId,
      bookTitle,
      bookPrice,
      bookStatus,
      bookCoverImage,
      createdAt,
      updatedAt,
      bookReview
    );
  }

  get id() {
    if (!this._id.isGenerated) {
      throw new Exception("書籍IDが生成されていません", 400);
    }
    return this._id;
  }

  get title() {
    return this._title;
  }

  get price() {
    return this._price;
  }

  get status() {
    return this._status;
  }

  get coverImage() {
    return this._coverImage;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get review() {
    return this._review;
  }

  get isGenerated() {
    return this._id.isGenerated;
  }

  setId(id: GeneratedId) {
    return new Book(
      id,
      this._title,
      this._price,
      this._status,
      this._coverImage,
      this._createdAt,
      this._updatedAt,
      this._review
    );
  }

  copyWith(values: EditBookRequest, coverImage: CoverImageFile | undefined) {
    const title = values.title ? BookTitle.validate(values.title) : this._title;
    const price =
      values.price !== undefined
        ? BookPrice.validate(values.price)
        : this._price;
    const status =
      values.status !== undefined
        ? BookStatus.validate(values.status)
        : this._status;
    const coverImageUrl = coverImage ? coverImage.fullUrl : this._coverImage;
    const updatedAt = now();

    const score =
      values.score !== undefined
        ? BookScore.validate(values.score)
        : this._review.score;
    const comment =
      values.comment !== undefined
        ? BookComment.validate(values.comment)
        : this._review.comment;
    const review = new Review(score, comment);

    return new Book(
      this._id,
      title,
      price,
      status,
      coverImageUrl,
      this._createdAt,
      updatedAt,
      review
    );
  }
}

export default Book;
