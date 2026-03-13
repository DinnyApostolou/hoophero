"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.refresh();
      window.location.href = "/dashboard";
    }
  }

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "system-ui, sans-serif" }}>
      {/* Nav */}
      <nav style={{ padding: "20px 40px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <span style={{ fontSize: "24px" }}>🏀</span>
          <span style={{ fontSize: "20px", fontWeight: 900, background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            HOOPHERO
          </span>
        </Link>
      </nav>

      {/* Form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: "20px", padding: "48px 40px", width: "100%", maxWidth: "420px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 900, marginBottom: "8px", color: "#fff" }}>Welcome back</h1>
          <p style={{ color: "#666", marginBottom: "32px", fontSize: "15px" }}>Log in to continue your grind 🔥</p>

          {error && (
            <div style={{ background: "rgba(255,50,50,0.1)", border: "1px solid rgba(255,50,50,0.3)", borderRadius: "8px", padding: "12px 16px", marginBottom: "20px", color: "#ff5555", fontSize: "14px" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", color: "#888", marginBottom: "6px", fontWeight: 600, letterSpacing: "0.5px" }}>EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{ width: "100%", background: "#1a1a1a", border: "1px solid #333", borderRadius: "10px", padding: "14px 16px", color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", color: "#888", marginBottom: "6px", fontWeight: 600, letterSpacing: "0.5px" }}>PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: "100%", background: "#1a1a1a", border: "1px solid #333", borderRadius: "10px", padding: "14px 16px", color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ background: loading ? "#333" : "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", border: "none", borderRadius: "10px", padding: "16px", fontSize: "16px", fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", marginTop: "8px", boxShadow: loading ? "none" : "0 0 20px rgba(255,107,0,0.4)" }}
            >
              {loading ? "Logging in..." : "LOG IN →"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "16px", color: "#555", fontSize: "13px" }}>
            <button
              type="button"
              onClick={async () => {
                if (!email) { setError("Enter your email above first."); return; }
                const supabase = createClient();
                const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                  redirectTo: `${window.location.origin}/reset-password`,
                });
                if (resetError) { setError(resetError.message); }
                else { setError(""); alert("Password reset email sent! Check your inbox."); }
              }}
              style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: "13px", textDecoration: "underline" }}
            >
              Forgot password?
            </button>
          </p>
          <p style={{ textAlign: "center", marginTop: "12px", color: "#555", fontSize: "14px" }}>
            No account?{" "}
            <Link href="/signup" style={{ color: "#FF6B00", fontWeight: 700, textDecoration: "none" }}>
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
