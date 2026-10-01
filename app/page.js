"use client";

import { useState } from "react";

export default function Home() {
  const [problem, setProblem] = useState("");
  const [image, setImage] = useState(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function solve() {
    if (!problem.trim() && !image) return;

    setLoading(true);
    setAnswer("");

    const form = new FormData();
    form.append("problem", problem);
    if (image) form.append("image", image);

    try {
      const res = await fetch("/api/solve", {
        method: "POST",
        body: form
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setAnswer(data.answer);
    } catch (err) {
      setAnswer("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <nav>
        <strong>AE.mathAI</strong>
        <span>Home　 Solver　 Graphing　 Tools　 History　 Learn</span>
      </nav>

      <section className="hero">
        <p>POWERED BY AI</p>
        <h1>AE.mathAI</h1>
        <h2>Understand. Solve. Learn.</h2>
        <p>Your AI Mathematics Assistant</p>
      </section>

      <section className="solver">
        <h2>What mathematics problem can I solve?</h2>

        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="Enter your mathematics problem here..."
        />

        <div className="actions">
          <label className="upload">
            📷 Upload problem
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              hidden
            />
          </label>

          <button onClick={solve} disabled={loading}>
            {loading ? "Solving..." : "Solve →"}
          </button>
        </div>

        <div className="examples">
          <button onClick={() => setProblem("Solve 3x² - 12 = 0")}>
            3x² − 12 = 0
          </button>

          <button onClick={() => setProblem("Differentiate y = x³ + 2x")}>
            Differentiate x³ + 2x
          </button>
        </div>
      </section>

      {answer && (
        <section className="answer">
          <h2>Solution</h2>
          <pre>{answer}</pre>
        </section>
      )}

      <footer>© 2026 AE.mathAI — Understand. Solve. Learn.</footer>
    </main>
  );
}
