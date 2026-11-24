import '../bb-pages.css'
import Hero from '../component/Hero'
import ContactCards from '../component/ContactCards'
import info from '../data/info.json'

export default function About({ setActivePage }) {
  return (
    <section id="about" className="bb">
      <Hero
        title="About Us"
        motto="Where smiles are served daily."
        image="images/hero-bread.jpg"
      />

      <div className="bb-container pad">
        <div className="split">
          <div>
            <h2>Our story</h2>
            <p>
              Since it first opened, Bakerz Bite has grown into a well-known bakery and café. We bake
              everything in-store, every day, and we make it from the best ingredients we can find.
            </p>
            <p>
              Today we offer more than 300 kinds of baked goods: artisan pastries, gourmet cakes and
              desserts, and handcrafted drinks. We keep trying new recipes and opening in new places,
              but the idea stays the same. Fresh food, made properly.
            </p>
          </div>
          <img src="images/bakery-display.jpg" alt="Fresh pastries in the Bakerz Bite display case" />
        </div>

        <div className="split reverse">
          <div>
            <h2>What goes into it</h2>
            <p>
              We only use real butter, cream and unbleached flour. No shortcuts and no cheap substitutes.
            </p>
            <p>
              We think of our customers as family, so we won't put anything in our food that we
              wouldn't give to our own.
            </p>
          </div>
          <img src="images/kneading-dough.jpg" alt="Baker kneading dough by hand" />
        </div>

        <h2>From our ovens</h2>
        <div className="photo-grid">
          {info.kitchen.map((k) => (
            <figure key={k.label}>
              <img src={k.img} alt={k.alt} loading="lazy" />
              <figcaption>{k.label}</figcaption>
            </figure>
          ))}
        </div>

        <h2>Find us</h2>
        <ContactCards />
        <button type="button" className="btn" onClick={() => setActivePage('Contact')}>
          Send us a message
        </button>
      </div>
    </section>
  )
}
