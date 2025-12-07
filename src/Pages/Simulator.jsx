import { useState } from "react";
import { getPrice } from "../Services/api";

const Simulator = () => {
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [portfolio, setPortfolio] = useState(
    () => JSON.parse(localStorage.getItem("portfolio")) || []
  );

  const fetchPrice = async () => {
    if (!symbol) return;

    setLoading(true);
    setError("");
    setPrice(null);

    const data = await getPrice(symbol);

    setLoading(false);

    if (!data || !data["05. price"]) {
      setError("Invalid symbol or API error. Try AAPL, TSLA, AMZN, MSFT...");
      return;
    }

    setPrice(parseFloat(data["05. price"]));
  };

  const buyAsset = () => {
    const entry = {
      symbol: symbol.toUpperCase(),
      amount: Number(amount),
      buyPrice: price,
    };

    const updated = [...portfolio, entry];
    setPortfolio(updated);
    localStorage.setItem("portfolio", JSON.stringify(updated));

    setAmount("");
    setSymbol("");
    setPrice(null);
  };

  return (
    <div className="page">
      <h2>Investment Simulator</h2>

      <div className="sim-box">
        <input
          type="text"
          placeholder="Enter symbol (e.g., AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />

        <button onClick={fetchPrice} disabled={loading}>
          {loading ? "Loading..." : "Get Price"}
        </button>

        {loading && <div className="loader"></div>}
        {error && <p className="error">{error}</p>}

        {price && (
          <p style={{ marginTop: "12px" }}>
            Current Price of <strong>{symbol.toUpperCase()}</strong>:{" "}
            <strong>${price}</strong>
          </p>
        )}

        {price && (
          <>
            <input
              type="number"
              placeholder="Amount to invest"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button onClick={buyAsset}>Buy</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Simulator;
