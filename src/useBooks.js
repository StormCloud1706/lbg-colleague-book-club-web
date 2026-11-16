import { useState } from 'react'
import { loadBooks, saveBooks } from './bookStorage.js'

// Books are kept newest first, which is what "Recently added" sorting shows.
export function useBooks() {
  const [books, setBooks] = useState(loadBooks)

  function commit(next) {
    setBooks(next)
    saveBooks(next)
  }

  return {
    books,
    addBook: (book) => commit([{ ...book, id: crypto.randomUUID() }, ...books]),
    updateBook: (book) => commit(books.map((b) => (b.id === book.id ? book : b))),
    deleteBook: (id) => commit(books.filter((b) => b.id !== id)),
  }
}
