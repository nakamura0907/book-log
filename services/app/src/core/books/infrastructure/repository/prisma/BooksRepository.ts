import AddBook from "@/core/books/domain/model/AddBook";
import Book from "@/core/books/domain/model/Book";
import BookDetail from "@/core/books/domain/model/BookDetail";
import Review from "@/core/books/domain/model/Review";
import IBooksRepository from "@/core/books/domain/repository/IBooksRepository";
import BookScore from "@/core/books/domain/value/BookScore";
import BookStatus from "@/core/books/domain/value/BookStatus";
import FetchOptions from "@/core/books/domain/value/FetchOptions";
import Id from "@/core/shared/Id";
import { prisma } from "@/lib/Database/prisma";
import Exception from "@/lib/Exception";

class PrismaBooksRepository implements IBooksRepository {
  async add(addBook: AddBook, coverImageURL: string) {
    const cover_image = addBook.coverImage
      ? `${coverImageURL}/${addBook.coverImage.value.filename}`
      : undefined;

    const result = await prisma.books.create({
      data: {
        user_id: addBook.userId.value,
        title: addBook.title.value,
        status: addBook.status.value,
        cover_image,
      },
    });
    return addBook.withBookId(result.id);
  }

  async fetchBookList(userId: Id, options: FetchOptions) {
    const user_id = userId.value;

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
        book.cover_image ? book.cover_image : undefined
      );
    });
    return collection;
  }

  async fetchBookDetail(userId: Id, bookId: Id) {
    const result = await prisma.books.findFirst({
      where: {
        id: bookId.value,
        user_id: userId.value,
      },
      include: {
        books_reviews: true,
      },
    });
    if (!result) throw new Exception("書籍が存在しません", 404);

    const book = new Book(
      result.id,
      result.user_id,
      result.title,
      new BookStatus(result.status).label,
      result.cover_image ?? undefined
    );
    const review = result.books_reviews
      ? new Review(
          new Id(result.id),
          new BookScore(result.books_reviews.score),
          result.books_reviews.comment
        )
      : undefined;
    return new BookDetail(book, review);
  }
}

export default PrismaBooksRepository;
