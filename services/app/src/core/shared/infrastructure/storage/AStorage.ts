import CoverImage from "@/core/books/domain/value/CoverImage";
import IStorage from "./IStorage";

abstract class AStorage implements IStorage {
    abstract readonly COVER_IMAGE_URL: string;
    abstract uploadCoverImage(coverImage: CoverImage): Promise<void>

    static get COVER_IMAGE_URL(): string {
        return this.COVER_IMAGE_URL;
    }
}

export default AStorage