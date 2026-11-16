import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import Sidebar from './components/Sidebar.jsx'
import BookClubHome from './pages/BookClubHome.jsx'
import BookPicker from './pages/BookPicker.jsx'
import PastReads from './pages/PastReads.jsx'
import ReadingList from './pages/ReadingList.jsx'
import { useBooks } from './useBooks.js'
import './App.css'

export default function App() {
  const { pathname } = useLocation()
  const library = useBooks()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="bookclub-shell">
      <Sidebar />
      <main className="bookclub-main">
        <div className="bookclub-page">
          {library.error && <p className="storage-error" role="alert">{library.error}</p>}
          <Routes>
            <Route path="/" element={<BookClubHome books={library.books} />} />
            <Route path="/reading-list" element={<ReadingList library={library} />} />
            <Route path="/past-reads" element={<PastReads library={library} />} />
            <Route path="/book-picker" element={<BookPicker books={library.books} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
