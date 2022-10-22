import Exception from "@/lib/Exception";
import { FileType } from "@/lib/File/File";

export class CoverImageFile {
    private readonly _file: FileType;
    private readonly _url: string;

    static readonly ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif"];
    static readonly MAX_FILE_SIZE = 1024 * 1024 * 2; // 2MB

    constructor(file: FileType, url: string) {
        this._file = file;
        this._url = url;
    }

    static validate(file: FileType, url: string) {
        const extension = file.originalname.split(".").pop();
        if (!extension) throw new Exception("ファイル拡張子がありません", 400);
        if (!this.ALLOWED_EXTENSIONS.includes(extension))
            throw new Exception("許可されていないファイル拡張子です", 400);
    
        if (file.size > this.MAX_FILE_SIZE)
            throw new Exception("ファイルサイズが大きすぎます", 400);
    
        return new CoverImageFile(file, url);
    }

    get filename() {
        return this._file.filename
    }

    get path() {
        return this._file.path;
    }

    get fullUrl() {
        const url = this._url + '/' + this.filename;
        return new CoverImageURL(url);
    }
}

export class CoverImageURL {
    private readonly _value: string;

    constructor(value: string) {
        this._value = value;
    }

    get value() {
        return this._value;
    }
}

export type CoverImage = CoverImageFile | CoverImageURL;
