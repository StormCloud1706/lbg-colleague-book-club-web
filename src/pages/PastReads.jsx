import BookList from '../components/BookList.jsx'

export default function PastReads({ library }) {
  return <BookList library={library} status="read" />
}
