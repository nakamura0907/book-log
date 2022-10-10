class BooksEntity {
    constructor(readonly id: number | undefined, readonly userId: string, readonly title: string, readonly status: number, readonly coverImage?: string) {}
}

export default BooksEntity;