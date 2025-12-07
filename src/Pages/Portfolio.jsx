import { useEffect, useState } from "react";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("portfolio")) || [];
    setPortfolio(saved);
  }, []);

  return (
    <div className="page">
      <h2>Your Portfolio</h2>

      {portfolio.length === 0 ? (
        <p>No investments yet.</p>
      ) : (
        portfolio.map((item, i) => (
          <div key={i} className="portfolio-item">
            <h4>{item.symbol}</h4>
            <p>Invested: ${item.amount}</p>
            <p>Buy Price: ${item.buyPrice}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Portfolio;
