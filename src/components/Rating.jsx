import { Star } from 'lucide-react'

export default function Rating({ value }) {
  if (value == null) return null
  const rounded = Math.round(value * 2) / 2
  return (
    <span className="rating" aria-label={`${value} out of 5`}>
      <span className="rating__stars" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <span className="rating__star" key={n}>
            <Star size={18} />
            <span className="rating__fill" style={{ width: `${Math.min(1, Math.max(0, rounded - n + 1)) * 100}%` }}>
              <Star size={18} fill="currentColor" />
            </span>
          </span>
        ))}
      </span>
      <strong>{value} / 5</strong>
    </span>
  )
}
