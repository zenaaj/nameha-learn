import { useEffect, useState } from "react";
import { getPrice } from "../Services/api";

const Dashboard = () => {
  const stockList = ["AAPL", "TSLA", "AMZN", "GOOGL", "MSFT", "NVDA"];
  
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllPrices = async () => {
    setLoading(true);
    setError("");

    try {
      const results = {};

      for (let symbol of stockList) {
        const data = await getPrice(symbol);

        if (data && data["05. price"]) {
          results[symbol] = parseFloat(data["05. price"]);
        } else {
          results[symbol] = null;
        }
      }

      setPrices(results);
    } catch (err) {
      setError("Error loading market data. Try again later.");
    }

    setLoading(false);
  };

useEffect(() => {
  fetchAllPrices();
}, [fetchAllPrices]);


  return (
    <div className="page">
      <h1>Market Overview</h1>
      <p style={{ marginBottom: "20px" }}>
        Live prices powered by AlphaVantage API
      </p>

      {loading && <div className="loader"></div>}
      {error && <p className="error">{error}</p>}

      <div className="stock-grid">
        {stockList.map((symbol) => (
          <div key={symbol} className="stock-card">
            <h3>{symbol}</h3>

            {prices[symbol] === null ? (
              <p className="error">N/A</p>
            ) : (
              <p className="price">
                {loading ? "Loading..." : `$${prices[symbol]}`}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
