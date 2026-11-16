import { useState } from 'react'
import { X } from 'lucide-react'

export default function BookForm({ book, status, onSave, onClose }) {
  const [form, setForm] = useState(() => ({
    title: '', author: '', genre: '', secondaryGenre: '', contentWarnings: '',
    notes: '', status, ...book,
    rating: book?.rating ?? '', dateRead: book?.dateRead ?? '',
  }))
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  function submit(event) {
    event.preventDefault()
    const saved = onSave({
      ...form,
      title: form.title.trim(),
      author: form.author.trim(),
      genre: form.genre.trim(),
      secondaryGenre: form.secondaryGenre.trim(),
      notes: form.notes.trim(),
      contentWarnings: form.contentWarnings.trim(),
      rating: form.rating === '' ? null : Number(form.rating),
      dateRead: form.dateRead || null,
    })
    if (saved) onClose()
  }
  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <section className="book-form" role="dialog" aria-modal="true" aria-labelledby="form-title">
        <div className="book-form__heading">
          <h2 id="form-title">{book ? 'Edit book' : 'Add book'}</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close"><X size={20} /></button>
        </div>
        <form onSubmit={submit}>
          <div className="book-form__grid">
            <label>Title <input autoFocus required name="title" value={form.title} onChange={update} /></label>
            <label>Author <input required name="author" value={form.author} onChange={update} /></label>
            <label>Genre <input name="genre" value={form.genre} onChange={update} /></label>
            <label>Secondary genre <input name="secondaryGenre" value={form.secondaryGenre} onChange={update} /></label>
            <label>Status
              <select name="status" value={form.status} onChange={update}>
                <option value="suggested">Suggested</option><option value="current">Current read</option><option value="read">Read</option>
              </select>
            </label>
            {form.status === 'read' && <>
              <label>Club rating (0–5) <input type="number" min="0" max="5" step="0.01" name="rating" value={form.rating} onChange={update} /></label>
              <label>Date read <input type="date" name="dateRead" value={form.dateRead} onChange={update} /></label>
            </>}
            <label className="book-form__wide">Content warnings <textarea name="contentWarnings" rows="2" value={form.contentWarnings} onChange={update} /></label>
            <label className="book-form__wide">Notes <textarea name="notes" rows="4" value={form.notes} onChange={update} /></label>
          </div>
          <div className="book-form__actions">
            <button type="button" className="bookclub-button bookclub-button--quiet" onClick={onClose}>Cancel</button>
            <button className="bookclub-button" type="submit">Save book</button>
          </div>
        </form>
      </section>
    </div>
  )
}
