import seedBooks from './data/books.json'

const STORAGE_KEY = 'colleague-book-club:books'

// The bundled books.json is the starting list. Once someone adds, edits or deletes a
// book, their copy of the whole list is kept in this browser's localStorage.
export function loadBooks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (Array.isArray(saved)) return saved
  } catch {
    // Storage is unavailable or unreadable, so fall back to the bundled list.
  }
  return seedBooks
}

export function saveBooks(books) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
  } catch {
    // Storage is full or blocked: the change still applies for this visit.
  }
}
