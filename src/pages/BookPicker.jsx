import { useEffect, useRef, useState } from 'react'
import { Dice1, Dice5, Dices, RefreshCw } from 'lucide-react'
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
  const [rolling, setRolling] = useState([])
  const [previews, setPreviews] = useState([null, null, null])
  const [announcement, setAnnouncement] = useState('')
  const timers = useRef(null)
  const hasPicked = picked.some(Boolean)

  useEffect(() => () => {
    if (timers.current) {
      clearInterval(timers.current.interval)
      clearTimeout(timers.current.timeout)
    }
  }, [])

  function animateRoll(indices, result) {
    if (timers.current) return
    const finish = () => {
      if (timers.current) clearInterval(timers.current.interval)
      timers.current = null
      setPicked(result)
      setRolling([])
      setRolls((counts) => counts.map((count, i) => indices.includes(i) ? count + 1 : count))
      setAnnouncement(indices.map((i) => `Option ${i + 1}: ${result[i] ? `${result[i].title} by ${result[i].author}` : 'no available book'}`).join('. '))
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish()
      return
    }
    const cycle = () => setPreviews(indices.reduce((next, index) => {
      next[index] = pickOne(suggestions, [])
      return next
    }, [null, null, null]))
    cycle()
    setRolling(indices)
    setAnnouncement('Rolling books...')
    timers.current = {
      interval: setInterval(cycle, 110),
      timeout: setTimeout(finish, 1500),
    }
  }

  function rollAll() {
    const next = []
    for (let i = 0; i < 3; i++) next.push(pickOne(suggestions, next.filter(Boolean).map((book) => book.id)))
    animateRoll([0, 1, 2], next)
  }
  function rollOne(index) {
    const otherIds = picked.filter((book, i) => i !== index && book).map((book) => book.id)
    const currentId = picked[index]?.id
    const next = pickOne(suggestions, [...otherIds, currentId]) || pickOne(suggestions, otherIds)
    animateRoll([index], picked.map((book, i) => i === index ? next : book))
  }
  return (
    <section className="picker">
      <h1 className="bookclub-page__title">Book Picker</h1>
      <p className="picker__intro">Draw 3 random books from our {suggestions.length} reading list suggestions, then screenshot the winners for the vote.</p>
      <p className="picker__sr-only" role="status">{announcement}</p>
      <button className="bookclub-button" onClick={rollAll} disabled={!suggestions.length || rolling.length > 0}><Dices size={18} /> {hasPicked ? 'Re-roll all 3' : 'Pick 3 books'}</button>
      {!suggestions.length && <p className="picker__message">Add a suggested book to use the picker.</p>}
      <div className="cards picker__cards">
        {picked.map((book, index) => (
          <div className="picker__option" key={index}>
            <article key={rolls[index]} className={`card card--${['cream', 'olive', 'sand'][index]} ${rolling.includes(index) || !book ? 'card--empty' : 'picker__card--rolled'}`}>
              <p className="card__label">Option {index + 1}</p>
              {rolling.includes(index) ? <>
                <div className="picker__dice" aria-hidden="true"><Dice1 /><Dice5 /></div>
                <div className="picker__preview" aria-hidden="true">
                  <h2>{previews[index]?.title}</h2>
                  <p className="card__author">{previews[index]?.author}</p>
                </div>
              </> : book ? <>
                <span className="picker__confetti" aria-hidden="true">{Array.from({ length: 10 }, (_, i) => <i key={i} />)}</span>
                <h2>{book.title}</h2>
                <p className="card__author">{book.author}</p>
                <p className="card__genre">{[book.genre, book.secondaryGenre].filter(Boolean).join(' / ')}</p>
                {book.notes && <p className="card__notes">{book.notes}</p>}
                {book.contentWarnings && <p className="picker__warnings"><strong>Content warnings:</strong> <span className="preserve-lines">{book.contentWarnings}</span></p>}
              </> : <><p className="picker__question">?</p><p className="picker__waiting">Waiting for a roll...</p></>}
            </article>
            <button className="bookclub-button bookclub-button--quiet picker__roll" onClick={() => rollOne(index)} disabled={!suggestions.length || rolling.length > 0}><RefreshCw size={17} /> {book ? 'Re-roll' : 'Roll'} option {index + 1}</button>
          </div>
        ))}
      </div>
    </section>
  )
}
