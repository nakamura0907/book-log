import AddBook from "@/core/domain/model/books/AddBook";
import IBooksRepository from "@/core/domain/repository/IBooksRepository";

class FakeBooksRepository implements IBooksRepository {
    async add(addBook: AddBook) {
        return addBook.withBookId(1 + Math.floor( Math.random() * 1000000));
    }
}

export default FakeBooksRepository