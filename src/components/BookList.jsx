import { useMemo, useState } from 'react'
import { Pencil, Plus, Search, Trash2 } from 'lucide-react'
import BookForm from './BookForm.jsx'
import Rating from './Rating.jsx'
import './BookList.css'

const PAGE_SIZE = 12

export default function BookList({ library, status }) {
  const { books, addBook, updateBook, deleteBook } = library
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('')
  const [sort, setSort] = useState('recent')
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState(null)
  const list = books.filter((book) => book.status === status)
  const genres = [...new Set(list.map((book) => book.genre).filter(Boolean))].sort((a, b) => a.localeCompare(b))
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase()
    return books.filter((book) => book.status === status &&
      (!genre || book.genre === genre) &&
      (!search || [book.title, book.author, book.genre, book.secondaryGenre, book.notes, book.contentWarnings]
        .some((value) => value?.toLowerCase().includes(search))))
      .sort((a, b) => {
        if (sort === 'title') return a.title.localeCompare(b.title)
        if (sort === 'author') return a.author.localeCompare(b.author)
        if (sort === 'rating') return (b.rating ?? -1) - (a.rating ?? -1)
        return 0
      })
  }, [books, status, query, genre, sort])
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * PAGE_SIZE
  const past = status === 'read'
  function remove(book) {
    if (window.confirm(`Remove "${book.title}" from the list?`)) deleteBook(book.id)
  }
  return (
    <section>
      <header className="list-heading">
        <div><h1 className="bookclub-page__title">{past ? 'Past Reads' : 'Reading List'}</h1>
          <p>{list.length} {past ? 'books read' : 'suggested books'}</p></div>
        <button className="bookclub-button" onClick={() => setEditing({})}><Plus size={18} /> Add book</button>
      </header>
      <div className="list-filters">
        <label>Search books <span className="search-field"><Search size={18} aria-hidden="true" /><input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1) }} placeholder="Title, author or keyword" /></span></label>
        <label>Genre <select value={genre} onChange={(e) => { setGenre(e.target.value); setPage(1) }}><option value="">All genres</option>{genres.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Sort by <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1) }}><option value="recent">Recently added</option><option value="title">Title</option><option value="author">Author</option>{past && <option value="rating">Highest rated</option>}</select></label>
      </div>
      <p className="list-count">{filtered.length ? `${start + 1}–${Math.min(start + PAGE_SIZE, filtered.length)} of ${filtered.length}` : '0'} {past ? 'past reads' : 'suggestions'}</p>
      {filtered.slice(start, start + PAGE_SIZE).map((book) => (
        <article className="book-row" key={book.id}>
          <div className="book-row__actions">
            <button className="icon-button" onClick={() => setEditing(book)} aria-label={`Edit ${book.title}`}><Pencil size={18} /></button>
            <button className="icon-button" onClick={() => remove(book)} aria-label={`Delete ${book.title}`}><Trash2 size={18} /></button>
          </div>
          <h2>{book.title}</h2>
          <p className="book-row__author">{book.author}</p>
          <p className="book-row__genre">{[book.genre, book.secondaryGenre].filter(Boolean).join(' / ')}</p>
          {past && <Rating value={book.rating} />}
          <details><summary>Book details</summary>
            {book.notes && <p>{book.notes}</p>}
            {book.contentWarnings && <p><strong>Content warnings:</strong> <span className="preserve-lines">{book.contentWarnings}</span></p>}
          </details>
        </article>
      ))}
      {!filtered.length && <p className="empty-list">No books found.</p>}
      {totalPages > 1 && <div className="pagination">
        <button className="bookclub-button bookclub-button--quiet" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button className="bookclub-button bookclub-button--quiet" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}>Next</button>
      </div>}
      {editing && <BookForm book={editing.id ? editing : null} status={status} onClose={() => setEditing(null)} onSave={editing.id ? updateBook : addBook} />}
    </section>
  )
}
