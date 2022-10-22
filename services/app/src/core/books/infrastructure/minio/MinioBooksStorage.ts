import MinioConnection from "@/core/shared/infrastructure/storage/minio/Connection";
import IBooksStorage from "../../domain/repository/IBooksStorage";
import { CoverImageFile, CoverImageURL } from "../../domain/value/CoverImage";

class MinioBooksStorage implements IBooksStorage {
    private readonly connection = new MinioConnection();
    private readonly COVER_IMAGE_BUCKET = "cover-image";
  
    readonly COVER_IMAGE_URL: string = `${MinioConnection.BASE_URL}/${this.COVER_IMAGE_BUCKET}`;
    
    async uploadCoverImage(coverImage: CoverImageFile) {
        this.connection.fPutObject(
            this.COVER_IMAGE_BUCKET,
            coverImage.filename,
            coverImage.path,
        );
    }
    
    async removeCoverImage(coverImageUrl: CoverImageURL) {
        const filename = coverImageUrl.value.split("/").pop();
        if (!filename) return;
        
        this.connection.removeObject(
            this.COVER_IMAGE_BUCKET,
            filename,
        );
    }
}

export default MinioBooksStorage;