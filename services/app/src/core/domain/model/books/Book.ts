class Book {
    readonly id: number;
    readonly userId: string;
    readonly title: string;
    readonly statusLabel: string;
    readonly coverImage?: string;

    constructor(id: number, userId: string, title: string, statusLabel: string, coverImage?: string) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.statusLabel = statusLabel;
        this.coverImage = coverImage;
    }
}

export default Book;