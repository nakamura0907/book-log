import File, { FileType } from "@/lib/File/File";
import Exception from "@/lib/Exception";

class CoverImage extends File {
    static readonly ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif"];
    static readonly MAX_FILE_SIZE = 1024 * 1024 * 2; // 2MB

    static validate(value: FileType) {
        const extension = value.originalname.split(".").pop();
        if (!extension) throw new Exception("ファイル拡張子がありません", 400);
        if (!this.ALLOWED_EXTENSIONS.includes(extension)) throw new Exception("許可されていないファイル拡張子です", 400);

        if (value.size > this.MAX_FILE_SIZE) throw new Exception("ファイルサイズが大きすぎます", 400);

        return new CoverImage(value);
    }
}

export default CoverImage;