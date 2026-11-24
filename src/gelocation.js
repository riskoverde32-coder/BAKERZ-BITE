import { useEffect, useState } from "react";
import "./gelocation.css";

function Gelocation() {
  // Current date and time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Visitor's location
  const [location, setLocation] = useState("Not shared");

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Messages for the visitor
  const [message, setMessage] = useState("");

  // Update the clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear timer when component is removed
    return () => clearInterval(timer);
  }, []);

  // Format the date
  const formattedDate = currentTime.toLocaleDateString(
    undefined,
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  // Format the time
  const formattedTime = currentTime.toLocaleTimeString(
    undefined,
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

function requestLocation() {
  if (!navigator.geolocation) {
    setMessage("Your browser does not support geolocation.");
    return;
  }

  setIsLoading(true);
  setMessage("Getting your location...");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude =
        position.coords.latitude.toFixed(2);

      const longitude =
        position.coords.longitude.toFixed(2);

      setLocation(
        `Lat: ${latitude}° | Long: ${longitude}°`
      );

      setMessage("Location received successfully.");
      setIsLoading(false);
    },

    (error) => {
      setIsLoading(false);

      if (error.code === 1) {
        setMessage("Location permission denied.");
      } else if (error.code === 2) {
        setMessage("Location unavailable.");
      } else if (error.code === 3) {
        setMessage("Location request timed out.");
      }
    },

    {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 300000,
    }
  );
}
  const tickerContent = (
    <>
      <span className="ticker-item">
        DATE: {formattedDate}
      </span>

      <span className="ticker-separator">|</span>

      <span className="ticker-item">
        LOCAL TIME: {formattedTime}
      </span>

      <span className="ticker-separator">|</span>

      <span className="ticker-item">
        LOCATION: {location}
      </span>

      <span className="ticker-separator">|</span>

      <span className="ticker-item">
        BAKERZ BITE - WHERE SMILES ARE SERVED DAILY
      </span>
    </>
  );

return (
  <section className="location-ticker">

    <div className="ticker-window">
      <div className="ticker-track">

        <div className="ticker-group">
          {tickerContent}
        </div>

        <div className="ticker-group" aria-hidden="true">
          {tickerContent}
        </div>

      </div>
    </div>

    <button
      className="location-button"
      onClick={requestLocation}
      disabled={isLoading}
      title={message}
    >
      {isLoading
        ? "Loading..."
        : location === "Not shared"
          ? "Share Location"
          : "Update Location"}
    </button>

    <span className="ticker-sr-only" aria-live="polite">
      {message}
    </span>

  </section>
);
}
export default Gelocation;
