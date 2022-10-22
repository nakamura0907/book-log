import { FileType } from "@/lib/File/File";

export class AddBookRequest {
    constructor(
        readonly title: string,
        readonly status: number | undefined,
        readonly file: FileType | undefined,
    ) {
        Object.freeze(this);
    }
}

export class FetchOptionsRequest {
    constructor(
        readonly skip?: number,
        readonly query?: string,
        readonly status?: number,
        readonly order?: string,
    ) {
        Object.freeze(this);
    }
}

export class EditBookRequest {
    constructor(
        readonly title: string | undefined,
        readonly status: number | undefined,
        readonly file: FileType | undefined,
        readonly score: number | undefined,
        readonly comment: string | undefined,
    ) {
        Object.freeze(this);
    }
}