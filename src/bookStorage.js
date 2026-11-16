import seedBooks from './data/books.json'

const STORAGE_KEY = 'colleague-book-club:books'

export function loadBooks() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === null) return seedBooks
  const books = JSON.parse(saved)
  if (!Array.isArray(books)) throw new Error('Saved book list is not an array.')
  return books
}

export function saveBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
}
