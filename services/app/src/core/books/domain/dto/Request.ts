import { FileType } from "@/lib/File/File";

export class AddBookRequest {
  constructor(
    readonly userId: string | number,
    readonly title: string,
    readonly status: number,
    readonly coverImage?: FileType
  ) {}
}

export type FetchBookListOptions = {
  status?: number;
  skip?: number;
  q?: string;
};
export class FetchBookListRequest {
  constructor(
    private readonly _userId: string | number,
    private readonly _options: FetchBookListOptions
  ) {}

  get userId() {
    return this._userId;
  }

  get options() {
    return this._options;
  }
}
