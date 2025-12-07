import React, { useState, useEffect, useCallback } from "react";

const Dashboard = () => {
  const [symbols, setSymbols] = useState(["AAPL", "TSLA", "AMZN", "MSFT", "GOOG"]);
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = process.env.REACT_APP_ALPHAVANTAGE_KEY;

  // -----------------------------------------
  // FETCH ALL PRICES (wrapped in useCallback)
  // -----------------------------------------
  const fetchAllPrices = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const results = {};

      for (const symbol of symbols) {
        const res = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
        );

        const data = await res.json();
        const price = data["Global Quote"]?.["05. price"];

        results[symbol] = price || "N/A";
      }

      setPrices(results);
    } catch (err) {
      setError("Failed to fetch stock data. Please try again later.");
    }

    setLoading(false);
  }, [symbols, API_KEY]);

  // -----------------------------------------
  // FETCH PRICES ON LOAD
  // -----------------------------------------
  useEffect(() => {
    fetchAllPrices();
  }, [fetchAllPrices]);

  // -----------------------------------------
  // UI
  // -----------------------------------------
  return (
    <div className="dashboard-container">
      <h1>Market Dashboard</h1>

      {loading && <p className="loading">Loading stock prices...</p>}
      {error && <p className="error">{error}</p>}

      <div className="stock-list">
        {symbols.map((symbol) => (
          <div className="stock-card" key={symbol}>
            <h2>{symbol}</h2>
            <p className="price">
              {prices[symbol] !== "N/A" ? `$${prices[symbol]}` : "N/A"}
            </p>
          </div>
        ))}
      </div>

      <button className="refresh-btn" onClick={fetchAllPrices}>
        Refresh Prices
      </button>
    </div>
  );
};

export default Dashboard;
