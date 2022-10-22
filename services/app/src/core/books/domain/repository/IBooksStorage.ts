import { CoverImageFile, CoverImageURL } from "../value/CoverImage";

interface IBooksStorage {
    readonly COVER_IMAGE_URL: string;
    uploadCoverImage(coverImage: CoverImageFile): Promise<void>;
    removeCoverImage(coverImageUrl: CoverImageURL): Promise<void>;
  }
  
  export default IBooksStorage;