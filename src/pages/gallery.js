
import { useState } from "react";
const galleryImages = [
  {
    id: 1,
    title: "Birthday Cakes",
    category: "Cakes",
    image: "/images/birth.png",
    description: "Beautiful cakes made for special moments.",
  },
  {
    id: 2,
    title: "Freshly Baked Pastries",
    category: "Pastries",
    image: "/images/pasteries.png",
    description: "Delicious pastries baked fresh every day.",
  },
  {
    id: 3,
    title: "Delicious Cookies",
    category: "Cookies",
    image: "/images/cookies.png",
    description: "Fresh cookies made with love.",
  },
  {
    id: 4,
    title: "Homemade Pies",
    category: "Pies",
    image: "/images/pie.png",
    description: "Enjoy our selection of freshly baked pies.",
  },
  {
    id: 5,
    title: "Sweet Desserts",
    category: "Desserts",
    image: "/images/dessert.png",
    description: "A little sweetness for every occasion.",
  },
  {
    id: 6,
    title: "Our Favourite Drinks",
    category: "Drinks",
    image: "/images/drinks.png",
    description: "Refreshing drinks to enjoy with your treats.",
  },
  {
    id: 7,
    title: "Bakery Merchandise",
    category: "Merchandise",
    image: "/images/merchendise.png",
    description: "Explore our special Bakerz Bite merchandise.",
  },
];

const filters = [
  "All",
  "Cakes",
  "Pastries",
  "Cookies",
  "Pies",
  "Desserts",
  "Drinks",
  "Merchandise",
];

function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredImages =
    activeFilter === "All"
      ? galleryImages
      : galleryImages.filter(
          (item) => item.category === activeFilter
        );

  return (
    <section className="gallery-section">

      <div className="gallery-heading">
        <span>Sweet Moments</span>
        <h1>Our Gallery</h1>
        <p>
          Explore our delicious creations and discover
          the passion behind every bake.
        </p>
      </div>

      <div className="gallery-filters">
        {filters.map((filter) => (
          <button
            key={filter}
            className={
              activeFilter === filter ? "active" : ""
            }
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* IMAGE GRID */}
      <div className="gallery-grid">

        {filteredImages.map((item) => (
          <div className="gallery-card" key={item.id}>

            <div className="gallery-image">
              <img
                src={item.image}
                alt={item.title}
              />
            </div>

            <div className="gallery-info">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

          </div>
        ))}

      </div>

      <div className="gallery-bottom">
        <h2>Something Caught Your Eye?</h2>
        <p>
          Discover more delicious treats from Bakerz Bite and give feedback.
        </p>
      </div>

    </section>
  );
}

export default Gallery;
