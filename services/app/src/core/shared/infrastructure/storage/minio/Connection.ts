import { Client } from "minio";

class MinioConnection {
    private readonly client;

    static readonly BASE_URL: string = "http://localhost:9090";

    constructor() {
        this.client = new Client({
            endPoint: "minio",
            port: 9090,
            useSSL: false,
            accessKey: "minio",
            secretKey: "minio123"
        });
    }

    fPutObject(bucketName: string, objectName: string, filePath: string) {
        this.client.fPutObject(bucketName, objectName, filePath);
    }
}

export default MinioConnection