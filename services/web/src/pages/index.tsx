import type { NextPage } from 'next'
import { AddBook } from '@features/bookshelf'
import Layout from '@components/templates/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <AddBook />
    </Layout>
  )
}

export default Home
