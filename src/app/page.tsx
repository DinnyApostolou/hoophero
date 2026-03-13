"use client";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    q: "Is there really a free trial?",
    a: "Yes — sign up and get instant access to the first 5 drills completely free. No credit card required to start.",
  },
  {
    q: "What age is HoopHero for?",
    a: "HoopHero is built for serious hoopers aged 12–22. The drills, meal plans, and training programs are all designed for developing athletes.",
  },
  {
    q: "What do I get with the $7/month plan?",
    a: "Full access to all 60 drills, 40+ meals, strength training plans, weekly schedules, skill assessments, player stats, badges, streaks, and the leaderboard.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. No contracts, no lock-ins. Cancel whenever you want — takes 10 seconds.",
  },
  {
    q: "Do I need any equipment?",
    a: "Most drills just need a ball and some space. A few conditioning drills use a jump rope or cones, but those are optional.",
  },
];

const testimonials = [
  {
    name: "Jordan M.",
    age: "16",
    text: "I went from getting cut from JV to starting varsity in one season. The drills are hard but they actually work. My handles are on another level now.",
    avatar: "🏀",
    rating: 5,
  },
  {
    name: "Darius K.",
    age: "15",
    text: "The streak system is addictive bro. I haven't missed a day in 23 days. My coach noticed how much sharper I am. This app is built different.",
    avatar: "⚡",
    rating: 5,
  },
  {
    name: "Aaliyah T.",
    age: "17",
    text: "I use the meal planner and strength trainer every week. I'm faster, stronger, and my shot is way more consistent. $7 a month is a steal.",
    avatar: "🔥",
    rating: 5,
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, -apple-system, sans-serif", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", borderBottom: "1px solid #1a1a1a", position: "sticky", top: 0, background: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "28px" }}>🏀</span>
          <span style={{ fontSize: "22px", fontWeight: 900, background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.5px" }}>
            HOOPHERO
          </span>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Link href="/login" style={{ color: "#aaa", textDecoration: "none", padding: "10px 20px", borderRadius: "8px", border: "1px solid #2a2a2a", fontSize: "14px", fontWeight: 600, transition: "all 0.2s" }}>
            Login
          </Link>
          <Link href="/signup" style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "10px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: 800, boxShadow: "0 0 20px rgba(255,107,0,0.35)" }}>
            Start Free Trial
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ textAlign: "center", padding: "100px 40px 80px", maxWidth: "1000px", margin: "0 auto", position: "relative" }}>
        {/* Glow blob */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -60%)", width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(255,107,0,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ display: "inline-block", background: "rgba(255,107,0,0.12)", border: "1px solid rgba(255,107,0,0.35)", borderRadius: "20px", padding: "6px 18px", marginBottom: "28px", fontSize: "13px", color: "#FF6B00", fontWeight: 700, letterSpacing: "1px" }}>
          🔥 GAMIFIED BASKETBALL TRAINING
        </div>
        <h1 style={{ fontSize: "clamp(52px, 9vw, 96px)", fontWeight: 900, lineHeight: 1.0, margin: "0 0 28px", letterSpacing: "-3px" }}>
          BECOME A{" "}
          <span style={{ background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            HOOPHERO
          </span>
        </h1>
        <p style={{ fontSize: "clamp(16px, 2.5vw, 22px)", color: "#777", lineHeight: 1.6, marginBottom: "44px", maxWidth: "640px", margin: "0 auto 44px" }}>
          Level up your game with 60 elite drills, XP rewards, daily streaks, and meal plans — all gamified so training feels like a game you can&apos;t stop playing.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/signup" style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "18px 44px", borderRadius: "14px", fontSize: "18px", fontWeight: 900, display: "inline-block", boxShadow: "0 0 40px rgba(255,107,0,0.45)", letterSpacing: "0.3px" }}>
            START FREE TRIAL →
          </Link>
          <a href="#how-it-works" style={{ background: "transparent", color: "#fff", textDecoration: "none", padding: "18px 44px", borderRadius: "14px", fontSize: "18px", fontWeight: 700, display: "inline-block", border: "2px solid #2a2a2a" }}>
            See How It Works
          </a>
        </div>
        <p style={{ color: "#444", fontSize: "13px", marginTop: "18px" }}>No credit card required — first 5 drills free forever</p>
      </section>

      {/* STATS BAR */}
      <section style={{ borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", padding: "40px 40px" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(32px, 6vw, 80px)", flexWrap: "wrap", maxWidth: "900px", margin: "0 auto" }}>
          {[
            { num: "60+", label: "Elite Drills" },
            { num: "40+", label: "Meal Plans" },
            { num: "8", label: "Core Features" },
            { num: "$7", label: "Per Month" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, color: "#FF6B00", letterSpacing: "-1px" }}>{s.num}</div>
              <div style={{ fontSize: "13px", color: "#555", marginTop: "4px", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES GRID */}
      <section style={{ padding: "100px 40px", maxWidth: "1140px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ color: "#FF6B00", fontSize: "13px", fontWeight: 700, letterSpacing: "2px", marginBottom: "12px", textTransform: "uppercase" }}>Everything You Need</p>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, margin: 0, letterSpacing: "-2px" }}>
            8 FEATURES. ONE PLATFORM.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
          {[
            { icon: "🏀", title: "Drills Library", desc: "60 elite drills across dribbling, shooting, footwork, defense, and conditioning. Earn 50 XP each.", color: "#FF6B00" },
            { icon: "💪", title: "Strength Trainer", desc: "Basketball-specific lifting programs designed for explosive speed, vertical leap, and injury prevention.", color: "#3B82F6" },
            { icon: "🥗", title: "Meal Planner", desc: "40+ pre-game, post-game, and recovery meals built for teenage athletes who want to fuel right.", color: "#10B981" },
            { icon: "📅", title: "Weekly Schedule", desc: "A full structured 7-day training calendar that balances drills, strength, rest, and nutrition.", color: "#FFD700" },
            { icon: "🎯", title: "Skill Assessment", desc: "Answer 10 questions and get a personalized training plan built around your weaknesses.", color: "#FF6B00" },
            { icon: "📊", title: "Player Stats", desc: "Track your XP growth, drills completed, and skill ratings. Watch yourself improve in real time.", color: "#8B5CF6" },
            { icon: "🏅", title: "Badges", desc: "Unlock 20+ rare achievements like Sharpshooter, Crossover King, and Iron Man for training milestones.", color: "#FFD700" },
            { icon: "🔥", title: "Daily Streaks", desc: "Train every day to build your streak. The longer it goes, the more addicted you get. Don't break it.", color: "#EF4444" },
          ].map((f) => (
            <div key={f.title} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "20px", padding: "32px 28px", transition: "all 0.2s", cursor: "default" }}>
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>{f.icon}</div>
              <div style={{ width: "36px", height: "3px", background: f.color, borderRadius: "2px", marginBottom: "16px" }} />
              <h3 style={{ fontSize: "17px", fontWeight: 800, marginBottom: "10px", color: "#fff", margin: "0 0 10px" }}>{f.title}</h3>
              <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "100px 40px", background: "linear-gradient(180deg, #0A0A0A 0%, #0d0d0d 50%, #0A0A0A 100%)", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#FF6B00", fontSize: "13px", fontWeight: 700, letterSpacing: "2px", marginBottom: "12px", textTransform: "uppercase" }}>Simple to Start</p>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, margin: "0 0 64px", letterSpacing: "-2px" }}>HOW IT WORKS</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {[
              { step: "01", title: "Create Your Account", desc: "Sign up in 30 seconds — no credit card needed. Get instant free access to 5 drills to try the platform.", icon: "🚀" },
              { step: "02", title: "Take the Skill Assessment", desc: "Answer 10 quick questions about your game. We build you a personalized training plan based on your weaknesses.", icon: "🎯" },
              { step: "03", title: "Start Training & Earning XP", desc: "Complete drills, earn XP, build your streak, unlock badges, and climb the leaderboard. Watch your game transform.", icon: "🏀" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "28px", alignItems: "flex-start", textAlign: "left", background: "#111", border: "1px solid #1e1e1e", borderRadius: "20px", padding: "32px" }}>
                <div style={{ flexShrink: 0, width: "56px", height: "56px", borderRadius: "50%", background: "linear-gradient(135deg, #FF6B00, #FF9500)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#FF6B00", fontWeight: 700, letterSpacing: "2px", marginBottom: "6px" }}>STEP {item.step}</div>
                  <h3 style={{ fontSize: "20px", fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>{item.title}</h3>
                  <p style={{ fontSize: "15px", color: "#555", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APP PREVIEW */}
      <section style={{ padding: "100px 40px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ color: "#FF6B00", fontSize: "13px", fontWeight: 700, letterSpacing: "2px", marginBottom: "12px", textTransform: "uppercase" }}>Inside the App</p>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, margin: 0, letterSpacing: "-2px" }}>YOUR DASHBOARD</h2>
        </div>
        {/* Fake dashboard mockup */}
        <div style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: "24px", padding: "32px", boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 60px rgba(255,107,0,0.07)", maxWidth: "760px", margin: "0 auto" }}>
          {/* Dashboard nav bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", paddingBottom: "20px", borderBottom: "1px solid #1e1e1e" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "20px" }}>🏀</span>
              <span style={{ fontSize: "16px", fontWeight: 900, background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>HOOPHERO</span>
            </div>
            <div style={{ display: "flex", gap: "16px" }}>
              {["Drills", "Strength", "Nutrition", "Badges"].map(l => (
                <span key={l} style={{ fontSize: "12px", color: "#444", fontWeight: 600 }}>{l}</span>
              ))}
            </div>
          </div>
          {/* Welcome */}
          <div style={{ marginBottom: "28px" }}>
            <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#fff", margin: "0 0 4px" }}>Welcome back, Jordan 👋</h3>
            <p style={{ color: "#444", margin: 0, fontSize: "13px" }}>Ready to level up today?</p>
          </div>
          {/* Streak banner */}
          <div style={{ background: "linear-gradient(135deg, #1a0a00, #110800)", border: "1px solid rgba(255,107,0,0.3)", borderRadius: "16px", padding: "20px 24px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontSize: "44px" }}>🔥</span>
              <div>
                <div style={{ fontSize: "36px", fontWeight: 900, color: "#FF6B00", lineHeight: 1 }}>14</div>
                <div style={{ fontSize: "12px", color: "#555" }}>day streak</div>
              </div>
              <div style={{ borderLeft: "1px solid #1e1e1e", paddingLeft: "16px" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#FFD700" }}>Two weeks? You&apos;re seriously elite.</div>
                <div style={{ fontSize: "11px", color: "#444", marginTop: "4px" }}>Next goal: 30 days 🎯</div>
              </div>
            </div>
            <div style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", padding: "10px 18px", borderRadius: "10px", fontSize: "12px", fontWeight: 800, whiteSpace: "nowrap" }}>KEEP STREAK →</div>
          </div>
          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "24px" }}>
            <div style={{ background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: "14px", padding: "18px" }}>
              <div style={{ fontSize: "11px", color: "#444", letterSpacing: "1px", marginBottom: "6px" }}>TOTAL XP</div>
              <div style={{ fontSize: "28px", fontWeight: 900, color: "#FF6B00" }}>1,850</div>
            </div>
            <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,215,0,0.2)", borderRadius: "14px", padding: "18px" }}>
              <div style={{ fontSize: "11px", color: "#444", letterSpacing: "1px", marginBottom: "6px" }}>LEVEL</div>
              <div style={{ fontSize: "28px", fontWeight: 900, color: "#FFD700" }}>Elite</div>
            </div>
            <div style={{ background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: "14px", padding: "18px" }}>
              <div style={{ fontSize: "11px", color: "#444", letterSpacing: "1px", marginBottom: "6px" }}>DRILLS DONE</div>
              <div style={{ fontSize: "28px", fontWeight: 900, color: "#10B981" }}>37</div>
            </div>
          </div>
          {/* XP progress bar */}
          <div style={{ background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: "12px", padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", color: "#555" }}>Progress to Legend</span>
              <span style={{ fontSize: "12px", color: "#FF6B00", fontWeight: 700 }}>85%</span>
            </div>
            <div style={{ background: "#1a1a1a", borderRadius: "6px", height: "10px", overflow: "hidden" }}>
              <div style={{ width: "85%", height: "100%", background: "linear-gradient(90deg, #FF6B00, #FFD700)", borderRadius: "6px" }} />
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / TESTIMONIALS */}
      <section style={{ padding: "100px 40px", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ color: "#FF6B00", fontSize: "13px", fontWeight: 700, letterSpacing: "2px", marginBottom: "12px", textTransform: "uppercase" }}>Real Results</p>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, margin: 0, letterSpacing: "-2px" }}>HOOPERS DON&apos;T LIE</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {testimonials.map((t) => (
              <div key={t.name} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "20px", padding: "32px" }}>
                <div style={{ display: "flex", color: "#FF6B00", marginBottom: "20px", gap: "4px" }}>
                  {"★★★★★".split("").map((s, i) => <span key={i} style={{ fontSize: "16px" }}>{s}</span>)}
                </div>
                <p style={{ fontSize: "15px", color: "#bbb", lineHeight: 1.7, margin: "0 0 24px", fontStyle: "italic" }}>&ldquo;{t.text}&rdquo;</p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg, #1a1a1a, #222)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", border: "2px solid #2a2a2a" }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 800, color: "#fff" }}>{t.name}</div>
                    <div style={{ fontSize: "12px", color: "#555" }}>Age {t.age} • HoopHero member</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: "100px 40px", maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ color: "#FF6B00", fontSize: "13px", fontWeight: 700, letterSpacing: "2px", marginBottom: "12px", textTransform: "uppercase" }}>Simple Pricing</p>
        <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, margin: "0 0 12px", letterSpacing: "-2px" }}>START FREE. GO PRO.</h2>
        <p style={{ color: "#555", marginBottom: "48px", fontSize: "16px" }}>Try 5 drills free. Upgrade anytime for full access.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "32px" }}>
          {/* Free tier */}
          <div style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: "20px", padding: "32px 28px", textAlign: "left" }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "#555", letterSpacing: "1px", marginBottom: "8px" }}>FREE TRIAL</div>
            <div style={{ fontSize: "40px", fontWeight: 900, color: "#fff", marginBottom: "4px" }}>$0</div>
            <div style={{ fontSize: "13px", color: "#444", marginBottom: "24px" }}>forever</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 0", display: "flex", flexDirection: "column", gap: "10px" }}>
              {["✅ 5 drills free", "✅ XP tracking", "✅ Streak system", "❌ Full drills library", "❌ Meal planner", "❌ Leaderboard"].map(item => (
                <li key={item} style={{ fontSize: "13px", color: item.startsWith("❌") ? "#333" : "#888" }}>{item}</li>
              ))}
            </ul>
          </div>
          {/* Pro tier */}
          <div style={{ background: "linear-gradient(145deg, #1a0800, #111)", border: "2px solid #FF6B00", borderRadius: "20px", padding: "32px 28px", textAlign: "left", boxShadow: "0 0 50px rgba(255,107,0,0.15)", position: "relative" }}>
            <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", fontSize: "11px", fontWeight: 800, padding: "4px 14px", borderRadius: "20px", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>MOST POPULAR</div>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "#FF6B00", letterSpacing: "1px", marginBottom: "8px" }}>PRO ACCESS</div>
            <div style={{ fontSize: "40px", fontWeight: 900, color: "#FF6B00", marginBottom: "4px" }}>$7</div>
            <div style={{ fontSize: "13px", color: "#555", marginBottom: "24px" }}>per month • cancel anytime</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 0", display: "flex", flexDirection: "column", gap: "10px" }}>
              {["✅ All 60 drills", "✅ 40+ meal plans", "✅ Strength training", "✅ Weekly schedule", "✅ Badges & leaderboard", "✅ New content monthly"].map(item => (
                <li key={item} style={{ fontSize: "13px", color: "#ccc" }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <Link href="/signup" style={{ display: "block", background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "20px", borderRadius: "14px", fontSize: "20px", fontWeight: 900, boxShadow: "0 0 40px rgba(255,107,0,0.4)", letterSpacing: "0.3px" }}>
          START YOUR FREE TRIAL NOW →
        </Link>
        <p style={{ color: "#333", fontSize: "13px", marginTop: "16px" }}>No credit card required. Cancel anytime.</p>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 40px", maxWidth: "720px", margin: "0 auto", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ color: "#FF6B00", fontSize: "13px", fontWeight: 700, letterSpacing: "2px", marginBottom: "12px", textTransform: "uppercase" }}>Got Questions?</p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, margin: 0, letterSpacing: "-2px" }}>FAQ</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "14px", overflow: "hidden" }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: "100%", background: "transparent", border: "none", padding: "20px 24px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", textAlign: "left" }}
              >
                <span style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>{faq.q}</span>
                <span style={{ color: "#FF6B00", fontSize: "18px", flexShrink: 0, fontWeight: 700 }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 24px 20px" }}>
                  <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ textAlign: "center", padding: "100px 40px", background: "linear-gradient(180deg, #0A0A0A 0%, #0f0800 50%, #0A0A0A 100%)", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ position: "relative", display: "inline-block", marginBottom: "24px" }}>
          <div style={{ position: "absolute", inset: "-40px", background: "radial-gradient(ellipse, rgba(255,107,0,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
          <span style={{ fontSize: "64px" }}>🏀</span>
        </div>
        <h2 style={{ fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 900, margin: "0 0 20px", letterSpacing: "-3px" }}>
          READY TO BECOME A{" "}
          <span style={{ background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            HERO?
          </span>
        </h2>
        <p style={{ color: "#555", fontSize: "18px", marginBottom: "40px", maxWidth: "500px", margin: "0 auto 40px" }}>
          Join thousands of young hoopers who are leveling up their game every single day.
        </p>
        <Link href="/signup" style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "20px 56px", borderRadius: "14px", fontSize: "22px", fontWeight: 900, display: "inline-block", boxShadow: "0 0 60px rgba(255,107,0,0.5)", letterSpacing: "0.3px" }}>
          CREATE FREE ACCOUNT →
        </Link>
        <p style={{ color: "#333", fontSize: "13px", marginTop: "20px" }}>No credit card • 5 free drills • Cancel anytime</p>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1a1a1a", padding: "40px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "22px" }}>🏀</span>
            <span style={{ fontSize: "18px", fontWeight: 900, background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>HOOPHERO</span>
          </div>
          <p style={{ color: "#333", fontSize: "13px", margin: 0 }}>© 2026 HoopHero. Built for hoopers who want to be great.</p>
          <div style={{ display: "flex", gap: "24px" }}>
            <Link href="/login" style={{ color: "#444", textDecoration: "none", fontSize: "13px" }}>Login</Link>
            <Link href="/signup" style={{ color: "#444", textDecoration: "none", fontSize: "13px" }}>Sign Up</Link>
            <Link href="/drills" style={{ color: "#444", textDecoration: "none", fontSize: "13px" }}>Drills</Link>
            <Link href="/subscribe" style={{ color: "#FF6B00", textDecoration: "none", fontSize: "13px", fontWeight: 700 }}>Subscribe</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
