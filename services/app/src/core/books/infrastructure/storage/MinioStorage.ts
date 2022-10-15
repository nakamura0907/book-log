import MinioConnection from "@/core/shared/infrastructure/storage/minio/Connection"
import CoverImage from "@/core/books/domain/value/CoverImage";
import IBooksStorage from "@/core/books/domain/repository/IBooksStorage";

class MinioStorage implements IBooksStorage {
    private readonly connection = new MinioConnection();
    private readonly COVER_IMAGE_BUCKET = "cover-image";

    readonly COVER_IMAGE_URL: string = `${MinioConnection.BASE_URL}/${this.COVER_IMAGE_BUCKET}`;

    async uploadCoverImage(coverImage: CoverImage) {
        this.connection.fPutObject(this.COVER_IMAGE_BUCKET, coverImage.value.filename, coverImage.value.path);
    }
}

export default MinioStorage