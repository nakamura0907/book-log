import CoverImage from "@/core/books/domain/value/CoverImage";

interface IStorage {
    uploadCoverImage(coverImage: CoverImage): Promise<void>;
}

export default IStorage