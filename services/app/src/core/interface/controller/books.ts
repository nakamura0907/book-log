import { NextFunction, Request, Response } from "express"

const bookController = () => {
    const add = (req: Request, res: Response, next: NextFunction) => {
        (async () => {
            // リクエスト内容の取得
            const { title, status } = req.body
            const file = req.file;
            const userId = 1;

            console.log(title, status, file, userId);

            // ユースケース.add（AddBookRequest）
            //  インスタンス化（+バリデーション）
            //  本棚アップロードサービス（CoverImage）
            //  リポジトリ.add(AddBook.エンティティ化)
            //  AddBook.setBookId(Entity)
            //  レスポンス作成

            const bookId = 1;
            // レスポンス
            res.status(201).location(`/books/${bookId}`).send({
                id: bookId,
            });
        })().catch(next);
    }

    return { add }
}

export default bookController