import {
  AddBookRequest,
  FetchBookListRequest,
} from "@/core/books/domain/dto/Request";
import AddBook from "@/core/books/domain/model/AddBook";
import IBooksRepository from "@/core/books/domain/repository/IBooksRepository";
import FetchOptions from "@/core/books/domain/value/FetchOptions";
import Id from "@/core/shared/Id";
import IBooksStorage from "@/core/books/domain/repository/IBooksStorage";
import BookScore from "../domain/value/BookScore";
import Book from "../domain/model/Book";

class BooksUseCase {
  private readonly repository: IBooksRepository;
  private readonly storage: IBooksStorage;

  constructor(repository: IBooksRepository, storage: IBooksStorage) {
    this.repository = repository;
    this.storage = storage;
  }

  async add(request: AddBookRequest) {
    const addBook = AddBook.create(
      request.userId,
      request.title,
      Number(request.status),
      request.coverImage
    );

    // 表紙画像アップロード
    const coverImage = addBook.coverImage;
    if (coverImage) this.storage.uploadCoverImage(coverImage);

    // 書籍登録
    const result = await this.repository.add(
      addBook,
      this.storage.COVER_IMAGE_URL
    );
    return {
      id: result.id,
    };
  }

  async fetchBookList(request: FetchBookListRequest) {
    const id = Id.validate(request.userId);
    const options = new FetchOptions(
      request.options.skip,
      request.options.q,
      request.options.status
    );

    // 書籍一覧取得
    const result = await this.repository.fetchBookList(id, options);
    return {
      books: result.map((book) => {
        return {
          id: book.id,
          title: book.title,
          status: book.statusLabel,
          coverImage: book.coverImage,
        };
      }),
    };
  }

  async fetchBookDetail(userId: number, bookId: number) {
    const userIdValue = Id.validate(userId);
    const bookIdValue = Id.validate(bookId);

    // 書籍詳細取得
    const result = await this.repository.fetchBookDetail(
      userIdValue,
      bookIdValue
    );
    return {
      id: result.book.id,
      title: result.book.title,
      status: result.book.statusLabel,
      coverImage: result.book.coverImage,
      review: {
        score: result.review?.score.value,
        comment: result.review?.comment,
      },
    };
  }

  async writeReview(userId: number, bookId: number, score: number, comment?: string) {
    const userIdValue = Id.validate(userId);
    const bookIdValue = Id.validate(bookId);
    const scoreValue = BookScore.validate(score);

    const review = Book.writeReview(bookIdValue, {
      score: scoreValue,
      comment,
    })

    // レビュー投稿
    await this.repository.writeReview(userIdValue, review);
    return {
      id: review.id.value,
      score: review.score.value,
      comment: review.comment,
    };
  }
}

export default BooksUseCase;
