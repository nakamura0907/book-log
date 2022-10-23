import type { NextPage } from 'next'
import React from 'react'
import { BookDetail } from '@features/bookshelf'
import { useRouter } from 'next/router';
import Layout from '@components/templates/Layout';

const BookDetailPage: NextPage = () => {
    const router = useRouter();
    const { bookId } = router.query;

    return(
        <Layout>
            {bookId && <BookDetail bookId={bookId.toString()} />}
        </Layout>
    )
}

export default BookDetailPage
