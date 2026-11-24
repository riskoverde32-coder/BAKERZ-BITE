import info from '../data/info.json'

// Email, phone and address: shown on both About Us and Contact Us
export default function ContactCards() {
  return (
    <ul className="contact-list">
      <li>
        <i className="bi bi-telephone"></i>
        <div>
          <span>Phone</span>
          <a href={`tel:${info.phone.replace(/[^\d+]/g, '')}`}>{info.phone}</a>
        </div>
      </li>
      <li>
        <i className="bi bi-envelope"></i>
        <div>
          <span>Email</span>
          <a href={`mailto:${info.email}`}>{info.email}</a>
        </div>
      </li>
      <li>
        <i className="bi bi-geo-alt"></i>
        <div>
          <span>Address</span>
          <p>{info.address}</p>
        </div>
      </li>
    </ul>
  )
}
