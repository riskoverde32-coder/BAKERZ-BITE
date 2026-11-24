export default function Hero({ title, motto, image }) {
  return (
    <header className="hero" style={{ '--hero-img': `url(${image})` }}>
      <div className="bb-container">
        <h1>{title}</h1>
        {motto && <p className="motto">{motto}</p>}
      </div>
    </header>
  )
}
