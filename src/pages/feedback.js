import '../bb-pages.css'
import { useEffect, useMemo, useState } from 'react'
import Hero from '../component/Hero'
import Stars from '../component/Stars'
import StarPicker from '../component/StarPicker'
import data from '../data/reviews.json'

const STORAGE_KEY = 'bbReviews'
const EMPTY = { name: '', product: '', comment: '' }

// Reviews visitors added earlier are kept in the browser (localStorage)
function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

function today() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}

function initials(name) {
  return name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function Feedback() {
  const [saved, setSaved] = useState(loadSaved)
  const [filter, setFilter] = useState(0)          // 0 = all ratings
  const [form, setForm] = useState(EMPTY)
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false) // show errors after first try
  const [thanks, setThanks] = useState(false)
  const [newestId, setNewestId] = useState(null)

  const reviews = useMemo(() => [...saved, ...data.reviews], [saved])
  const shown = filter ? reviews.filter((r) => r.rating === filter) : reviews

  // Average rating and how many reviews per star
  const summary = useMemo(() => {
    const counts = [0, 0, 0, 0, 0, 0]
    let sum = 0
    reviews.forEach((r) => { counts[r.rating]++; sum += r.rating })
    const avg = reviews.length ? sum / reviews.length : 0
    return { counts, avg, total: reviews.length }
  }, [reviews])

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)) } catch { /* storage blocked */ }
  }, [saved])

  useEffect(() => {
    if (!thanks) return
    const t = setTimeout(() => setThanks(false), 4000)
    return () => clearTimeout(t)
  }, [thanks])

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    if (!e.currentTarget.checkValidity() || !rating) return

    const review = {
      id: Date.now(),
      name: form.name.trim(),
      product: form.product,
      rating,
      comment: form.comment.trim(),
      date: today(),
    }
    setSaved([review, ...saved])
    setNewestId(review.id)
    setFilter(0)
    setForm(EMPTY)
    setRating(0)
    setSubmitted(false)
    setThanks(true)
  }

  const productImg = (name) => (data.products.find((p) => p.name === name) || data.products[0]).img

  return (
    <section id="feedback" className="bb">
      <Hero
        title="Feedback"
        motto="Tell us what you liked, and what we could do better."
        image="images/hero-pastries.jpg"
      />

      <div className="bb-container pad">
        <div className="feedback-top">
          {/* Rating summary */}
          <div className="panel summary">
            <h2>Average rating</h2>
            <div className="avg">{summary.avg.toFixed(1)}</div>
            <Stars value={Math.round(summary.avg * 2) / 2} className="big" />
            <p className="muted">{summary.total} {summary.total === 1 ? 'review' : 'reviews'}</p>
            <ul className="bars">
              {[5, 4, 3, 2, 1].map((s) => (
                <li key={s}>
                  <span>{s} <i className="bi bi-star-fill"></i></span>
                  <span className="bar">
                    <span style={{ width: `${summary.total ? (summary.counts[s] / summary.total) * 100 : 0}%` }}></span>
                  </span>
                  <span>{summary.counts[s]}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Feedback form */}
          <form className={`panel form ${submitted ? 'submitted' : ''}`} noValidate onSubmit={handleSubmit}>
            <h2>Leave a review</h2>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="fName">Your name</label>
                <input id="fName" name="name" type="text" required minLength={2} maxLength={40}
                  value={form.name} onChange={update} />
                <small className="err">Please enter your name.</small>
              </div>
              <div className="field">
                <label htmlFor="fProduct">What are you rating?</label>
                <select id="fProduct" name="product" required value={form.product} onChange={update}>
                  <option value="">Choose one</option>
                  {data.products.map((p) => <option key={p.name}>{p.name}</option>)}
                </select>
                <small className="err">Please choose a product.</small>
              </div>
              <div className="field full">
                <span className="label">Your rating</span>
                <StarPicker value={rating} onChange={setRating} invalid={submitted && !rating} />
              </div>
              <div className="field full">
                <label htmlFor="fComment">Your feedback</label>
                <textarea id="fComment" name="comment" rows={3} required minLength={10} maxLength={400}
                  value={form.comment} onChange={update} />
                <small className="err">Please write at least 10 characters.</small>
              </div>
              <div className="field full">
                <button type="submit" className="btn">Post review</button>
              </div>
            </div>
            {thanks && (
              <p className="sent" role="status">
                Thanks! Your review is now on the list below.
                <button type="button" className="sent-close" aria-label="Close" onClick={() => setThanks(false)}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </p>
            )}
          </form>
        </div>

        {/* Reviews + filter */}
        <div className="reviews-head">
          <h2>What customers say</h2>
          <div className="chips" role="group" aria-label="Filter reviews by rating">
            {[0, 5, 4, 3, 2, 1].map((s) => (
              <button key={s} type="button" className={filter === s ? 'active' : ''}
                aria-pressed={filter === s} onClick={() => setFilter(s)}>
                {s === 0 ? 'All' : <>{s} <i className="bi bi-star-fill"></i></>}
              </button>
            ))}
          </div>
        </div>

        <div className="review-grid">
          {shown.map((r) => (
            <article key={r.id} className={`review ${r.id === newestId ? 'new' : ''}`}>
              <img src={productImg(r.product)} alt={r.product} loading="lazy" />
              <div className="review-body">
                <div className="review-head">
                  <span className="avatar">{initials(r.name)}</span>
                  <div><strong>{r.name}</strong><small>{formatDate(r.date)}</small></div>
                </div>
                <Stars value={r.rating} />
                <span className="tag">{r.product}</span>
                <p>{r.comment}</p>
              </div>
            </article>
          ))}
        </div>
        {shown.length === 0 && <p className="muted">No reviews with this rating yet.</p>}
      </div>
    </section>
  )
}
