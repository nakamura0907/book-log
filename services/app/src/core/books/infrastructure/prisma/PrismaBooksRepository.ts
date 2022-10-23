import Book from "../../domain/model/Book";
import FetchOptions, { Order } from "../../domain/model/FetchOptions";
import Review from "../../domain/model/Review";
import IBooksRepository from "../../domain/repository/IBooksRepository";
import BookComment from "../../domain/value/BookComment";
import BookScore from "../../domain/value/BookScore";
import { GeneratedId } from "@/core/shared/Id";
import { prisma } from "@/utils/Database/prisma";
import { books, books_reviews, Prisma } from "@prisma/client";

type PrismaBook = books & {
    books_reviews: books_reviews | null;
};
type PrismaBooksOrder = Prisma.Enumerable<Prisma.booksOrderByWithRelationInput>;

class PrismaBooksRepository implements IBooksRepository {
    save(book: Book): Promise<Book> {
        if (book.isGenerated) {
            return this._update(book);
        }
        return this._create(book);
    }

    async fetchBookList(options: FetchOptions): Promise<Book[]> {
        const result = await prisma.books.findMany({
            where: {
                title: {
                    contains: options.query,
                },
                status: {
                    equals: options.status,
                }
            },
            include: {
                books_reviews: true,
            },
            orderBy: this._convertOrder(options.order),
            skip: options.skip,
            take: FetchOptions.LIMIT,
        });

        const books = result.map((book) => {
            return this._convertBook(book);
        });
        return books;
    }

    async fetchById(id: GeneratedId): Promise<Book | undefined> {
        const result = await prisma.books.findUnique({
            where: {
                id: id.value,
            },
            include: {
                books_reviews: true,
            }
        });

        if (!result) return;

        return this._convertBook(result);
    }
    
    async removeBook(id: GeneratedId): Promise<void> {
        await prisma.books_reviews.delete({
            where: {
                book_id: id.value,
            }
        })
        await prisma.books.delete({
            where: {
                id: id.value,
            },
        });
    }

    private async _create(book: Book): Promise<Book> {
        const newBook = await prisma.books.create({
            data: {
                title: book.title.value,
                status: book.status.value,
                cover_image: book.coverImage?.value,
                created_at: book.createdAt,
                updated_at: book.updatedAt,
                books_reviews: {
                    create: {
                        score: book.review.score.value,
                        comment: book.review.comment.value,
                    }
                }
            }
        });

        const id = new GeneratedId(newBook.id);
        return book.setId(id);
    }

    private async _update(book: Book): Promise<Book> {
        await prisma.books.update({
            where: {
                id: book.id.value,
            },
            data: {
                title: book.title.value,
                status: book.status.value,
                cover_image: book.coverImage?.value,
                updated_at: book.updatedAt,
                books_reviews: {
                    update: {
                        score: book.review.score.value,
                        comment: book.review.comment.value,
                    }
                }
            }
        });

        return book;
    }

    private _convertBook(prismaBook: PrismaBook): Book {
        const coverImage = prismaBook.cover_image ?? undefined;

        const review = prismaBook.books_reviews ? new Review(
            new BookScore(prismaBook.books_reviews.score),
            new BookComment(prismaBook.books_reviews.comment),
        ) : undefined;

        return Book.create(prismaBook.id, prismaBook.title, prismaBook.status, coverImage, prismaBook.created_at, prismaBook.updated_at, review);
    }

    // FetchOptions.orderの値をPrisma用に変換する
    private _convertOrder(order: Order): PrismaBooksOrder {
        const result: PrismaBooksOrder = {};

        if (order == "createdAt" || order == "-createdAt") {
            result.created_at = order == "createdAt" ? "asc" : "desc";
        } else if (order == "score" || order == "-score") {
            result.books_reviews = {
                score: order == "score" ? "asc" : "desc",
            };
        } else if (order == "-updatedAt") {
            result.updated_at = "desc";
        }

        return result;
    }
}

export default PrismaBooksRepository
