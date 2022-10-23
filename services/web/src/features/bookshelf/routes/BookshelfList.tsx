import type { NextPage } from 'next'

export const BookshelfList: NextPage = () => {
    return (
        <div>
            {/* <div>ここにタブを表示してダッシュボードと切り替えれるようにする?</div> */}
            <div>ここにオプションを表示する</div>
            <div>ここに本棚の一覧を表示する</div>
            <ul>
                <li>
                    <a>
                        <div>表紙画像: 左</div>
                        <div>
                            <div>タイトル</div>
                            <div>読書状態</div>
                            <div>スコア（あれば）</div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    )
}