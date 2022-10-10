import AddBook from "@/core/domain/model/books/AddBook";
import IBooksRepository from "@/core/domain/repository/IBooksRepository";

class FakeBooksRepository implements IBooksRepository {
    async add(addBook: AddBook, coverImageURL: string) {
        const id = 1 + Math.floor(Math.random() * 100000);
        const coverImage = addBook.coverImage ? `${coverImageURL}/${addBook.coverImage.value.filename}` : undefined;
        const book = {
            id,
            userId: addBook.userId.value,
            title: addBook.title.value,
            status: addBook.status.value,
            coverImage
        }
        console.log(book);
        return addBook.withBookId(1 + Math.floor( Math.random() * 1000000));
    }
}

export default FakeBooksRepository