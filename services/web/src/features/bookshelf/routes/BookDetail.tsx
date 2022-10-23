import Divider from '@components/ui/divider';
import React from 'react'

type State = {
};

type Props = {
    bookId: string;
}

const initialState: State = {};

export const BookDetail: React.FC<Props> = ( {bookId} ) => {

    React.useEffect(() => {
    }, []);

    return(
        <div>
            <div>ここに背景画像（ぼかし表紙画像）＋表紙画像を表示する</div>
            <div>
                <div>情報を修正する ボタン</div>
                <div>本を削除する ボタン</div>
            </div>
            <Divider />
            <div>
                <div className='not:last:mb-5'>
                    <span className='inline-block mb-1 text-lg font-bold'>タイトル</span>
                    <div>本のタイトルを表示</div>
                </div>
                <div className='not:last:mb-5'>
                    <span className='inline-block mb-1 text-lg font-bold'>読書状況</span>
                    <div>読書状況を表示</div>
                </div>
            </div>
            {/* 編集モードの場合、↑と入れ替えで編集フォームを表示する。追加時と同じ内容・見た目 */}
            <Divider />
            <div>
                <div className='not:last:mb-5'>
                    <span className='inline-block mb-1 text-lg font-bold'>評価・感想</span>
                    <div>レート</div>
                    <div>コメントエリア</div>
                </div>
                <div>レビューを保存する ボタン</div>
            </div>
        </div>
    )
}