import { AddBookRequest, FetchBookListRequest } from "@/core/domain/dto/request/books";
import AddBook from "@/core/domain/model/books/AddBook";
import IBooksRepository from "@/core/domain/repository/IBooksRepository";
import FetchOptions from "@/core/domain/value/books/FetchOptions";
import Id from "@/core/domain/value/Id";
import AStorage from "@/core/infrastructure/storage/AStorage";

class BooksUseCase {
    private readonly repository: IBooksRepository;
    private readonly storage: AStorage;
    
    constructor(repository: IBooksRepository, storage: AStorage) {
        this.repository = repository;
        this.storage = storage;
    }
    
    async add(request: AddBookRequest) {
        const addBook = AddBook.create(request.userId, request.title, Number(request.status), request.coverImage);

        // 表紙画像アップロード
        const coverImage = addBook.coverImage;
        if (coverImage) this.storage.uploadCoverImage(coverImage);

        // 書籍登録
        const result = await this.repository.add(addBook, this.storage.COVER_IMAGE_URL);
        return {
            id: result.id
        }
    }

    async fetchBookList(request: FetchBookListRequest) {
      const id = new Id(request.userId);
      const options = new FetchOptions(request.options.skip, request.options.q, request.options.status);

      const result = await this.repository.fetchBookList(id, options);
      return {
        books: result.map((book) => {
          return {
            id: book.id,
            title: book.title,
            status: book.statusLabel,
            coverImage: book.coverImage,
          }
        }),
      }
    }
}

export default BooksUseCase
