import type { NextPage } from 'next'
import { BookshelfList } from '@features/bookshelf'

const Bookshelf: NextPage = () => {
    return(
        <div>
            <BookshelfList />
        </div>
    )
}

export default Bookshelf