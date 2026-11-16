import { NavLink } from 'react-router'
import logo from '../assets/colleague-book-club-logo.png'
import './Sidebar.css'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/reading-list', label: 'Reading List' },
  { to: '/past-reads', label: 'Past Reads' },
  { to: '/book-picker', label: 'Book Picker' },
]

export default function Sidebar() {
  return (
    <aside className="bookclub-sidebar">
      <img className="bookclub-sidebar__image" src={logo} alt="LBG Colleague Book Club" width="140" height="140" />
      <nav className="bookclub-sidebar__nav" aria-label="Book club">
        {LINKS.map(({ to, label }) => (
          <NavLink key={to} to={to} end className="bookclub-sidebar__link">
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
