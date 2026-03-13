"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

const benefits = [
  { icon: "🏀", title: "60+ Basketball Drills", desc: "Ball handling, shooting, footwork, defense, conditioning — every skill you need to level up" },
  { icon: "💪", title: "Full Strength Training Program", desc: "Exercises built specifically for basketball players to jump higher, run faster, and dominate" },
  { icon: "🥗", title: "40+ Athlete Meal Plans", desc: "Pre-game, post-game, breakfast & snacks designed to fuel peak performance on the court" },
  { icon: "📅", title: "Complete Weekly Schedule", desc: "A full 7-day training plan combining basketball, strength work, and recovery — done for you" },
  { icon: "🔥", title: "Duolingo-Style Daily Streaks", desc: "Build habits that stick. Track your streak, hit milestones, and earn XP every single day" },
  { icon: "⚡", title: "XP & Level System", desc: "Earn XP for every drill completed. Level up from Rookie → Baller → All-Star → Elite → Legend" },
  { icon: "🏆", title: "Global Leaderboard", desc: "Compete with hoopers worldwide. See your rank and grind to the top" },
  { icon: "🎯", title: "Video Tutorials for Every Drill", desc: "Every drill has a YouTube tutorial so you always know exactly what to do" },
  { icon: "📈", title: "Progress Tracking", desc: "Watch your drills completed and XP grow over time. See how far you've come" },
  { icon: "🆕", title: "New Content Added Monthly", desc: "New drills, meal ideas, and training programs drop every month — always fresh" },
  { icon: "🎖️", title: "Achievement Badges", desc: "Unlock badges for streaks, milestones, and completing drill categories" },
  { icon: "❌", title: "Cancel Anytime", desc: "No contracts, no commitments. Cancel in 10 seconds if you want. But you won't want to." },
];

const testimonials = [
  { name: "Marcus T.", age: 16, quote: "My handles are way cleaner after 2 weeks. The drills actually work.", stars: 5 },
  { name: "Jaylen R.", age: 14, quote: "The meal planner is insane. My energy during games is way better now.", stars: 5 },
  { name: "Aaliyah K.", age: 17, quote: "Finally an app made for young hoopers. Worth every dollar.", stars: 5 },
];

const faqs = [
  { q: "Am I locked into a contract?", a: "No. Cancel anytime in one click. No hidden fees, no tricks." },
  { q: "Is this for beginners or advanced players?", a: "Both. The drills range from fundamentals to advanced. Start where you are and level up." },
  { q: "How do I access all the features?", a: "After subscribing, everything unlocks instantly — drills, strength trainer, meal planner, schedule, leaderboard. All of it." },
  { q: "Can my parents pay for it?", a: "Yes! Just use the subscribe button and enter their card at checkout. Stripe handles it securely." },
  { q: "Will new content be added?", a: "Yes — new drills, workouts, and meal plans are added every month." },
];

