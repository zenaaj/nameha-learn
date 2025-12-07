import axios from "axios";

const API_KEY = "CODE449VLI3DDGOY"; 

export const getPrice = async (symbol) => {
  try {
    const res = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
    );
    return res.data["Global Quote"];
  } catch (err) {
    console.error("API error:", err);
    return null;
  }
};

