import "./App.css";
import { useState } from "react";
import {
  Menu, 
  X,
} from "lucide-react";
import About from "./pages/about";
import Footer from "./pages/footer";
import biker from "./Assets/baker.png";
const navLinks = [
  { name: "Home" },
  { name: "Menu" },
  { name: "Gallery" },
  { name: "Testimonials" },
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

function Header({ activePage, setActivePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
    <div className="logo"> Where Smiles are served daily </div>
    <header className="App-header">
      
      <h1 className="icon"><img src={biker} alt="Bakerz Bites" sizes="20px" /></h1>
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
                onClick={(e) => {
                  setActivePage(link.name);
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
      <button className="learn" onClick={() => setActivePage("About")}>learn more</button>
      <button className="order" onClick={() => setActivePage("Menu")}>
        order now
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
              onClick={() => setActivePage("Menu")}
            >
              <img
                src={category.image}
                alt={category.name}
              />

              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </section>
        

    </>
  );
}

function App() {
  const [activePage, setActivePage] =useState("Home");
  
  let pageContent;

  if (activePage === "Home") {
    pageContent = <Home setActivePage={setActivePage} />;
  } else if (activePage === "About") {
    pageContent = <About />;
  }

  return (
    <div className="App">
      <Header activePage={activePage} setActivePage={setActivePage} />
      <main className="App-main">
        {pageContent}
         <Footer setActivePage={setActivePage} />
      </main>
    </div>
  );
}

export default App;