export default function SubscribePage() {
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const SubscribeButton = () => (
    userId ? (
      <button
        onClick={handleSubscribe}
        disabled={loading}
        style={{ width: "100%", background: loading ? "#333" : "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", border: "none", borderRadius: "14px", padding: "20px", fontSize: "20px", fontWeight: 900, cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : "0 0 40px rgba(255,107,0,0.5)", letterSpacing: "0.5px" }}
      >
        {loading ? "Redirecting to checkout..." : "🏀 START FOR $7/MONTH →"}
      </button>
    ) : (
      <Link href="/signup" style={{ display: "block", background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "20px", borderRadius: "14px", fontSize: "20px", fontWeight: 900, textAlign: "center", boxShadow: "0 0 40px rgba(255,107,0,0.5)" }}>
        🏀 CREATE ACCOUNT TO START →
      </Link>
    )
  );

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", borderBottom: "1px solid #1a1a1a" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <span style={{ fontSize: "24px" }}>🏀</span>
          <span style={{ fontSize: "20px", fontWeight: 900, background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>HOOPHERO</span>
        </Link>
        <Link href="/dashboard" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px" }}>Back to Dashboard</Link>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "80px 24px 60px", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ display: "inline-block", background: "rgba(255,107,0,0.15)", border: "1px solid rgba(255,107,0,0.4)", borderRadius: "20px", padding: "6px 18px", marginBottom: "28px", fontSize: "13px", color: "#FF6B00", fontWeight: 700, letterSpacing: "2px" }}>
          🔥 THE #1 APP FOR YOUNG HOOPERS
        </div>
        <h1 style={{ fontSize: "60px", fontWeight: 900, color: "#fff", margin: "0 0 20px", letterSpacing: "-2px", lineHeight: 1.1 }}>
          Train Like a Pro.<br />
          <span style={{ background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Play Like a Pro.</span>
        </h1>
        <p style={{ color: "#888", fontSize: "20px", marginBottom: "16px", lineHeight: 1.6 }}>
          Everything a young basketball player needs — drills, strength training, nutrition, and scheduling — in one app. Built by hoopers, for hoopers.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "48px", flexWrap: "wrap" }}>
          {["60+ Drills", "Strength Plans", "40+ Meals", "Daily Streaks"].map(tag => (
            <div key={tag} style={{ color: "#FF6B00", fontSize: "14px", fontWeight: 700 }}>✓ {tag}</div>
          ))}
        </div>

        {/* Price card */}
        <div style={{ background: "linear-gradient(135deg, #111 0%, #150a00 100%)", border: "2px solid rgba(255,107,0,0.5)", borderRadius: "24px", padding: "48px 40px", marginBottom: "20px", boxShadow: "0 0 60px rgba(255,107,0,0.15)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, background: "linear-gradient(135deg, #FF6B00, #FF9500)", padding: "8px 20px", borderRadius: "0 24px 0 16px", fontSize: "12px", fontWeight: 800, color: "#fff", letterSpacing: "1px" }}>
            MOST POPULAR
          </div>
          <div style={{ marginBottom: "8px", fontSize: "14px", color: "#FF6B00", fontWeight: 700, letterSpacing: "1px" }}>HOOPHERO PRO</div>
          <div style={{ fontSize: "72px", fontWeight: 900, color: "#fff", letterSpacing: "-3px", lineHeight: 1 }}>
            $7<span style={{ fontSize: "28px", color: "#666", fontWeight: 400 }}>/mo</span>
          </div>
          <div style={{ color: "#555", fontSize: "14px", margin: "8px 0 36px" }}>That&apos;s less than a Chipotle bowl. Cancel anytime.</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "36px", textAlign: "left" }}>
            {benefits.map(b => (
              <div key={b.title} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "20px", flexShrink: 0 }}>{b.icon}</span>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>{b.title}</div>
                  <div style={{ fontSize: "11px", color: "#555", marginTop: "2px", lineHeight: 1.4 }}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <SubscribeButton />

          <div style={{ marginTop: "16px", display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
            <span style={{ color: "#444", fontSize: "12px" }}>🔒 Secured by Stripe</span>
            <span style={{ color: "#444", fontSize: "12px" }}>❌ Cancel anytime</span>
            <span style={{ color: "#444", fontSize: "12px" }}>💳 No card stored on our end</span>
          </div>
        </div>
        <p style={{ color: "#333", fontSize: "12px" }}>By subscribing you agree to our terms. Your subscription renews monthly until cancelled.</p>
      </div>

      {/* Testimonials */}
      <div style={{ background: "#0d0d0d", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", padding: "60px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "32px", fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>What Hoopers Are Saying</h2>
          <p style={{ textAlign: "center", color: "#555", marginBottom: "40px" }}>Real players. Real results.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "24px" }}>
                <div style={{ color: "#FFD700", fontSize: "16px", marginBottom: "12px" }}>{"★".repeat(t.stars)}</div>
                <p style={{ color: "#ccc", fontSize: "15px", lineHeight: 1.6, margin: "0 0 16px", fontStyle: "italic" }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ color: "#555", fontSize: "13px", fontWeight: 600 }}>{t.name}, {t.age}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "60px 24px" }}>
        <h2 style={{ textAlign: "center", fontSize: "32px", fontWeight: 900, color: "#fff", margin: "0 0 40px" }}>Questions? Answered.</h2>
        <div style={{ display: "grid", gap: "12px" }}>
          {faqs.map((faq, i) => (
            <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ background: "#111", border: "1px solid #222", borderRadius: "14px", padding: "20px 24px", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>{faq.q}</span>
                <span style={{ color: "#555", fontSize: "18px" }}>{openFaq === i ? "−" : "+"}</span>
              </div>
              {openFaq === i && (
                <p style={{ color: "#888", fontSize: "14px", margin: "12px 0 0", lineHeight: 1.6 }}>{faq.a}</p>
              )}
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div style={{ marginTop: "60px", textAlign: "center" }}>
          <h2 style={{ fontSize: "36px", fontWeight: 900, color: "#fff", margin: "0 0 12px" }}>Ready to become a HoopHero?</h2>
          <p style={{ color: "#666", marginBottom: "32px" }}>Join now. Start training today. $7/month.</p>
          <SubscribeButton />
        </div>
      </div>
    </div>
  );
}
