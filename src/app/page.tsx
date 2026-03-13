"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      {/* Nav */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "28px" }}>🏀</span>
          <span style={{ fontSize: "22px", fontWeight: 900, background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            HOOPHERO
          </span>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <Link href="/login" style={{ color: "#aaa", textDecoration: "none", padding: "10px 20px", borderRadius: "8px", border: "1px solid #333", fontSize: "14px", fontWeight: 600 }}>
            Log In
          </Link>
          <Link href="/signup" style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "10px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: 700 }}>
            Start Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: "center", padding: "100px 40px 60px", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "inline-block", background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.3)", borderRadius: "20px", padding: "6px 16px", marginBottom: "24px", fontSize: "13px", color: "#FF6B00", fontWeight: 600, letterSpacing: "1px" }}>
          🔥 TRAIN LIKE A PRO
        </div>
        <h1 style={{ fontSize: "clamp(48px, 8vw, 84px)", fontWeight: 900, lineHeight: 1.05, margin: "0 0 24px", letterSpacing: "-2px" }}>
          LEVEL UP YOUR
          <br />
          <span style={{ background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            BASKETBALL GAME
          </span>
        </h1>
        <p style={{ fontSize: "20px", color: "#888", lineHeight: 1.6, marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px" }}>
          Complete daily drills, earn XP, unlock achievements, and climb the leaderboard. The #1 training app for serious hoopers aged 14–18.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/signup" style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "16px 40px", borderRadius: "12px", fontSize: "18px", fontWeight: 800, display: "inline-block", boxShadow: "0 0 30px rgba(255,107,0,0.4)" }}>
            START TRAINING FREE →
          </Link>
          <Link href="/drills" style={{ background: "transparent", color: "#fff", textDecoration: "none", padding: "16px 40px", borderRadius: "12px", fontSize: "18px", fontWeight: 700, display: "inline-block", border: "2px solid #333" }}>
            See Drills
          </Link>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ display: "flex", justifyContent: "center", gap: "60px", padding: "60px 40px", flexWrap: "wrap" }}>
        {[
          { num: "10+", label: "Drills Available" },
          { num: "50 XP", label: "Per Drill Completed" },
          { num: "🔥", label: "Daily Streak System" },
          { num: "#1", label: "Climb the Leaderboard" },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "36px", fontWeight: 900, color: "#FF6B00" }}>{s.num}</div>
            <div style={{ fontSize: "13px", color: "#666", marginTop: "4px", letterSpacing: "0.5px" }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section style={{ padding: "60px 40px", maxWidth: "1100px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "36px", fontWeight: 900, marginBottom: "50px", letterSpacing: "-1px" }}>
          BUILT DIFFERENT
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {[
            { icon: "🏀", title: "Daily Drills", desc: "New drills every day covering dribbling, shooting, footwork, and defense. Short, intense, effective." },
            { icon: "⚡", title: "XP & Leveling", desc: "Earn 50 XP every drill you complete. Level up from Rookie all the way to Legend." },
            { icon: "🔥", title: "Streak System", desc: "Train every day to build your streak. Lose a day, lose your streak. Stay consistent." },
            { icon: "🏆", title: "Leaderboard", desc: "See where you rank against other hoopers. Top 3 players get featured every week." },
            { icon: "🎯", title: "Skill Badges", desc: "Complete specific drill sets to unlock badges like Crossover King, Sharpshooter, and more." },
            { icon: "📈", title: "Progress Tracking", desc: "See how your XP grows week over week. Watch yourself actually improve." },
          ].map((f) => (
            <div key={f.title} style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "28px", transition: "all 0.2s" }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>{f.icon}</div>
              <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "8px", color: "#fff" }}>{f.title}</h3>
              <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: "80px 40px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px", fontWeight: 900, marginBottom: "12px", letterSpacing: "-1px" }}>ONE PLAN. ALL ACCESS.</h2>
        <p style={{ color: "#666", marginBottom: "40px" }}>Everything included. No tricks, no upsells.</p>
        <div style={{ background: "#111", border: "2px solid #FF6B00", borderRadius: "20px", padding: "40px", boxShadow: "0 0 40px rgba(255,107,0,0.2)" }}>
          <div style={{ fontSize: "56px", fontWeight: 900, color: "#FF6B00" }}>$7</div>
          <div style={{ fontSize: "18px", color: "#666", marginBottom: "32px" }}>per month • cancel anytime</div>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", textAlign: "left" }}>
            {["✅ All 10+ basketball drills", "✅ Daily XP & streak tracking", "✅ Full leaderboard access", "✅ All achievement badges", "✅ New drills added monthly", "✅ Cancel anytime, no contracts"].map((item) => (
              <li key={item} style={{ padding: "10px 0", borderBottom: "1px solid #1a1a1a", fontSize: "15px", color: "#ccc" }}>{item}</li>
            ))}
          </ul>
          <Link href="/signup" style={{ display: "block", background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "18px", borderRadius: "12px", fontSize: "18px", fontWeight: 800, boxShadow: "0 0 30px rgba(255,107,0,0.4)" }}>
            START YOUR FREE TRIAL →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: "center", padding: "80px 40px", background: "linear-gradient(180deg, #0A0A0A 0%, #111 50%, #0A0A0A 100%)" }}>
        <h2 style={{ fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 900, marginBottom: "20px", letterSpacing: "-2px" }}>
          READY TO BECOME A{" "}
          <span style={{ background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            HERO?
          </span>
        </h2>
        <p style={{ color: "#666", fontSize: "18px", marginBottom: "32px" }}>Join thousands of young hoopers leveling up their game.</p>
        <Link href="/signup" style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "18px 48px", borderRadius: "12px", fontSize: "20px", fontWeight: 800, display: "inline-block", boxShadow: "0 0 40px rgba(255,107,0,0.5)" }}>
          CREATE FREE ACCOUNT →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1a1a1a", padding: "30px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>🏀</span>
          <span style={{ fontWeight: 800, color: "#FF6B00" }}>HOOPHERO</span>
        </div>
        <p style={{ color: "#444", fontSize: "13px", margin: 0 }}>© 2026 HoopHero. All rights reserved.</p>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link href="/login" style={{ color: "#555", textDecoration: "none", fontSize: "13px" }}>Log In</Link>
          <Link href="/signup" style={{ color: "#555", textDecoration: "none", fontSize: "13px" }}>Sign Up</Link>
        </div>
      </footer>
    </div>
  );
}
