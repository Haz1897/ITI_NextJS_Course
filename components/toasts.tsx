"use client";
import { useEffect, useState } from "react";
import { Toast } from "./toast";
import Quote from "@/interfaces/quote";

const Toasts = ({}) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("https://thequoteshub.com/api/");
        const data: Quote = await res.json();

        setQuotes((prevQuotes) => [...prevQuotes, data]);
      } catch (error) {
        console.error("Failed to fetch quote:", error);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  function closeQuote(id: number) {
    setQuotes((prevQuotes) => [...prevQuotes.filter((q) => q.id !== id)]);
  }

  return (
    <div
      className="toast-container position-fixed bottom-0 end-0 p-4"
      style={{ zIndex: 1055, maxWidth: "380px" }}
    >
      {quotes.map((q) => {
        return (
          <Toast
            key={q.id}
            quote={q}
            close={() => {
              closeQuote(q.id);
            }}
          ></Toast>
        );
      })}
    </div>
  );
};

export { Toasts };
