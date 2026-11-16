import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import Sidebar from './components/Sidebar.jsx'
import BookClubHome from './pages/BookClubHome.jsx'
import BookPicker from './pages/BookPicker.jsx'
import PastReads from './pages/PastReads.jsx'
import ReadingList from './pages/ReadingList.jsx'
import './App.css'

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="bookclub-shell">
      <Sidebar />
      <main className="bookclub-main">
        <div className="bookclub-page">
          <Routes>
            <Route path="/" element={<BookClubHome />} />
            <Route path="/reading-list" element={<ReadingList />} />
            <Route path="/past-reads" element={<PastReads />} />
            <Route path="/book-picker" element={<BookPicker />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
