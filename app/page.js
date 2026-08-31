"use client";

import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  function handlePassword(e) {
    e.preventDefault();

    if (password === "rakib07") {
      setUnlocked(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setData(null);
    setError("");

    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Number not found");
      }

      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <div className="container">

        {!unlocked ? (
          <div className="loginCard">
            <div className="lockIcon">🔐</div>

            <h1>Secure Access</h1>
            <p>Enter password to continue</p>

            <form onSubmit={handlePassword}>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />

              <button type="submit">
                Continue
              </button>
            </form>

            {error && (
              <div className="error">
                ❌ {error}
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="header">
              <div className="logo">F</div>
              <h1>Message Checker</h1>
              <p>Demo Facebook-style notification viewer</p>
            </div>

            <form onSubmit={handleSubmit} className="searchBox">
              <label>Phone Number</label>

              <div className="inputRow">
                <input
                  type="text"
                  placeholder="+880 1791-241885"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />

                <button type="submit" disabled={loading}>
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
              <section className="result">

                <div className="resultHeader">
                  <div>
                    <span className="badge">DEMO</span>
                    <h2>Facebook-style Messages</h2>
                  </div>

                  <span className="number">
                    {data.number}
                  </span>
                </div>

                <div className="notifications">
                  {data.notifications.map((item) => (
                    <div className="notification" key={item.id}>

                      <div className="avatar">
                        {item.name.charAt(0)}
                      </div>

                      <div className="messageContent">
                        <div className="nameRow">
                          <strong>{item.name}</strong>
                          <span>Facebook</span>
                        </div>

                        <p>{item.message}</p>

                        <small>
                          {new Date(item.timestamp).toLocaleString()}
                        </small>
                      </div>

                      <div className="dot"></div>
                    </div>
                  ))}
                </div>

                <details className="jsonBox">
                  <summary>View JSON Response</summary>
                  <pre>
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </details>

              </section>
            )}

            <footer>
              Demo data only — no real Facebook data is accessed.
            </footer>
          </>
        )}
      </div>
    </main>
  );
}
