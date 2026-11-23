
import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";

const faqCategories = [
  "All",
  "Ordering",
  "Products",
  "Delivery",
  "Offers",
];

const faqs = [
  {
    id: 1,
    category: "Ordering",
    question: "How can I place an order?",
    answer:
      "Browse our Menu, choose your favourite products and add them to your cart. You can review your selections in the cart. To confirm an order, contact us through our Contact page until online checkout is available.",
  },
  {
    id: 2,
    category: "Ordering",
    question: "Can I request a custom cake?",
    answer:
      "Yes, you can contact us with your preferred cake flavour, size, design and collection date. We will discuss the available options and confirm the price with you.",
  },
  {
    id: 3,
    category: "Ordering",
    question: "Can I change my order after placing it?",
    answer:
      "Please contact us as soon as possible if you need to make a change. Whether a change is possible depends on the preparation stage of your order.",
  },
  {
    id: 4,
    category: "Products",
    question: "How do I know what products are available?",
    answer:
      "Visit our Menu page to explore our cakes, pastries, cookies, pies, desserts, drinks and merchandise. Product availability may change, so contact us to confirm a particular item.",
  },
  {
    id: 5,
    category: "Products",
    question: "Can I ask about ingredients and allergens?",
    answer:
      "Absolutely. Please contact us before ordering and tell us about any allergies or dietary requirements. Some products may contain or come into contact with common allergens.",
  },
  {
    id: 6,
    category: "Products",
    question: "How should I store my baked goods?",
    answer:
      "Storage depends on the product. Follow any storage instructions provided with your order, or contact us for advice about a specific item.",
  },
  {
    id: 7,
    category: "Delivery",
    question: "Do you offer delivery?",
    answer:
      "Delivery availability depends on your location and order details. Please contact us to confirm whether delivery is available in your area.",
  },
  {
    id: 8,
    category: "Delivery",
    question: "How long does delivery take?",
    answer:
      "Delivery times depend on your location, the products ordered and order preparation. We will confirm the expected timing when your order is arranged.",
  },
  {
    id: 9,
    category: "Offers",
    question: "Does Bakerz Bite have special offers?",
    answer:
     "Yes! Visit our Offers page to discover available promotions, special deals and discounts.",
  },
  {
  id: 10,
  category: "Offers",
  question: "How can I take advantage of an offer?",
  answer:
    "Browse our Offers page and check the details of each promotion. For questions about a particular offer, contact our team before placing your order.",
},
];

function FAQ({ setActivePage }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openQuestion, setOpenQuestion] = useState(1);

  const filteredFaqs =
    activeCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  function toggleQuestion(id) {
    setOpenQuestion((current) => (current === id ? null : id));
  }

  return (
    <section className="faq-page">
      <div className="faq-hero">
        <span className="faq-small-heading">WE'RE HERE TO HELP</span>
        <h1>
          Frequently Asked <span>Questions</span>
        </h1>
        <p>
          Have a question about our products or services?
          Find the answers to some of our most common questions below.
        </p>
      </div>

      <div className="faq-content">
        <div className="faq-category-list">
          {faqCategories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category ? "faq-category active" : "faq-category"
              }
              onClick={() => {
                setActiveCategory(category);
                setOpenQuestion(null);
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="faq-list">
          {filteredFaqs.map((faq) => (
            <div
              className={`faq-item ${
                openQuestion === faq.id ? "faq-item-open" : ""
              }`}
              key={faq.id}
            >
              <button
                className="faq-question"
                onClick={() => toggleQuestion(faq.id)}
                aria-expanded={openQuestion === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className="faq-chevron"
                  size={21}
                />
              </button>

              {openQuestion === faq.id && (
                <div
                  className="faq-answer"
                  id={`faq-answer-${faq.id}`}
                >
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-contact">
          <div className="faq-contact-icon">
            <MessageCircle size={27} />
          </div>

          <h2>Still have a question?</h2>
          <p>
            We would love to hear from you. Send us a message
            and we will help you with your enquiry.
          </p>

          <button
            className="faq-contact-button"
            onClick={() => setActivePage("Contact")}
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
