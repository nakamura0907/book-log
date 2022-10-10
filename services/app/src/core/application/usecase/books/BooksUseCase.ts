import { AddBookRequest } from "@/core/domain/dto/request/books";
import AddBook from "@/core/domain/model/books/AddBook";
import IBooksRepository from "@/core/domain/repository/IBooksRepository";
import IStorage from "@/core/infrastructure/storage/IStorage";

class BooksUseCase {
    private readonly repository: IBooksRepository;
    private readonly storage: IStorage;
    
    constructor(repository: IBooksRepository, storage: IStorage) {
        this.repository = repository;
        this.storage = storage;
    }
    
    async add(request: AddBookRequest) {
        const addBook = AddBook.create(request.userId, request.title, request.status, request.coverImage);

        // 表紙画像アップロード
        const coverImage = addBook.coverImage;
        if (coverImage) this.storage.uploadCoverImage(coverImage);

        // 書籍登録
        const result = await this.repository.add(addBook);
        return {
            id: result.id
        }
    }
}

export default BooksUseCase