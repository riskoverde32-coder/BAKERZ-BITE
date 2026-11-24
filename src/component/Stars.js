// Read-only row of 5 stars; supports halves (e.g. 4.5)
export default function Stars({ value, className = '' }) {
  return (
    <div className={`stars ${className}`} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <i
          key={i}
          className={`bi ${value >= i ? 'bi-star-fill' : value >= i - 0.5 ? 'bi-star-half' : 'bi-star'}`}
        ></i>
      ))}
    </div>
  )
}
