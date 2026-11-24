import { useState } from 'react'

const WORDS = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent']

// Clickable 1–5 star rating
export default function StarPicker({ value, onChange, invalid }) {
  const [hover, setHover] = useState(0)
  const shown = hover || value

  return (
    <>
      <div className="rate" role="radiogroup" aria-label="Your rating" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n > 1 ? 's' : ''}: ${WORDS[n]}`}
            title={WORDS[n]}
            className={n <= shown ? 'on' : ''}
            onMouseEnter={() => setHover(n)}
            onClick={() => onChange(n)}
          >
            <i className="bi bi-star-fill"></i>
          </button>
        ))}
        <span className="rate-text">{shown ? WORDS[shown] : 'Tap a star'}</span>
      </div>
      {invalid && <small className="err show">Please pick a star rating.</small>}
    </>
  )
}
