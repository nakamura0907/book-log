import Book from "../model/Book";

export const bookResponse = (book: Book) => {
    return {
        id: book.id.value,
        title: book.title.value,
        status: book.status.label,
        coverImage: book.coverImage?.value,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
        review: {
            score: book.review.score?.value,
            comment: book.review.comment?.value,
        },
    }
}