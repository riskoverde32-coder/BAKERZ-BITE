import "./App.css";
import { useState,useEffect } from "react";
import {
  Menu, 
  X,
  Eye,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import About from "./pages/about";
import Footer from "./pages/footer";
import Contact from "./pages/contact";
import Gallery from "./pages/gallery";
import biker from "./Assets/baker.png";
import MenuPage from "./pages/menu";
import FAQ from "./pages/faq";
import Sitemap from "./pages/sitemap";
import CartWidget from "./component/cartwidget";
const navLinks = [
  { name: "Home" },
  { name: "Menu" },
  { name: "Gallery" },
  { name: "Offers" },
  { name: "About" },
  { name: "Contact" },
  { name: "FAQ" },
];
const categories = [
  { name: "Cakes", image: "/images/cake.png" },
  { name: "Pastries", image: "/images/pasteries.png" },
  { name: "Cookies", image: "/images/cookies.png" },
  { name: "Pies", image: "/images/pie.png" },
  { name: "Desserts", image: "/images/dessert.png" },
  { name: "Drinks", image: "/images/drinks.png" },
  { name: "Merchandise", image: "/images/merchendise.png" },
];
const offers = [
  {
    title: "Sweet Cake Deal",
    badge: "15% OFF",
    description: "Enjoy 15% off selected cakes for your special celebrations.",
    image: "/images/birth.png",
  },
  {
    title: "Bakerz Bite Mug",
    badge: "20% OFF",
    description: "Get 20% off selected Bakerz Bite mug.",
    image: "/images/mug.png",
  },
  {
    title: "Pastry Delight",
    badge: "SPECIAL DEAL",
    description: "Enjoy a special deal on selected freshly baked pastries.",
    image: "/images/pastry.png",
  },
];

function Header({ activePage, setActivePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const countKey = "bakerzBiteVisitorCount";
    const sessionKey = "bakerzBiteVisitCounted";

    let count = Number(localStorage.getItem(countKey)) || 0;

    if (!sessionStorage.getItem(sessionKey)) {
      count++;

      localStorage.setItem(countKey, count);
      sessionStorage.setItem(sessionKey, "true");
    }

    setVisitorCount(count);
  }, []);
  return (
    <>
    <div className="logo"> Where Smiles are served daily </div>
    <header className="App-header">
      
      <h1 className="icon"><img src={biker} alt="Bakerz Bites" sizes="20px" onClick={() => setActivePage("Home")}/></h1>
      <div className="visitor-counter">
        <Eye size={18} />

        <span>Visitors</span>

        <strong>{visitorCount.toLocaleString()}</strong>
      </div>
       <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>
      <nav className={`App-nav ${menuOpen ? "open" : ""}`}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.name}>
              <button
                className={activePage === link.name ? "active" : ""}
                onClick={() => {
                    if (link.name === "Offers") {
                      setActivePage("Home");

                      setTimeout(() => {
                        document.getElementById("offers")?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }, 100);
                    } else {
                      setActivePage(link.name);
                    }

                    setMenuOpen(false);
                  }}
              >
                {link.name}
               </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    </>
  );
}
function Home({setActivePage}) {
  return (
    <>
    <div className="container">
      <div className="home-content">
        <h1>Rise with our <span>community!</span></h1>
        <h2>Every meal is a celebration!</h2>
        <p>Welcome to our oven! Whether you are craving the comforting crackle 
         of a rustic sourdough loaf,a flaky pastry for your morning coffee, 
          or a decadent chocolate cake for a special occasion, 
          we have something to satisfy every craving. Our bakers are passionate about 
          their craft and use only the finest ingredients 
          to create baked goods that are as beautiful as they are delicious.
      </p>
      <button className="learn" onClick={() => setActivePage("About")}>learn more &rarr;</button>
      <button className="order" onClick={() => setActivePage("Menu")}>
        order now &rarr;
      </button>
      </div>
    </div>
    <section className="categories-section">
        <h2>Explore Our Categories</h2>
        <p>Discover your favourite baked goods!!.</p>

        <div className="category-grid">
          {categories.map((category) => (
            <div
              className="category-card"
              key={category.name}
              onClick={() => setActivePage("Menu") }
            >
              <img
                src={`${process.env.PUBLIC_URL}${category.image}`}
                alt={category.name}
              />

              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="offers-section" id="offers">

  <div className="offers-heading">
    <span>Special Treats</span>
    <h2>Our Special Offers</h2>
    <p>
      Discover our latest deals and enjoy something delicious
      at a sweeter price!
    </p>
  </div>

  <div className="offers-grid">
    {offers.map((offer) => (
      <div className="offer-card" key={offer.title}>

        <div className="offer-image">
          <img src={`${process.env.PUBLIC_URL}${offer.image}`} alt={offer.title} />
          <span className="offer-badge">
            {offer.badge}
          </span>
        </div>

        <div className="offer-info">
          <h2>{offer.title}</h2>
          <p>{offer.description}</p>

          <button onClick={() => setActivePage("Menu")}>
            Explore Menu
          </button>
        </div>

      </div>
    ))}
  </div>

</section>
        

    </>
  );
}

function App() {
  const [activePage, setActivePage] =useState("Home");

  const [cartItems, setCartItems] = useState([]);

  const [cartOpen, setCartOpen] = useState(false);

  function addToCart(product) {
  setCartItems((currentItems) => {
    const existingProduct = currentItems.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      return currentItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [
      ...currentItems,
      {
        ...product,
        quantity: 1,
      },
    ];
  });
}

function updateCartQuantity(id, newQuantity) {
  setCartItems((currentItems) =>
    currentItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, newQuantity) }
        : item
    )
  );
}

function removeFromCart(id) {
  setCartItems((currentItems) =>
    currentItems.filter((item) => item.id !== id)
  );
}
const cartCount = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);

const cartSubtotal = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);
  
  let pageContent;

  if (activePage === "Home") {
    pageContent = <Home setActivePage={setActivePage} />;
  } else if (activePage === "About") {
    pageContent = <About setActivePage={setActivePage} />;
  } else if (activePage === "Contact") {
    pageContent = <Contact />;
  } else if (activePage === "Gallery"){
    pageContent = <Gallery />
  } else if (activePage==="Menu"){
    pageContent= <MenuPage onAddToCart={addToCart}/>
  }else if (activePage==="FAQ"){
    pageContent= <FAQ  setActivePage={setActivePage}/>
  } else if (activePage==="SiteMap"){
    pageContent= <Sitemap setActivePage={setActivePage}/>
  }


  return (
    <div className="App">
      <Header activePage={activePage} setActivePage={setActivePage} />
      <main className="App-main">
        {pageContent}
         <Footer setActivePage={setActivePage} />
      </main>
      <CartWidget
        cartItems={cartItems}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}

export default App;
