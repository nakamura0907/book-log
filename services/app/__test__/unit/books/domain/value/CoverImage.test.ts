import CoverImage from "@/core/books/domain/value/CoverImage";
import { Readable } from "stream";

describe("CoverImage", () => {
    test("バリデーション", () => {
        const file: globalThis.Express.Multer.File = {
            fieldname: "coverImage",
            originalname: "test.jpg",
            encoding: "7bit",
            mimetype: "image/jpeg",
            buffer: Buffer.from(""),
            size: 0,
            stream: new Readable(),
            destination: "",
            filename: "",
            path: "",
        };
        let value = file;

        expect(() => CoverImage.validate(value)).not.toThrow(Error);

        value = { ...file, originalname: "test.txt" };
        expect(() => CoverImage.validate(value)).toThrow(Error);

        value = { ...file, size: 1024 * 1024 * 2 + 1 };
        expect(() => CoverImage.validate(value)).toThrow(Error);
    })
})