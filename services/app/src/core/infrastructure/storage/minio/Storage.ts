import CoverImage from "@/core/domain/value/books/CoverImage";
import IStorage from "../IStorage";
import { Client } from "minio"

class MinioStorage implements IStorage {
    private readonly client;
    private readonly COVER_IMAGE_BUCKET = "cover-image";

    constructor() {
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