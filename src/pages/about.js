
import "../about.css";

const productCategories = [
  "Cakes",
  "Pastries",
  "Cookies",
  "Pies",
  "Desserts",
  "Handcrafted Beverages",
];

function About({ setActivePage }) {
  return (
    <section className="about-page">

      <section className="about-hero">
        <span>ABOUT BAKERZ BITE</span>

        <h1>
          A passion for baking.
          <br />
          A love for sharing.
        </h1>

        <p>
          Bringing freshness, quality and a little sweetness
          into everyday moments.
        </p>

        <button onClick={() => setActivePage("Menu")}>
          Explore Our Menu
        </button>
      </section>


      <section className="about-story">

        <div className="about-story-image">
          <img
            src={`${process.env.PUBLIC_URL}/images/about.png`}
            alt="The welcoming Bakerz Bite bakery and café"
          />
        </div>

        <div className="about-story-content">
          <span className="about-label">OUR STORY</span>

          <h2>
            More than just
            <span> a bakery.</span>
          </h2>

          <p>
            At Bakerz Bite, baking is about more than making
            delicious treats. It is about bringing people
            together and making everyday moments special.
          </p>

          <p>
            As a bakery and café, we offer a wide selection
            of baked goods, from artisan pastries and
            gourmet cakes to delightful desserts and
            handcrafted beverages.
          </p>

          <p>
            Every day, we aim to give our customers
            something fresh, something delicious and
            something worth coming back for.
          </p>
        </div>

      </section>


      <section className="about-quality">

        <div className="about-quality-content">
          <span className="about-label">OUR COMMITMENT</span>

          <h2>
            Good ingredients.
            <br />
            Great taste.
          </h2>

          <p>
            We believe that great baked goods begin with
            carefully selected ingredients.
          </p>

          <p>
            That is why our baking philosophy emphasizes
            real butter, cream and unbleached flour.
            We value freshness and quality in everything
            we prepare.
          </p>
        </div>

        <div className="about-ingredients">
          <div>
            <span>1</span>
            <h3>Real Butter</h3>
          </div>

          <div>
            <span>2</span>
            <h3>Fresh Cream</h3>
          </div>

          <div>
            <span>3</span>
            <h3>Unbleached Flour</h3>
          </div>
        </div>

      </section>


      <section className="about-products">

        <div className="about-products-heading">
          <span className="about-label">A LITTLE SOMETHING FOR EVERYONE</span>

          <h2>Made for every craving.</h2>

          <p>
            From morning favourites to special occasion
            treats, there is always something delicious
            waiting for you.
          </p>
        </div>

        <div className="about-category-grid">
          {productCategories.map((category, index) => (
            <div className="about-category" key={category}>
              <span>0{index + 1}</span>
              <h3>{category}</h3>
            </div>
          ))}
        </div>

        <button
          className="about-menu-button"
          onClick={() => setActivePage("Menu")}
        >
          Discover Our Menu
        </button>

      </section>


      <section className="about-promise">

        <span>OUR PROMISE TO YOU</span>

        <h2>
          We treat our customers
          <br />
          like family.
        </h2>

        <p>
          We are dedicated to delivering quality products
          and making thoughtful choices about the ingredients
          we use. We believe in serving our customers with
          the same care we would give our own family.
        </p>

        <div className="about-promise-quote">
          "Where Smiles are served daily."
        </div>

      </section>

      <section className="about-bottom">

        <h2>There's always room for something sweet.</h2>

        <p>
          Visit our menu and find your next favourite treat.
        </p>

        <button onClick={() => setActivePage("Menu")}>
          Explore Our Products
        </button>

      </section>

    </section>
  );
}

export default About;
