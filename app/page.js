"use client";

import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  function login(e) {
    e.preventDefault();

    if (password === "rakib07") {
      setUnlocked(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  }

  async function submitNumber(e) {
    e.preventDefault();

    setLoading(true);
    setData(null);
    setError("");

    try {
      const response = await fetch("/api/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ number })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Number not found");
      }

      setData(result);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  if (!unlocked) {
    return (
      <main className="page">
        <div className="loginCard">
          <div className="lock">🔐</div>

          <h1>Secure Access</h1>
          <p>Enter password to continue</p>

          <form onSubmit={login}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
              Continue
            </button>
          </form>

          {error && <div className="error">{error}</div>}
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container">

        <div className="header">
          <div className="logo">M</div>
          <h1>Message Checker</h1>
          <p>Demo notification viewer</p>
        </div>

        <form onSubmit={submitNumber} className="searchBox">
          <label>Phone Number</label>

          <div className="inputRow">
            <input
              type="text"
              placeholder="+880 1791-241885"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />

            <button disabled={loading}>
              {loading ? "Checking..." : "Submit"}
            </button>
          </div>
        </form>

        {error && (
          <div className="error">
            ❌ {error}
          </div>
        )}

        {data && (
          <div className="result">

            <div className="resultHeader">
              <div>
                <span className="badge">DEMO</span>
                <h2>Messages</h2>
              </div>

              <span>{data.number}</span>
            </div>

            {data.notifications.map((item) => (
              <div className="notification" key={item.id}>

                <div className="avatar">
                  {item.name.charAt(0)}
                </div>

                <div className="message">
                  <strong>{item.name}</strong>
                  <small>Facebook-style message</small>
                  <p>{item.message}</p>
                  <time>
                    {new Date(item.timestamp).toLocaleString()}
                  </time>
                </div>

                <div className="dot" />
              </div>
            ))}

            <details className="json">
              <summary>View JSON Response</summary>

              <pre>
                {JSON.stringify(data, null, 2)}
              </pre>
            </details>

          </div>
        )}

        <footer>
          Demo data only — no real Facebook data is accessed.
        </footer>

      </div>
    </main>
  );
}
