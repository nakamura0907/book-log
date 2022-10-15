import CoverImage from "../value/CoverImage";

interface IBooksStorage {
    readonly COVER_IMAGE_URL: string;
    uploadCoverImage(coverImage: CoverImage): Promise<void>;
}

export default IBooksStorage