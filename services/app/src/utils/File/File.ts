export type FileType = Express.Multer.File;
abstract class File {
    constructor(protected readonly _value: FileType) {}
    get value() {
        return this._value;
    }
}

export default File;