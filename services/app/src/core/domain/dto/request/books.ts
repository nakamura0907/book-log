import { FileType } from "@/core/infrastructure/storage/multer/File";

export class AddBookRequest {
    constructor(readonly userId: string | number, readonly title: string, readonly status: number, readonly coverImage?: FileType) {}
}