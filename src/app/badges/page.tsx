"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

type Profile = {
  xp: number;
  streak: number;
  drills_completed: number;
  created_at?: string;
};

const OG_CUTOFF = new Date("2025-06-01").getTime();

const allBadges = [
  // Signup
  { id: "og", icon: "🐐", name: "OG Hooper", desc: "Joined HoopHero in the first 100", color: "#FFD700", rarity: "LEGENDARY", check: (p: Profile, signupDate: number) => signupDate < OG_CUTOFF },
  { id: "day1", icon: "⚡", name: "Day 1", desc: "Joined in HoopHero's first month", color: "#FF6B00", rarity: "RARE", check: (p: Profile, signupDate: number) => signupDate < OG_CUTOFF },

  // Streak badges
  { id: "streak3", icon: "🔥", name: "On Fire", desc: "3 day streak", color: "#FF6B00", rarity: "COMMON", check: (p: Profile) => p.streak >= 3 },
  { id: "streak7", icon: "💥", name: "Week Warrior", desc: "7 day streak", color: "#FF6B00", rarity: "UNCOMMON", check: (p: Profile) => p.streak >= 7 },
  { id: "streak14", icon: "🌟", name: "Two Week Lock-In", desc: "14 day streak", color: "#FFD700", rarity: "RARE", check: (p: Profile) => p.streak >= 14 },
  { id: "streak30", icon: "🏆", name: "30 Day Legend", desc: "30 day streak", color: "#FFD700", rarity: "EPIC", check: (p: Profile) => p.streak >= 30 },
  { id: "streak60", icon: "👑", name: "Unstoppable", desc: "60 day streak", color: "#FF6B00", rarity: "LEGENDARY", check: (p: Profile) => p.streak >= 60 },
  { id: "streak100", icon: "🐐", name: "GOAT Streak", desc: "100 day streak — almost impossible", color: "#FFD700", rarity: "LEGENDARY", check: (p: Profile) => p.streak >= 100 },

  // Drills
  { id: "drills5", icon: "🏀", name: "First Steps", desc: "Complete 5 drills", color: "#10B981", rarity: "COMMON", check: (p: Profile) => p.drills_completed >= 5 },
  { id: "drills10", icon: "💪", name: "Getting Serious", desc: "Complete 10 drills", color: "#10B981", rarity: "COMMON", check: (p: Profile) => p.drills_completed >= 10 },
  { id: "drills25", icon: "🎯", name: "Drill Machine", desc: "Complete 25 drills", color: "#3B82F6", rarity: "UNCOMMON", check: (p: Profile) => p.drills_completed >= 25 },
  { id: "drills50", icon: "🔑", name: "Half Century", desc: "Complete 50 drills", color: "#8B5CF6", rarity: "RARE", check: (p: Profile) => p.drills_completed >= 50 },
  { id: "drills60", icon: "💎", name: "Full Library", desc: "Complete all 60 drills", color: "#FFD700", rarity: "LEGENDARY", check: (p: Profile) => p.drills_completed >= 60 },

  // XP
  { id: "xp100", icon: "⭐", name: "First Spark", desc: "Earn 100 XP", color: "#888", rarity: "COMMON", check: (p: Profile) => p.xp >= 100 },
  { id: "xp500", icon: "💫", name: "Rising Star", desc: "Earn 500 XP", color: "#3B82F6", rarity: "UNCOMMON", check: (p: Profile) => p.xp >= 500 },
  { id: "xp1000", icon: "🌠", name: "XP Demon", desc: "Earn 1,000 XP", color: "#8B5CF6", rarity: "RARE", check: (p: Profile) => p.xp >= 1000 },
  { id: "xp2000", icon: "🚀", name: "Elite Status", desc: "Earn 2,000 XP", color: "#FFD700", rarity: "EPIC", check: (p: Profile) => p.xp >= 2000 },

  // Level badges
  { id: "baller", icon: "🏅", name: "Baller", desc: "Reach Baller level", color: "#3B82F6", rarity: "UNCOMMON", check: (p: Profile) => p.xp >= 200 },
  { id: "allstar", icon: "🌟", name: "All-Star", desc: "Reach All-Star level", color: "#8B5CF6", rarity: "RARE", check: (p: Profile) => p.xp >= 500 },
  { id: "elite", icon: "💎", name: "Elite", desc: "Reach Elite level", color: "#FFD700", rarity: "EPIC", check: (p: Profile) => p.xp >= 1000 },
  { id: "legend", icon: "👑", name: "Legend", desc: "Reach Legend level — the top", color: "#FF6B00", rarity: "LEGENDARY", check: (p: Profile) => p.xp >= 2000 },
];

