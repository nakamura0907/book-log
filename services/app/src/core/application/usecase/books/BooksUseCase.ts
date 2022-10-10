import { AddBookRequest } from "@/core/domain/dto/request/books";
import AddBook from "@/core/domain/model/books/AddBook";
import IBooksRepository from "@/core/domain/repository/IBooksRepository";

class BooksUseCase {
    private readonly repository: IBooksRepository;
    
    constructor(repository: IBooksRepository) {
        this.repository = repository;
    }
    
    async add(request: AddBookRequest) {
        // インスタンス化
        const addBook = AddBook.create(request.userId, request.title, request.status, request.coverImage);

        const result = await this.repository.add(addBook);
        return {
            id: result.id
        }
    }
}

export default BooksUseCase