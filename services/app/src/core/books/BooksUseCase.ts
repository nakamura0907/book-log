import Exception from "@/utils/Exception";
import Book from "./domain/model/Book";
import IBooksRepository from "./domain/repository/IBooksRepository";
import IBooksStorage from "./domain/repository/IBooksStorage";
import FetchOptions from "./domain/model/FetchOptions";
import { GeneratedId } from "../shared/Id";
import {
  AddBookRequest,
  EditBookRequest,
  FetchOptionsRequest,
} from "./domain/dto/Request";
import { bookResponse } from "./domain/dto/Response";
import { CoverImageFile, CoverImageURL } from "./domain/value/CoverImage";

class BooksUseCase {
  private readonly repository: IBooksRepository;
  private readonly storage: IBooksStorage;

  constructor(repository: IBooksRepository, storage: IBooksStorage) {
    this.repository = repository;
    this.storage = storage;
  }

  /**
   * ユースケース: 書籍の新規作成
   */
  async addBook(req: AddBookRequest) {
    // バリデーション
    const coverImageFile = req.file
      ? CoverImageFile.validate(req.file, this.storage.COVER_IMAGE_URL)
      : undefined;
    const registerBook = Book.init(req.title, req.status, coverImageFile);

    // ファイルアップロード
    if (coverImageFile) {
      this.uploadCoverImage(coverImageFile);
    }

    // データベース登録
    const book = await this.repository.save(registerBook);

    return bookResponse(book);
  }

  /**
   * ユースケース: 書籍の一覧取得
   */
  async fetchBookList(options: FetchOptionsRequest) {
    // バリデーション
    const fetchOptions = new FetchOptions(
      options.skip,
      options.query,
      options.status,
      options.order
    );

    // データベース取得
    const books = await this.repository.fetchBookList(fetchOptions);

    return {
      books: books.map((book) => bookResponse(book)),
      isEnd: books.length < FetchOptions.LIMIT,
    };
  }

  /**
   * ユースケース: 書籍の詳細取得
   */
  async fetchById(id: number) {
    // バリデーション
    const bookId = GeneratedId.validate(id);

    // データベース取得
    const book = await this.repository.fetchById(bookId);
    if (!book) throw new Exception("書籍が見つかりませんでした", 404);

    return bookResponse(book);
  }

  /**
   * ユースケース: 書籍の編集
   */
  async editBook(id: number, req: EditBookRequest) {
    // バリデーション
    const bookId = GeneratedId.validate(id);
    const coverImageFile = req.file
      ? CoverImageFile.validate(req.file, this.storage.COVER_IMAGE_URL)
      : undefined;

    // データベース取得
    const book = await this.repository.fetchById(bookId);
    if (!book) throw new Exception("書籍が見つかりませんでした", 404);

    // ファイルアップロード
    if (coverImageFile) {
      this.uploadCoverImage(coverImageFile);
      this.removeCoverImage(book.coverImage);
    }

    // データベース更新
    const updatedBook = book.copyWith(req, coverImageFile);
    await this.repository.save(updatedBook);

    return bookResponse(updatedBook);
  }

  /**
   * ユースケース: 書籍の削除
   */
  async removeBook(id: number) {
    // バリデーション
    const bookId = GeneratedId.validate(id);

    // データベース取得
    const book = await this.repository.fetchById(bookId);
    if (!book) throw new Exception("書籍が見つかりませんでした", 404);

    // ファイル削除
    this.removeCoverImage(book.coverImage);

    // データベース削除
    await this.repository.removeBook(bookId);
  }

  /**
   * ファイルアップロード
   */
  private uploadCoverImage(coverImageFile: CoverImageFile) {
    this.storage.uploadCoverImage(coverImageFile);
  }

  /**
   * ファイル削除
   */
  private removeCoverImage(coverImageUrl?: CoverImageURL) {
    if (!coverImageUrl) return;

    this.storage.removeCoverImage(coverImageUrl);
  }
}

export default BooksUseCase;
