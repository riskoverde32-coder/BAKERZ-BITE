import '../bb-pages.css'
import { useEffect, useState } from 'react'
import Hero from '../component/Hero'
import ContactCards from '../component/ContactCards'
import info from '../data/info.json'

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' }
const SUBJECTS = ['General question', 'Cake order', 'Merchandise', 'Something else']

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [thanks, setThanks] = useState(false)

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
    if (!e.currentTarget.checkValidity()) return

    // There is no server yet, so the message is kept in the browser
    try {
      const all = JSON.parse(localStorage.getItem('bbMessages') || '[]')
      all.push({ ...form, sentAt: new Date().toISOString() })
      localStorage.setItem('bbMessages', JSON.stringify(all))
    } catch { /* storage blocked */ }

    setForm(EMPTY)
    setSubmitted(false)
    setThanks(true)
  }

  return (
    <section id="contact" className="bb">
      <Hero
        title="Contact Us"
        motto="A question, a cake order, or just saying hello."
        image="images/bakery-display.jpg"
      />

      <div className="bb-container pad">
        <div className="contact-layout">
          <div>
            <h2>Get in touch</h2>
            <ContactCards />

            <h3>Opening hours</h3>
            <ul className="hours">
              {info.hours.map((h) => (
                <li key={h.days}><span>{h.days}</span><span>{h.time}</span></li>
              ))}
            </ul>

            <img className="shop-photo" src="images/bakery-shop.jpg" alt="Inside the Bakerz Bite shop" />
          </div>

          <form className={`panel form ${submitted ? 'submitted' : ''}`} noValidate onSubmit={handleSubmit}>
            <h2>Send a message</h2>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="cName">Name</label>
                <input id="cName" name="name" type="text" required minLength={2} value={form.name} onChange={update} />
                <small className="err">Please enter your name.</small>
              </div>
              <div className="field">
                <label htmlFor="cEmail">Email</label>
                <input id="cEmail" name="email" type="email" required value={form.email} onChange={update} />
                <small className="err">Please enter a valid email.</small>
              </div>
              <div className="field">
                <label htmlFor="cPhone">Phone (optional)</label>
                <input id="cPhone" name="phone" type="tel" pattern="[0-9+()\-\s]{7,20}" value={form.phone} onChange={update} />
                <small className="err">Use numbers, spaces, + ( ) or -.</small>
              </div>
              <div className="field">
                <label htmlFor="cSubject">Subject</label>
                <select id="cSubject" name="subject" required value={form.subject} onChange={update}>
                  <option value="">Choose one</option>
                  {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                </select>
                <small className="err">Please choose a subject.</small>
              </div>
              <div className="field full">
                <label htmlFor="cMsg">Message</label>
                <textarea id="cMsg" name="message" rows={5} required minLength={10} value={form.message} onChange={update} />
                <small className="err">Please write at least 10 characters.</small>
              </div>
              <div className="field full">
                <button type="submit" className="btn">Send message</button>
              </div>
            </div>
            {thanks && (
              <p className="sent" role="status">
                Thanks, we got your message and will reply soon.
                <button type="button" className="sent-close" aria-label="Close" onClick={() => setThanks(false)}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
