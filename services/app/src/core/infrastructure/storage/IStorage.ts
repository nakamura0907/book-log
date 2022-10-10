import CoverImage from "@/core/domain/value/books/CoverImage";

interface IStorage {
    uploadCoverImage(coverImage: CoverImage): Promise<void>;
}

export default IStorage