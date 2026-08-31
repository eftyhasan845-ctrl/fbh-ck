"use client";

import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  function handlePassword(e) {
    e.preventDefault();

    if (password === "rakib07") {
      setUnlocked(true);
      setError("");
    } else {
      setError("Wrong password");
    }
  }

  function handleNumber(e) {
    e.preventDefault();

    // Number submit করার পর এখানে তোমার পরবর্তী logic বসাতে পারবে
    console.log("Number:", number);
  }

  if (!unlocked) {
    return (
      <main className="page">
        <div className="loginCard">
          <h2>Password</h2>

          <form onSubmit={handlePassword}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
            />

            <button type="submit">
              Continue
            </button>
          </form>

          {error && <p className="error">{error}</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="numberCard">

        <form onSubmit={handleNumber}>
          <input
            type="tel"
            placeholder="Enter phone number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            autoFocus
            required
          />

          <button type="submit">
            Submit
          </button>
        </form>

      </div>
    </main>
  );
}
