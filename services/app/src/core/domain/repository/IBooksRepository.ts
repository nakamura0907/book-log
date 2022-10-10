import AddBook from "@/core/domain/model/books/AddBook"
import Book from "@/core/domain/model/books/Book"

interface IBooksRepository {
    add(addBook: AddBook, coverImageURL: string): Promise<Book>
}

export default IBooksRepository