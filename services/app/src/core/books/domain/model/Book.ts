import Exception from "@/utils/Exception";
import BookTitle from "../value/BookTitle";
import Review from "./Review";
import BookStatus from "../value/BookStatus";
import BookScore from "../value/BookScore";
import BookComment from "../value/BookComment";
import { CoverImageFile, CoverImageURL } from "../value/CoverImage";
import { now } from "@/utils/Date";
import { EditBookRequest } from "../dto/Request";
import { GeneratedId, Id, NoneId } from "@/core/shared/Id";

class Book {
    private readonly _id: Id;
    private readonly _title: BookTitle;

    private readonly _status: BookStatus;
    private readonly _coverImage?: CoverImageURL;
    private readonly _createdAt: Date;
    private readonly _updatedAt: Date;

    private readonly _review: Review;

    constructor(id: Id, title: BookTitle, status: BookStatus, coverImage: CoverImageURL | undefined, createdAt: Date, updatedAt: Date, review: Review) {
        this._id = id;
        this._title = title;
        this._status = status;
        this._coverImage = coverImage;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
        this._review = review;
    }

    /**
     * 書籍の新規作成を行う
     */
    static init(title: string, status: number | undefined, coverImage: CoverImageFile | undefined) {
        const bookTitle = BookTitle.validate(title);
        const bookStatus = status ? BookStatus.validate(status) : BookStatus.UNSET;
        const coverImageURL = coverImage ? coverImage.fullUrl : undefined;
        const initDate = now();

        const review = Review.init();

        return new Book(
            NoneId.instance,
            bookTitle,
            bookStatus,
            coverImageURL,
            initDate,
            initDate,
            review,
        );
    }

    /**
     * リポジトリから取得した書籍情報をBookインスタンスに変換する
     */
    static create(id: number, title: string, status: number, coverImage: string | undefined, createdAt: Date, updatedAt: Date, review: Review | undefined) {
        const bookId = new GeneratedId(id);
        const bookTitle = new BookTitle(title);
        const bookStatus = new BookStatus(status);
        const bookCoverImage = coverImage ? new CoverImageURL(coverImage) : undefined;

        const bookReview = review ?? Review.init();

        return new Book(
            bookId,
            bookTitle,
            bookStatus,
            bookCoverImage,
            createdAt,
            updatedAt,
            bookReview,
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
            this._status,
            this._coverImage,
            this._createdAt,
            this._updatedAt,
            this._review,
        );
    }

    copyWith(values: EditBookRequest, coverImage: CoverImageFile | undefined) {
        const title = values.title ? BookTitle.validate(values.title) : this._title;
        const status = values.status ? BookStatus.validate(values.status) : this._status;
        const coverImageUrl = coverImage ? coverImage.fullUrl : this._coverImage;
        const updatedAt = now();

        const score = values.score ? BookScore.validate(values.score) : this._review.score;
        const comment = values.comment ? BookComment.validate(values.comment) : this._review.comment;
        const review = new Review(score, comment);

        return new Book(
            this._id,
            title,
            status,
            coverImageUrl,
            this._createdAt,
            updatedAt,
            review,
        );
    }
}

export default Book;