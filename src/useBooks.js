import { useState } from 'react'
import seedBooks from './data/books.json'
import { loadBooks, saveBooks } from './bookStorage.js'

export function useBooks() {
  const [initial] = useState(() => {
    try {
      return { books: loadBooks(), error: '' }
    } catch (error) {
      console.error('Could not load the saved book list:', error)
      return { books: seedBooks, error: 'Could not load your saved books. The original list is shown; changes are disabled to protect your saved data.' }
    }
  })
  const [books, setBooks] = useState(initial.books)
  const [error, setError] = useState(initial.error)

  function commit(next) {
    if (initial.error) return false
    try {
      saveBooks(next)
      setBooks(next)
      setError('')
      return true
    } catch (cause) {
      console.error('Could not save the book list:', cause)
      setError('Could not save your changes in this browser. Check your browser storage settings and try again.')
      return false
    }
  }

  return {
    books,
    error,
    addBook: (book) => commit([{ ...book, id: crypto.randomUUID() }, ...books]),
    updateBook: (book) => commit(books.map((b) => (b.id === book.id ? book : b))),
    deleteBook: (id) => commit(books.filter((b) => b.id !== id)),
  }
}
