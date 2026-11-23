
import { useState } from "react";
import { Search, X, Star,Plus } from "lucide-react";
import "../App.css"
const products = [
  {
    id: 1,
    name: "Chocolate Fudge Cake",
    category: "Cakes",
    price: 850,
    image: "/images/slice.jpg",
    description: "A rich chocolate cake layered with smooth chocolate frosting.",
    ingredients: "Flour, cocoa powder, sugar, eggs, butter and milk.",
    details: "Available in different sizes. Perfect for celebrations.",
  },
  {
    id: 2,
    name: "Red Velvet Cake",
    category: "Cakes",
    price: 950,
    image: "/images/red.jpg",
    description: "A soft red velvet cake finished with creamy frosting.",
    ingredients: "Flour, cocoa, sugar, eggs, butter and cream cheese.",
    details: "A beautiful treat for birthdays and special occasions.",
  },
  {
    id: 3,
    name: "birthday Cake",
    category: "Cakes",
    price: 950,
    image: "/images/birth.png",
    description: "A soft red velvet cake finished with creamy frosting.",
    ingredients: "Flour, cocoa, sugar, eggs, butter and cream cheese.",
    details: "A beautiful treat for birthdays.",
  },

  {
    id: 4,
    name: "Peach and blueberry galette",
    category: "Pastries",
    price: 250,
    image: "/images/pastry.png",
    description: "A light, flaky pastry with a delicious buttery taste.",
    ingredients: "Flour, butter, blueberry, sugar, eggs, vanilla extract and almonds.",
    details: "Freshly baked and perfect with your morning coffee.",
  },
  {
    id: 5,
    name: "Cinnamon Roll",
    category: "Pastries",
    price: 300,
    image: "/images/cinna.jpg",
    description: "A soft pastry filled with cinnamon and sweet glaze.",
    ingredients: "Flour, cinnamon, butter, sugar, yeast and milk.",
    details: "Served with a sweet icing topping.",
  },
  {
    id: 6,
    name: "Chocolate Chip Cookies",
    category: "Cookies",
    price: 180,
    image: "/images/cookies.png",
    description: "Golden cookies filled with delicious chocolate chips.",
    ingredients: "Flour, chocolate chips, butter, sugar and eggs.",
    details: "Available individually or in a cookie box.",
  },
  {
    id: 7,
    name: "Butter Cookies",
    category: "Cookies",
    price: 150,
    image: "/images/butter.jpg",
    description: "Crunchy, buttery cookies with a classic homemade taste.",
    ingredients: "Flour, butter, sugar and vanilla.",
    details: "A lovely snack to enjoy with tea or coffee.",
  },
  {
    id: 8,
    name: "Apple Pie",
    category: "Pies",
    price: 450,
    image: "/images/apple.jpg",
    description: "A golden crust filled with sweet apple filling.",
    ingredients: "Apples, flour, butter, cinnamon and sugar.",
    details: "A classic fruit pie with a delicious homemade flavour.",
  },
  {
    id: 9,
    name: "Blueberry Pie",
    category: "Pies",
    price: 500,
    image: "/images/pie.png",
    description: "A delicious pie filled with sweet blueberry filling.",
    ingredients: "Blueberries, flour, butter, lemon and sugar.",
    details: "Perfect for dessert or an afternoon treat.",
  },
  {
    id: 10,
    name: "Chocolate Brownie",
    category: "Desserts",
    price: 220,
    image: "/images/brownie.jpg",
    description: "A soft, rich chocolate brownie with a fudgy centre.",
    ingredients: "Chocolate, cocoa, flour, butter, sugar and eggs.",
    details: "A delicious chocolate treat.",
  },
  {
    id: 11,
    name: "Vanilla Cupcakes",
    category: "Desserts",
    price: 200,
    image: "/images/cupcake.jpg",
    description: "Soft vanilla cupcakes topped with creamy frosting.",
    ingredients: "Flour, vanilla, eggs, butter, sugar and milk.",
    details: "Available in different frosting colours.",
  },

  {
    id: 12,
    name: "Iced Coffee",
    category: "Drinks",
    price: 350,
    image: "/images/iced.jpg",
    description: "Refreshing chilled coffee with a smooth finish.",
    ingredients: "Coffee, milk, ice and optional sweetener.",
    details: "Served chilled.",
  },
  {
    id: 13,
    name: "Strawberry Milkshake",
    category: "Drinks",
    price: 400,
    image: "/images/straw.jpg",
    description: "A creamy strawberry milkshake with a fruity flavour.",
    ingredients: "Strawberries, milk and ice cream.",
    details: "Served cold.",
  },
  {
    id: 14,
    name: "Bakerz Bite Mug",
    category: "Merchandise",
    oldPice: 800,
    price: 650,
    image: "/images/mug.png",
    description: "A branded mug for enjoying your favourite drinks.",
    ingredients: "Not applicable.",
    details: "Example merchandise item. Custom branding available.",
  },
  {
    id: 15,
    name: "Bakerz Bite Tote Bag",
    category: "Merchandise",
    price: 800,
    image: "/images/bag.jpg",
    description: "A reusable Bakerz Bite shopping bag.",
    ingredients: "Not applicable.",
    details: "Example merchandise item.",
  },
  {
    id: 16,
    name: "Bakerz Bite glasses",
    category: "Merchandise",
    price: 800,
    image: "/images/cup.jpg",
    description: "A Longlasting Bakerz Bite glass.",
    ingredients: "Not applicable.",
    details: "Example merchandise item.",
  },
  {
    id: 17,
    name: "Bakerz Bite trays",
    category: "Merchandise",
    price: 800,
    image: "/images/tray.jpg",
    description: "A Flat,shallow receptacle Bakerz Bite tray .",
    ingredients: "Not applicable.",
    details: "Example merchandise item.",
  },
];

