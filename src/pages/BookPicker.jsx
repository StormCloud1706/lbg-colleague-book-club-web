import { useState } from 'react'
import { Dices, RefreshCw } from 'lucide-react'
import './Cards.css'
import './BookPicker.css'

function pickOne(books, excluded) {
  const available = books.filter((book) => !excluded.includes(book.id))
  return available.length ? available[Math.floor(Math.random() * available.length)] : null
}

export default function BookPicker({ books }) {
  const suggestions = books.filter((book) => book.status === 'suggested')
  const [picked, setPicked] = useState([null, null, null])
  const [rolls, setRolls] = useState([0, 0, 0])
  const hasPicked = picked.some(Boolean)
  function rollAll() {
    const next = []
    for (let i = 0; i < 3; i++) next.push(pickOne(suggestions, next.filter(Boolean).map((book) => book.id)))
    setPicked(next)
    setRolls((counts) => counts.map((count) => count + 1))
  }
  function rollOne(index) {
    const otherIds = picked.filter((book, i) => i !== index && book).map((book) => book.id)
    const currentId = picked[index]?.id
    const next = pickOne(suggestions, [...otherIds, currentId]) || pickOne(suggestions, otherIds)
    setPicked(picked.map((book, i) => i === index ? next : book))
    setRolls((counts) => counts.map((count, i) => i === index ? count + 1 : count))
  }
  return (
    <section className="picker">
      <h1 className="bookclub-page__title">Book Picker</h1>
      <p className="picker__intro">Draw 3 random books from our {suggestions.length} reading list suggestions, then screenshot the winners for the vote.</p>
      <button className="bookclub-button" onClick={rollAll} disabled={!suggestions.length}><Dices size={18} /> {hasPicked ? 'Re-roll all 3' : 'Pick 3 books'}</button>
      {!suggestions.length && <p className="picker__message">Add a suggested book to use the picker.</p>}
      <div className="cards picker__cards">
        {picked.map((book, index) => (
          <div className="picker__option" key={index}>
            <article key={rolls[index]} className={`card card--${['cream', 'olive', 'sand'][index]} ${book ? 'picker__card--rolled' : 'card--empty'}`}>
              <p className="card__label">Option {index + 1}</p>
              {book ? <>
                <h2>{book.title}</h2>
                <p className="card__author">{book.author}</p>
                <p className="card__genre">{[book.genre, book.secondaryGenre].filter(Boolean).join(' / ')}</p>
                {book.notes && <p className="card__notes">{book.notes}</p>}
                {book.contentWarnings && <p className="picker__warnings"><strong>Content warnings:</strong> <span className="preserve-lines">{book.contentWarnings}</span></p>}
              </> : <><p className="picker__question">?</p><p className="picker__waiting">Waiting for a roll...</p></>}
            </article>
            <button className="bookclub-button bookclub-button--quiet picker__roll" onClick={() => rollOne(index)} disabled={!suggestions.length}><RefreshCw size={17} /> {book ? 'Re-roll' : 'Roll'} option {index + 1}</button>
          </div>
        ))}
      </div>
    </section>
  )
}
