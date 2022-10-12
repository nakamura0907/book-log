import AddBook from "@/core/domain/model/books/AddBook";
import Book from "@/core/domain/model/books/Book";
import IBooksRepository from "@/core/domain/repository/IBooksRepository";
import BookStatus from "@/core/domain/value/books/BookStatus";
import FetchOptions from "@/core/domain/value/books/FetchOptions";
import Id from "@/core/domain/value/Id";
import { prisma } from "@/lib/Database/prisma";

class PrismaBooksRepository implements IBooksRepository {
    async add(addBook: AddBook, coverImageURL: string) {
        const user_id = addBook.userId.value.toString();
        const cover_image = addBook.coverImage ? `${coverImageURL}/${addBook.coverImage.value.filename}` : undefined;

        const result = await prisma.books.create({
            data: {
                user_id,
                title: addBook.title.value,
                status: addBook.status.value,
                cover_image,
            }
        });
        return addBook.withBookId(result.id);
    }

    async fetchBookList(userId: Id, options: FetchOptions) {
      const user_id = userId.value.toString();

      const result = await prisma.books.findMany({
        where: {
          user_id,
          title: {
            contains: options.q,
          },
          status: options.status,
        },
        skip: options.skip,
        take: options.limit,
      });

      const collection = result.map((book) => {
        const statusLabel = new BookStatus(book.status).label;
        return new Book(
          book.id,
          user_id,
          book.title,
          statusLabel,
          book.cover_image ? book.cover_image : undefined)});
      return collection;
    }
}

export default PrismaBooksRepository;