const rarityOrder = ["LEGENDARY", "EPIC", "RARE", "UNCOMMON", "COMMON"];
const rarityColors: Record<string, string> = {
  LEGENDARY: "#FFD700",
  EPIC: "#8B5CF6",
  RARE: "#3B82F6",
  UNCOMMON: "#10B981",
  COMMON: "#555",
};

export default function BadgesPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [signupDate, setSignupDate] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const createdAt = new Date(user.created_at).getTime();
        setSignupDate(createdAt);
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
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏅</div>
          <p style={{ color: "#666" }}>Loading your badges...</p>
        </div>
      </div>
    );
  }

  const earnedBadges = allBadges.filter(b => profile && b.check(profile, signupDate));
  const earnedIds = new Set(earnedBadges.map(b => b.id));

  const filtered = filter === "ALL" ? allBadges :
    filter === "EARNED" ? allBadges.filter(b => earnedIds.has(b.id)) :
    allBadges.filter(b => b.rarity === filter);

  const sorted = [...filtered].sort((a, b) => rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity));

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid #1a1a1a" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <span style={{ fontSize: "22px" }}>🏀</span>
          <span style={{ fontSize: "18px", fontWeight: 900, background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>HOOPHERO</span>
        </Link>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Link href="/dashboard" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Dashboard</Link>
          <Link href="/drills" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Drills</Link>
        </div>
      </nav>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "12px", color: "#FFD700", fontWeight: 700, letterSpacing: "1px", marginBottom: "8px" }}>ACHIEVEMENT BADGES</div>
          <h1 style={{ fontSize: "36px", fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>🏅 Your Badge Collection</h1>
          <p style={{ color: "#666", margin: 0 }}>Earn badges by training, grinding streaks, and leveling up. Some are rare — very few will ever get them.</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "20px", textAlign: "center" }}>
            <div style={{ fontSize: "32px", fontWeight: 900, color: "#FFD700" }}>{earnedBadges.length}</div>
            <div style={{ fontSize: "12px", color: "#555", marginTop: "4px" }}>Badges Earned</div>
          </div>
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "20px", textAlign: "center" }}>
            <div style={{ fontSize: "32px", fontWeight: 900, color: "#FF6B00" }}>{allBadges.length - earnedBadges.length}</div>
            <div style={{ fontSize: "12px", color: "#555", marginTop: "4px" }}>Still Locked</div>
          </div>
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "20px", textAlign: "center" }}>
            <div style={{ fontSize: "32px", fontWeight: 900, color: "#10B981" }}>{Math.round((earnedBadges.length / allBadges.length) * 100)}%</div>
            <div style={{ fontSize: "12px", color: "#555", marginTop: "4px" }}>Completion</div>
          </div>
        </div>

        {/* Filter */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
          {["ALL", "EARNED", "LEGENDARY", "EPIC", "RARE", "UNCOMMON", "COMMON"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? (rarityColors[f] || "#FF6B00") : "#111", color: filter === f ? "#fff" : "#666", border: `1px solid ${filter === f ? (rarityColors[f] || "#FF6B00") : "#333"}`, padding: "6px 14px", borderRadius: "20px", cursor: "pointer", fontSize: "12px", fontWeight: 700 }}>
              {f}
            </button>
          ))}
        </div>

        {/* Badge grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
          {sorted.map(badge => {
            const earned = earnedIds.has(badge.id);
            return (
              <div key={badge.id} style={{ background: earned ? `linear-gradient(135deg, ${badge.color}15, #111)` : "#0d0d0d", border: `1px solid ${earned ? badge.color + "44" : "#1a1a1a"}`, borderRadius: "16px", padding: "20px", textAlign: "center", position: "relative", overflow: "hidden", opacity: earned ? 1 : 0.5 }}>
                {badge.rarity === "LEGENDARY" && earned && (
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${badge.color}, transparent)` }} />
                )}
                <div style={{ fontSize: "40px", marginBottom: "8px", filter: earned ? "none" : "grayscale(100%)" }}>{badge.icon}</div>
                <div style={{ fontSize: "10px", color: rarityColors[badge.rarity], fontWeight: 800, letterSpacing: "1px", marginBottom: "6px" }}>{badge.rarity}</div>
                <div style={{ fontSize: "14px", fontWeight: 800, color: earned ? "#fff" : "#444", marginBottom: "4px" }}>{badge.name}</div>
                <div style={{ fontSize: "11px", color: "#555", lineHeight: 1.4 }}>{badge.desc}</div>
                {earned && (
                  <div style={{ marginTop: "10px", background: badge.color + "22", color: badge.color, padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 700, display: "inline-block" }}>✓ EARNED</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
