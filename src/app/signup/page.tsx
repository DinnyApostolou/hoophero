"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      // Try to redirect immediately (works if email confirmation is disabled)
      setTimeout(() => router.push("/dashboard"), 2000);
    }
  }

  if (success) {
    return (
      <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>🏀</div>
          <h1 style={{ fontSize: "32px", fontWeight: 900, color: "#fff", marginBottom: "12px" }}>You&apos;re in!</h1>
          <p style={{ color: "#888", fontSize: "16px", marginBottom: "8px" }}>Check your email to confirm your account.</p>
          <p style={{ color: "#FF6B00", fontSize: "14px" }}>Redirecting you to your dashboard...</p>
        </div>
      </div>
    );
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
          <div style={{ display: "inline-block", background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.3)", borderRadius: "20px", padding: "4px 12px", marginBottom: "16px", fontSize: "12px", color: "#FF6B00", fontWeight: 700 }}>
            FREE TRIAL
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: 900, marginBottom: "8px", color: "#fff" }}>Create your account</h1>
          <p style={{ color: "#666", marginBottom: "32px", fontSize: "15px" }}>Start training. Start winning. 🏆</p>

          {error && (
            <div style={{ background: "rgba(255,50,50,0.1)", border: "1px solid rgba(255,50,50,0.3)", borderRadius: "8px", padding: "12px 16px", marginBottom: "20px", color: "#ff5555", fontSize: "14px" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", color: "#888", marginBottom: "6px", fontWeight: 600, letterSpacing: "0.5px" }}>YOUR NAME</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jordan Smith"
                required
                style={{ width: "100%", background: "#1a1a1a", border: "1px solid #333", borderRadius: "10px", padding: "14px 16px", color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
              />
            </div>
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
                placeholder="Min. 6 characters"
                required
                minLength={6}
                style={{ width: "100%", background: "#1a1a1a", border: "1px solid #333", borderRadius: "10px", padding: "14px 16px", color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ background: loading ? "#333" : "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", border: "none", borderRadius: "10px", padding: "16px", fontSize: "16px", fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", marginTop: "8px", boxShadow: loading ? "none" : "0 0 20px rgba(255,107,0,0.4)" }}
            >
              {loading ? "Creating account..." : "CREATE ACCOUNT →"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "16px", color: "#444", fontSize: "12px", lineHeight: 1.5 }}>
            By signing up you agree to our terms. $7/month after trial.
          </p>
          <p style={{ textAlign: "center", marginTop: "12px", color: "#555", fontSize: "14px" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#FF6B00", fontWeight: 700, textDecoration: "none" }}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
