"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

type Profile = {
  full_name: string;
  xp: number;
  streak: number;
  drills_completed: number;
  is_subscribed?: boolean;
};

function getLevel(xp: number) {
  if (xp < 200) return { name: "Rookie", color: "#888" };
  if (xp < 500) return { name: "Baller", color: "#3B82F6" };
  if (xp < 1000) return { name: "All-Star", color: "#8B5CF6" };
  if (xp < 2000) return { name: "Elite", color: "#FFD700" };
  return { name: "Legend", color: "#FF6B00" };
}

function calcStat(value: number, max: number, base: number = 40) {
  return Math.min(99, Math.round(base + (value / max) * (99 - base)));
}

export default function StatsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.full_name || user.email?.split("@")[0] || "Hooper");
        const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
        if (data) setProfile(data);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📊</div>
          <p style={{ color: "#666" }}>Loading your stats...</p>
        </div>
      </div>
    );
  }

  const xp = profile?.xp ?? 0;
  const streak = profile?.streak ?? 0;
  const drills = profile?.drills_completed ?? 0;
  const level = getLevel(xp);

  // Calculate individual stats like NBA 2K
  const stats = [
    { name: "Ball Handling", icon: "🏀", value: calcStat(drills, 60, 35), color: "#FF6B00", desc: "Based on drills completed" },
    { name: "Shooting", icon: "🎯", value: calcStat(xp, 2000, 30), color: "#3B82F6", desc: "Based on XP earned" },
    { name: "Consistency", icon: "🔥", value: calcStat(streak, 30, 25), color: "#10B981", desc: "Based on your streak" },
    { name: "Athleticism", icon: "⚡", value: calcStat(drills * 2, 120, 40), color: "#FFD700", desc: "Based on training volume" },
    { name: "Defense", icon: "🛡️", value: calcStat(xp + streak * 10, 2300, 28), color: "#8B5CF6", desc: "Based on overall grind" },
    { name: "Basketball IQ", icon: "🧠", value: calcStat(drills + streak, 90, 42), color: "#FF6B00", desc: "Based on total activity" },
  ];

  const overallRating = Math.round(stats.reduce((sum, s) => sum + s.value, 0) / stats.length);

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid #1a1a1a" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <span style={{ fontSize: "22px" }}>🏀</span>
          <span style={{ fontSize: "18px", fontWeight: 900, background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>HOOPHERO</span>
        </Link>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Link href="/dashboard" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Dashboard</Link>
          <Link href="/badges" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Badges</Link>
          <Link href="/drills" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Drills</Link>
        </div>
      </nav>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "12px", color: "#3B82F6", fontWeight: 700, letterSpacing: "1px", marginBottom: "8px" }}>MY STATS</div>
          <h1 style={{ fontSize: "36px", fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>📊 Your Player Card</h1>
          <p style={{ color: "#666", margin: 0 }}>Your stats grow every time you train. The more you grind, the higher your ratings.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "24px", alignItems: "start" }}>
          {/* Player card */}
          <div style={{ background: "linear-gradient(135deg, #1a1200, #0d0d0d)", border: `2px solid ${level.color}44`, borderRadius: "24px", padding: "32px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, transparent, ${level.color}, transparent)` }} />

            {/* Overall rating */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "80px", fontWeight: 900, color: level.color, lineHeight: 1, letterSpacing: "-4px" }}>{overallRating}</div>
              <div style={{ fontSize: "13px", color: "#555", fontWeight: 600, marginTop: "4px" }}>OVERALL RATING</div>
            </div>

            {/* Player name */}
            <div style={{ marginBottom: "8px" }}>
              <div style={{ fontSize: "22px", fontWeight: 900, color: "#fff" }}>{userName.toUpperCase()}</div>
              <div style={{ fontSize: "13px", color: level.color, fontWeight: 700, marginTop: "4px" }}>{level.name.toUpperCase()}</div>
            </div>

            <div style={{ borderTop: "1px solid #222", paddingTop: "20px", marginTop: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "#FF6B00" }}>{xp.toLocaleString()}</div>
                  <div style={{ fontSize: "10px", color: "#555" }}>XP</div>
                </div>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "#FF6B00" }}>{streak}🔥</div>
                  <div style={{ fontSize: "10px", color: "#555" }}>STREAK</div>
                </div>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "#10B981" }}>{drills}</div>
                  <div style={{ fontSize: "10px", color: "#555" }}>DRILLS</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <Link href="/assessment" style={{ display: "block", background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "12px", borderRadius: "10px", fontSize: "13px", fontWeight: 700 }}>
                🎯 Take Skill Assessment
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div>
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: "20px", padding: "28px", marginBottom: "20px" }}>
              <div style={{ fontSize: "13px", color: "#555", fontWeight: 700, letterSpacing: "1px", marginBottom: "20px" }}>ATTRIBUTE RATINGS</div>
              <div style={{ display: "grid", gap: "16px" }}>
                {stats.map(stat => (
                  <div key={stat.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "16px" }}>{stat.icon}</span>
                        <span style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>{stat.name}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "11px", color: "#555" }}>{stat.desc}</span>
                        <span style={{ fontSize: "18px", fontWeight: 900, color: stat.color, minWidth: "28px", textAlign: "right" }}>{stat.value}</span>
                      </div>
                    </div>
                    <div style={{ background: "#1a1a1a", borderRadius: "6px", height: "8px", overflow: "hidden" }}>
                      <div style={{ width: `${stat.value}%`, height: "100%", background: stat.color, borderRadius: "6px", transition: "width 1s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How to improve */}
            <div style={{ background: "#0d1a0d", border: "1px solid #1a3a1a", borderRadius: "16px", padding: "20px 24px" }}>
              <div style={{ fontSize: "13px", color: "#10B981", fontWeight: 700, letterSpacing: "1px", marginBottom: "14px" }}>HOW TO RAISE YOUR RATINGS</div>
              <div style={{ display: "grid", gap: "10px" }}>
                {[
                  { action: "Complete drills", reward: "↑ Ball Handling + Athleticism" },
                  { action: "Earn XP", reward: "↑ Shooting + Defense" },
                  { action: "Maintain your streak", reward: "↑ Consistency + IQ" },
                  { action: "Reach new levels", reward: "↑ Overall Rating" },
                ].map(item => (
                  <div key={item.action} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0a1a0a", borderRadius: "8px", padding: "10px 14px" }}>
                    <span style={{ color: "#aaa", fontSize: "13px" }}>✓ {item.action}</span>
                    <span style={{ color: "#10B981", fontSize: "12px", fontWeight: 700 }}>{item.reward}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
