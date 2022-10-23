import type { NextPage } from 'next'
import { AddBook } from '@features/bookshelf'

const Home: NextPage = () => {
  return (
    <div>
      <AddBook />
    </div>
  )
}

export default Home
