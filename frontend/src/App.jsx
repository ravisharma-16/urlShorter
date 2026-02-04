import { useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [expiryDays, setExpiryDays] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [custom, setCustomAlias] = useState("");


  const handleFetch = async (e) =>
    {
    e.preventDefault();
    if (!originalUrl || !expiryDays)
      {
      setMessage("⚠ Please fill in all fields");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/url/shorten",
        { originalUrl, expiryDays,custom }
      );

      setShortUrl(res.data.shortUrl);
      generateQr(res.data.shortUrl);
    } catch (error) {
      setMessage("❌ Failed to generate short URL");
    } finally {
      setLoading(false);
    }
  };

  const generateQr = (url) => {
    if (!url) return;

    setQrUrl(
      `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        url
      )}`
    );
  };

  const restart = () => {
    setOriginalUrl("");
    setExpiryDays("");
    setShortUrl("");
    setMessage("");
    setQrUrl("");
    setCustomAlias("");
  };

  return (
    <div className="page">
      <div className="card">
        <h1>🔗 URL Shortener + QR</h1>

        {message && <p className="message">{message}</p>}

        <form onSubmit={handleFetch}>
          <label>Original URL</label>
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com"
          />

          <label>Custom Alias (optional)</label>
          <input
          type="text"
       value={custom}
        onChange={(e) => setCustomAlias(e.target.value)}
        placeholder="my-link"
         />


          <label>Expiry (Days)</label>
          <input
            type="number"
            value={expiryDays}
            onChange={(e) => setExpiryDays(e.target.value)}
            placeholder="Days..."
          />

          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate Short URL"}
          </button>
        </form>

        {shortUrl && (
          <div className="short-url">
            <p>Short URL</p>
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </div>
        )}

        {qrUrl && (
          <div className="qr-box">
            <img src={qrUrl} alt="QR Code" />
          </div>
        )}

        <button
          onClick={restart}
          disabled={!shortUrl && !qrUrl}
          style={{ marginTop: "15px", background: "#ff6b6b" }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