const categories = [
  "All",
  "Cakes",
  "Pastries",
  "Cookies",
  "Pies",
  "Desserts",
  "Drinks",
  "Merchandise",
];

function MenuPage({onAddToCart}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [productReviews, setProductReviews] = useState(() => {
    try {
      const savedReviews = localStorage.getItem(
        "bakerzBiteProductReviews"
      );

      return savedReviews ? JSON.parse(savedReviews) : {};
    } catch {
      return {};
    }
  });

  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewerName, setReviewerName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewNotice, setReviewNotice] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" ||
      product.category === activeCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  function openProduct(product) {
    setSelectedProduct(product);
    setSelectedRating(0);
    setReviewerName("");
    setReviewText("");
    setReviewNotice("");
  }

  function handleReviewSubmit(e) {
    e.preventDefault();

    if (!selectedProduct || selectedRating === 0) {
      return;
    }

    const newReview = {
      id: Date.now(),
      name: reviewerName.trim() || "Guest",
      rating: selectedRating,
      comment: reviewText.trim(),
      date: new Date().toLocaleDateString(),
    };

    const updatedReviews = {
      ...productReviews,
      [selectedProduct.id]: [
        ...(productReviews[selectedProduct.id] || []),
        newReview,
      ],
    };

    setProductReviews(updatedReviews);

    try {
      localStorage.setItem(
        "bakerzBiteProductReviews",
        JSON.stringify(updatedReviews)
      );
    } catch (error) {
      console.error("Could not save the review:", error);
    }

    setSelectedRating(0);
    setReviewerName("");
    setReviewText("");
    setReviewNotice("Thank you! Your rating and review have been added.");
  }

  // Calculate average rating
  function getAverageRating(reviews) {
    if (!reviews || reviews.length === 0) {
      return null;
    }

    const total = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    return (total / reviews.length).toFixed(1);
  }

  const selectedReviews = selectedProduct
    ? productReviews[selectedProduct.id] || []
    : [];

  const selectedAverage = getAverageRating(selectedReviews);

  return (
    <section className="menu-page">

      {/* MENU HEADING */}
      <div className="menu-heading">
        <span>Fresh From Our Bakery</span>
        <h1>Explore Our Menu</h1>
        <p>
          Discover delicious treats made with care,
          quality ingredients and a little sweetness.
        </p>
      </div>
      <div className="menu-search">
        <Search size={20} />
        <input
          type="search"
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="menu-categories">
        {categories.map((category) => (
          <button
            key={category}
            className={
              activeCategory === category ? "active" : ""
            }
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="menu-results">
        <p>
          Showing <strong>{filteredProducts.length}</strong> products
        </p>
      </div>

      <div className="menu-product-grid">

        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const reviews = productReviews[product.id] || [];
            const average = getAverageRating(reviews);

            return (
              <article
                className="menu-product-card"
                key={product.id}
              >
                <button
                  type="button"
                  className="menu-product-open"
                  onClick={() => openProduct(product)}
                  aria-label={`View ${product.name} details`}
                >
                  <div className="menu-product-image">
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                    <span className="menu-product-category">
                      {product.category}
                    </span>
                  </div>

                  <div className="menu-product-info">
                    <h3>{product.name}</h3>

                    {average ? (
                      <div className="menu-product-rating">
                        <span className="menu-stars">
                          {"★".repeat(Math.round(Number(average)))}
                          {"☆".repeat(5 - Math.round(Number(average)))}
                        </span>
                        <span>
                          {average} ({reviews.length})
                        </span>
                      </div>
                    ) : (
                      <p className="menu-not-rated">
                        Be the first to rate
                      </p>
                    )}

                    <div className="menu-product-bottom">
                      <strong>
                        KSh {product.price.toLocaleString("en-KE")}
                      </strong>
                      <del>{product.oldPice}</del>
                      <span>View Details</span>
                    </div>
                  </div>
                </button>
                <button
                    type="button"
                    className="add-to-cart-button"
                    onClick={() => onAddToCart(product)}
                    >
                    <Plus size={17} />
                    Add to Cart
                </button>
              </article>
            );
          })
        ) : (
          <div className="menu-empty">
            <h3>No products found</h3>
            <p>Try another product name or category.</p>
          </div>
        )}

      </div>

      {/* PRODUCT DETAILS POPUP */}
      {selectedProduct && (
        <div
          className="product-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedProduct(null);
            }
          }}
        >
          <div
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
          >

            <button
              className="product-modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product details"
              type="button"
            >
              <X size={23} />
            </button>

            {/* PRODUCT DETAILS */}
            <div className="product-modal-details">

              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="product-modal-image"
              />

              <div className="product-modal-information">
                <span className="product-modal-category">
                  {selectedProduct.category}
                </span>

                <h2 id="product-modal-title">
                  {selectedProduct.name}
                </h2>

                <p>{selectedProduct.description}</p>

                <div className="product-modal-price">
                  KSh {selectedProduct.price.toLocaleString("en-KE")}
                </div>

                <div className="product-modal-extra">
                  <h3>Ingredients</h3>
                  <p>{selectedProduct.ingredients}</p>

                  <h3>Product Details</h3>
                  <p>{selectedProduct.details}</p>
                </div>

              </div>
            </div>

            {/* PRODUCT RATINGS */}
            <div className="product-review-section">

              <h3>Customer Ratings & Reviews</h3>

              <div className="product-average-rating">
                {selectedAverage ? (
                  <>
                    <span className="average-number">
                      {selectedAverage}/5
                    </span>

                    <div>
                      <span className="menu-stars">
                        {"★".repeat(Math.round(Number(selectedAverage)))}
                        {"☆".repeat(5 - Math.round(Number(selectedAverage)))}
                      </span>
                      <p>{selectedReviews.length} customer reviews</p>
                    </div>
                  </>
                ) : (
                  <p>No ratings yet. Be the first to review this product!</p>
                )}
              </div>

              {/* REVIEW FORM */}
              <form
                className="product-review-form"
                onSubmit={handleReviewSubmit}
              >
                <h4>Rate This Product</h4>

                <p>Select your rating:</p>

                <div className="rating-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={
                        selectedRating >= star
                          ? "rating-star selected"
                          : "rating-star"
                      }
                      onClick={() => setSelectedRating(star)}
                      aria-label={`Rate ${star} out of 5`}
                      aria-pressed={selectedRating === star}
                    >
                      <Star
                        size={29}
                        fill={
                          selectedRating >= star
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  ))}
                </div>

                <label htmlFor="reviewer-name">
                  Your Name
                </label>

                <input
                  id="reviewer-name"
                  type="text"
                  placeholder="Enter your name"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                />

                <label htmlFor="review-text">
                  Your Feedback
                </label>

                <textarea
                  id="review-text"
                  rows="3"
                  placeholder="Share your experience with this product..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  className="submit-product-review"
                  disabled={selectedRating === 0 || !reviewText.trim()}
                >
                  Submit Rating
                </button>

                {reviewNotice && (
                  <p className="review-success" role="status">
                    {reviewNotice}
                  </p>
                )}
              </form>

              {/* CUSTOMER REVIEWS */}
              <div className="existing-product-reviews">
                <h4>Customer Feedback</h4>

                {selectedReviews.length > 0 ? (
                  [...selectedReviews].reverse().map((review) => (
                    <div
                      className="customer-review"
                      key={review.id}
                    >
                      <div className="customer-review-top">
                        <strong>{review.name}</strong>
                        <span>{review.date}</span>
                      </div>

                      <div className="menu-stars">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>

                      <p>{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-product-reviews">
                    add some reviews.
                  </p>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}

export default MenuPage;
