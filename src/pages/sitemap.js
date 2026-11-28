
function Sitemap({ setActivePage }) {
  const pages = [
    { name: "Home", description: "Welcome to Bakerz Bite" },
    { name: "Menu", description: "Explore our bakery products" },
    { name: "Gallery", description: "See our bakery creations" },
    { name: "Offers", description: "Discover our special offers" },
    { name: "About", description: "Get to know our bakery" },
    { name: "Contact", description: "Get in touch with us" },
  ];

  return (
    <section className="sitemap-page">
      <div className="sitemap-heading">
        <h2>Explore Our Website</h2>
        <p>Everything you need, in one place.</p>
      </div>

      <div className="sitemap-grid">
        {pages.map((page) => (
          <button
            key={page.name}
            className="sitemap-link"
            onClick={() => setActivePage(page.name)}
          >
            <h3>{page.name}</h3>
            <p>{page.description}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Sitemap;
