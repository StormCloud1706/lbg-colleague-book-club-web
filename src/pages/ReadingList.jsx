import BookList from '../components/BookList.jsx'

export default function ReadingList({ library }) {
  return <BookList library={library} status="suggested" />
}
