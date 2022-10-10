import CoverImage from "@/core/domain/value/books/CoverImage";
import AStorage from "../AStorage";
import { Client } from "minio"

class MinioStorage extends AStorage {
    private readonly client;
    private readonly COVER_IMAGE_BUCKET = "cover-image";
    
    readonly COVER_IMAGE_URL: string = `http://localhost:9090/${this.COVER_IMAGE_BUCKET}`;

    constructor() {
        super();
        this.client = new Client({
            endPoint: "minio",
            port: 9090,
            useSSL: false,
            accessKey: "minio",
            secretKey: "minio123"
        });
    }

    async uploadCoverImage(coverImage: CoverImage) {
        this.client.fPutObject(this.COVER_IMAGE_BUCKET, coverImage.value.filename, coverImage.value.path);
    }
}

export default MinioStorage