import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const Crypto = createContext();

function CryptoContext({ children }) {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSynbol] = useState("");

  useEffect(() => {
    if (currency === "INR") setSynbol("₹");
    else if (currency === "USD") setSynbol("$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
}

export default CryptoContext;
export const CryptoState = () => {
  return useContext(Crypto);
};
