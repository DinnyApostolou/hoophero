"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function SubscribePage() {
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? "");
        setUserId(user.id);
      }
    }
    load();
  }, []);

  async function handleSubscribe() {
    setLoading(true);
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, userEmail }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setLoading(false);
      alert("Error: " + (data.error || "Something went wrong. Please try again."));
    }
  }

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", borderBottom: "1px solid #1a1a1a" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <span style={{ fontSize: "24px" }}>🏀</span>
          <span style={{ fontSize: "20px", fontWeight: 900, background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>HOOPHERO</span>
        </Link>
        <Link href="/dashboard" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px" }}>Back to Dashboard</Link>
      </nav>

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.3)", borderRadius: "20px", padding: "6px 16px", marginBottom: "24px", fontSize: "13px", color: "#FF6B00", fontWeight: 700, letterSpacing: "1px" }}>
          ONE PLAN. FULL ACCESS.
        </div>
        <h1 style={{ fontSize: "52px", fontWeight: 900, color: "#fff", margin: "0 0 16px", letterSpacing: "-2px" }}>
          $7<span style={{ fontSize: "24px", color: "#666", fontWeight: 400 }}>/month</span>
        </h1>
        <p style={{ color: "#666", fontSize: "18px", marginBottom: "48px" }}>Everything included. Cancel anytime. No BS.</p>

        <div style={{ background: "#111", border: "2px solid rgba(255,107,0,0.4)", borderRadius: "20px", padding: "40px", marginBottom: "32px", boxShadow: "0 0 40px rgba(255,107,0,0.1)" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", textAlign: "left" }}>
            {[
              "✅ All 60 basketball drills (5 categories)",
              "✅ XP system + level progression",
              "✅ Daily streak tracking",
              "✅ Basketball trivia with XP rewards",
              "✅ Full leaderboard access",
              "✅ All achievement badges",
              "✅ New drills added monthly",
              "✅ Cancel anytime — no contracts",
            ].map((item) => (
              <li key={item} style={{ padding: "12px 0", borderBottom: "1px solid #1a1a1a", fontSize: "15px", color: "#ccc" }}>{item}</li>
            ))}
          </ul>

          {userId ? (
            <button
              onClick={handleSubscribe}
              disabled={loading}
              style={{ width: "100%", background: loading ? "#333" : "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", border: "none", borderRadius: "12px", padding: "18px", fontSize: "18px", fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : "0 0 30px rgba(255,107,0,0.4)" }}
            >
              {loading ? "Redirecting to checkout..." : "START FOR $7/MONTH →"}
            </button>
          ) : (
            <Link href="/signup" style={{ display: "block", background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "18px", borderRadius: "12px", fontSize: "18px", fontWeight: 800, boxShadow: "0 0 30px rgba(255,107,0,0.4)" }}>
              CREATE ACCOUNT FIRST →
            </Link>
          )}
        </div>
        <p style={{ color: "#444", fontSize: "13px" }}>Powered by Stripe. Your card info is never stored on our servers.</p>
      </div>
    </div>
  );
}
