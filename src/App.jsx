import { useState } from "react";
import "./App.css";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useState(() => {
    async function convert() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.frankfurter.dev/v1/latest?base=${fromCur}&symbols=${toCur}`
        );
        const data = await res.json();
        setConverted(data.rates[toCur]);
      } catch (error) {
        setConverted("Error occured");
      } finally {
        setIsLoading(false);
      }
    }
    convert();
  }, [amount, fromCur, toCur]);

  return (
    <>
      <div className="p-4">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          disabled={isLoading}
          className="p-2 text-black outline-none"
        />
        <select
          value={fromCur}
          onChange={(e) => setFromCur(e.target.value)}
          disabled={isLoading}
          className="mx-4 p-2 text-black"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>

          <option value="AUD">AUD</option>
          <option value="BGN">BGN</option>
          <option value="BRL">BRL</option>
        </select>
        <select
          value={toCur}
          onChange={(e) => setToCur(e.target.value)}
          disabled={isLoading}
          className="p-2 text-black"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>

          <option value="AUD">AUD</option>
          <option value="BGN">BGN</option>
          <option value="BRL">BRL</option>
        </select>
        <div className="flex my-4">
          <p>OUTPUT</p>
          <p className="ml-4">
            {converted} {toCur}
          </p>
        </div>
      </div>
    </>
  );
}
