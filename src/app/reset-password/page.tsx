"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase puts the session in the URL hash after clicking reset link
    const supabase = createClient();
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });
    // Also check if already has session from hash
    setReady(true);
  }, []);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords don't match."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError(updateError.message);
      setLoading(false);
    } else {
      setDone(true);
    }
  }

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "system-ui, sans-serif" }}>
      <nav style={{ padding: "20px 40px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <span style={{ fontSize: "24px" }}>🏀</span>
          <span style={{ fontSize: "20px", fontWeight: 900, background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            HOOPHERO
          </span>
        </Link>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: "20px", padding: "48px 40px", width: "100%", maxWidth: "420px" }}>
          {done ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
              <h1 style={{ fontSize: "28px", fontWeight: 900, color: "#fff", marginBottom: "12px" }}>Password updated!</h1>
              <p style={{ color: "#666", marginBottom: "32px" }}>You can now log in with your new password.</p>
              <a href="/login" style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "14px 32px", borderRadius: "10px", fontSize: "16px", fontWeight: 800, display: "inline-block" }}>
                Go to Login →
              </a>
            </div>
          ) : (
            <>
              <h1 style={{ fontSize: "32px", fontWeight: 900, marginBottom: "8px", color: "#fff" }}>New password</h1>
              <p style={{ color: "#666", marginBottom: "32px", fontSize: "15px" }}>Enter your new password below</p>

              {error && (
                <div style={{ background: "rgba(255,50,50,0.1)", border: "1px solid rgba(255,50,50,0.3)", borderRadius: "8px", padding: "12px 16px", marginBottom: "20px", color: "#ff5555", fontSize: "14px" }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleReset} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#888", marginBottom: "6px", fontWeight: 600, letterSpacing: "0.5px" }}>NEW PASSWORD</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    style={{ width: "100%", background: "#1a1a1a", border: "1px solid #333", borderRadius: "10px", padding: "14px 16px", color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#888", marginBottom: "6px", fontWeight: 600, letterSpacing: "0.5px" }}>CONFIRM PASSWORD</label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    required
                    style={{ width: "100%", background: "#1a1a1a", border: "1px solid #333", borderRadius: "10px", padding: "14px 16px", color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{ background: loading ? "#333" : "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", border: "none", borderRadius: "10px", padding: "16px", fontSize: "16px", fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", marginTop: "8px" }}
                >
                  {loading ? "Updating..." : "SET NEW PASSWORD →"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
