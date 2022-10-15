import { AddBookRequest, FetchBookListRequest } from "@/core/books/domain/dto/Request";
import AddBook from "@/core/books/domain/model/AddBook";
import IBooksRepository from "@/core/books/domain/repository/IBooksRepository";
import FetchOptions from "@/core/books/domain/value/FetchOptions";
import Id from "@/core/shared/Id";
import IBooksStorage from "@/core/books/domain/repository/IBooksStorage";

class BooksUseCase {
    private readonly repository: IBooksRepository;
    private readonly storage: IBooksStorage;
    
    constructor(repository: IBooksRepository, storage: IBooksStorage) {
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
