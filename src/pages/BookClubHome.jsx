import Rating from '../components/Rating.jsx'
import './Cards.css'
import './BookClubHome.css'

function BookInfo({ book }) {
  if (!book) return <p>No book selected yet.</p>
  return <>
    <h2>{book.title}</h2>
    <p className="card__author">{book.author}</p>
    <p className="card__genre">{[book.genre, book.secondaryGenre].filter(Boolean).join(' / ')}</p>
    {book.notes && <p className="card__notes">{book.notes}</p>}
  </>
}

export default function BookClubHome({ books }) {
  const current = books.find((book) => book.status === 'current')
  const previous = books.filter((book) => book.status === 'read')
    .sort((a, b) => (b.dateRead || '').localeCompare(a.dateRead || ''))[0]
  return (
    <section className="home">
      <h1 className="bookclub-page__title">Welcome to LBG's Colleague Book Club!</h1>
      <div className="home__intro">
        <p>I have created this space for our book club members to have a one stop shop for tracking and adding to our Reading List, seeing what we're currently reading, and browsing past books along with their average ratings.</p>
        <p>I plan to add functionality for voting on books and leaving reviews in the near future.</p>
        <p>Click the links in the sidebar to explore!</p>
      </div>
      <div className="cards home__cards">
        <article className="card card--cream"><p className="card__label">Currently reading</p><BookInfo book={current} /></article>
        <article className="card card--olive">
          <p className="card__label">Next meeting</p>
          <dl className="home__meeting">
            <dt>Date</dt><dd>Thursday 26 November</dd>
            <dt>Time</dt><dd>12:30 until 1:30pm</dd>
            <dt>Location</dt><dd>See Teams invite</dd>
            <dt>Room</dt><dd>See Teams invite</dd>
          </dl>
        </article>
        <article className="card card--sand"><p className="card__label">Previous read</p><BookInfo book={previous} />
          {previous?.rating != null && <div className="home__rating"><span>Club rating:</span> <Rating value={previous.rating} /></div>}
        </article>
      </div>
      <div className="home__join">
        <p>Join the club to get the invite and updates:</p>
        <strong>Join the Colleague Book Club Teams channel</strong>
      </div>
    </section>
  )
}
