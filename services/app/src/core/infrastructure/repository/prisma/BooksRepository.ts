import AddBook from "@/core/domain/model/books/AddBook";
import IBooksRepository from "@/core/domain/repository/IBooksRepository";
import { prisma } from "@/lib/Database/prisma";

class PrismaBooksRepository implements IBooksRepository {
    async add(addBook: AddBook, coverImageURL: string) {
        const coverImage = addBook.coverImage ? `${coverImageURL}/${addBook.coverImage.value.filename}` : undefined;

        const result = await prisma.books.create({
            data: {
                user_id: addBook.userId.value.toString(),
                title: addBook.title.value,
                status: addBook.status.value,
                cover_image: coverImage,
            }
        });
        return addBook.withBookId(result.id);
    }
}

export default PrismaBooksRepository;