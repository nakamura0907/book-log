import AddBook from "@/core/domain/model/books/AddBook"
import Book from "@/core/domain/model/books/Book"
import FetchOptions from "../value/books/FetchOptions";
import Id from "../value/Id"

interface IBooksRepository {
    add(addBook: AddBook, coverImageURL: string): Promise<Book>
    fetchBookList(userId: Id, options: FetchOptions): Promise<Book[]>;
}

export default IBooksRepository
