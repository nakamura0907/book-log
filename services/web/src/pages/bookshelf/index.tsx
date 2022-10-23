import type { NextPage } from 'next'
import { BookshelfList } from '@features/bookshelf'
import Layout from '@components/templates/Layout'

const Bookshelf: NextPage = () => {
    return(
        <Layout>
            <BookshelfList />
        </Layout>
    )
}

export default Bookshelf