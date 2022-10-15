import AddBook from "@/core/books/domain/model/AddBook"
import Book from "@/core/books/domain/model/Book"
import FetchOptions from "@/core/books/domain/value/FetchOptions";
import Id from "@/core/shared/Id"

interface IBooksRepository {
    add(addBook: AddBook, coverImageURL: string): Promise<Book>
    fetchBookList(userId: Id, options: FetchOptions): Promise<Book[]>;
}

export default IBooksRepository
