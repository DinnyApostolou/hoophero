"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

type OwnedItems = string[];

const TITLES = [
  { id: "crossover_king", name: "Crossover King", icon: "👑", cost: 200, desc: "Shown next to your name on the leaderboard" },
  { id: "sharpshooter", name: "Sharpshooter", icon: "🎯", cost: 200, desc: "Shown next to your name on the leaderboard" },
  { id: "ankle_breaker", name: "Ankle Breaker", icon: "⚡", cost: 300, desc: "Shown next to your name on the leaderboard" },
  { id: "court_general", name: "Court General", icon: "🧠", cost: 300, desc: "Shown next to your name on the leaderboard" },
  { id: "beast_mode", name: "Beast Mode", icon: "💪", cost: 400, desc: "Shown next to your name on the leaderboard" },
  { id: "legend_status", name: "Legend Status", icon: "🌟", cost: 500, desc: "The most prestigious title — for the elite only" },
];

const BADGES = [
  { id: "badge_bronze", name: "Bronze Hoop", icon: "🥉", cost: 100, desc: "Display a bronze hoop badge on your profile" },
  { id: "badge_silver", name: "Silver Hoop", icon: "🥈", cost: 250, desc: "Display a silver hoop badge on your profile" },
  { id: "badge_gold", name: "Gold Hoop", icon: "🥇", cost: 500, desc: "Display a gold hoop badge on your profile" },
  { id: "badge_diamond", name: "Diamond Hoop", icon: "💎", cost: 1000, desc: "The rarest badge — only for true legends" },
];

const BONUS_DRILLS = [
  { id: "bonus_pro_pack", name: "Pro Challenge Pack", icon: "🔥", cost: 150, desc: "Unlock 5 bonus pro-level drills worth 100 XP each (500 XP potential)" },
  { id: "bonus_elite_pack", name: "Elite Training Pack", icon: "⚡", cost: 300, desc: "Unlock 10 elite drills worth 100 XP each (1000 XP potential)" },
  { id: "bonus_legend_pack", name: "Legend Pack", icon: "🏆", cost: 500, desc: "Unlock the hardest drills in the game — 150 XP each" },
];

export default function StorePage() {
  const [xp, setXp] = useState(0);
  const [owned, setOwned] = useState<OwnedItems>([]);
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [buying, setBuying] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      setUserId(user.id);
      const { data } = await supabase.from("profiles").select("xp, owned_items, active_title").eq("id", user.id).single();
      if (data) {
        setXp(data.xp ?? 0);
        setOwned(data.owned_items ?? []);
        setActiveTitle(data.active_title ?? null);
      }
      setLoading(false);
    }
    load();
  }, []);

  function showToast(msg: string, type: "success" | "error") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function buyItem(itemId: string, cost: number, name: string) {
    if (!userId) { showToast("Log in to buy items!", "error"); return; }
    if (owned.includes(itemId)) { showToast("You already own this!", "error"); return; }
    if (xp < cost) { showToast(`Not enough XP! You need ${cost - xp} more XP.`, "error"); return; }

    setBuying(itemId);
    const supabase = createClient();
    const newXp = xp - cost;
    const newOwned = [...owned, itemId];
    await supabase.from("profiles").update({ xp: newXp, owned_items: newOwned }).eq("id", userId);
    setXp(newXp);
    setOwned(newOwned);
    setBuying(null);
    showToast(`✅ "${name}" unlocked! -${cost} XP`, "success");
  }

  async function equipTitle(titleId: string) {
    if (!userId) return;
    const supabase = createClient();
    const newTitle = activeTitle === titleId ? null : titleId;
    await supabase.from("profiles").update({ active_title: newTitle }).eq("id", userId);
    setActiveTitle(newTitle);
    showToast(newTitle ? "Title equipped! It now shows on the leaderboard." : "Title removed.", "success");
  }

  if (loading) {
    return (
      <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ fontSize: "48px" }}>🏀</div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {toast && (
        <div style={{ position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)", background: toast.type === "success" ? "#10B981" : "#EF4444", color: "#fff", padding: "14px 28px", borderRadius: "12px", fontWeight: 700, fontSize: "15px", zIndex: 9999, boxShadow: "0 0 30px rgba(0,0,0,0.5)", whiteSpace: "nowrap" }}>
          {toast.msg}
        </div>
      )}

      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid #1a1a1a" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <span style={{ fontSize: "22px" }}>🏀</span>
          <span style={{ fontSize: "18px", fontWeight: 900, background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>HOOPHERO</span>
        </Link>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Link href="/dashboard" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Dashboard</Link>
          <Link href="/drills" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Drills</Link>
          <Link href="/trivia" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Trivia</Link>
          <Link href="/leaderboard" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Leaderboard</Link>
        </div>
      </nav>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "40px", fontWeight: 900, color: "#fff", margin: "0 0 8px", letterSpacing: "-1px" }}>🏪 XP STORE</h1>
            <p style={{ color: "#666", margin: 0 }}>Spend your XP to unlock titles, badges, and bonus drills.</p>
          </div>
          {userId && (
            <div style={{ background: "#111", border: "2px solid rgba(255,107,0,0.4)", borderRadius: "16px", padding: "16px 24px", textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: "#666", letterSpacing: "1px", marginBottom: "4px" }}>YOUR BALANCE</div>
              <div style={{ fontSize: "32px", fontWeight: 900, color: "#FF6B00" }}>{xp.toLocaleString()} XP</div>
            </div>
          )}
        </div>

        {!userId && (
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "32px", textAlign: "center", marginBottom: "32px" }}>
            <p style={{ color: "#888", marginBottom: "16px", fontSize: "16px" }}>Log in to spend XP and unlock items</p>
            <Link href="/login" style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "14px 32px", borderRadius: "10px", fontSize: "15px", fontWeight: 800 }}>
              Log In
            </Link>
          </div>
        )}

        {/* Titles */}
        <section style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#fff", margin: 0 }}>TITLES</h2>
            <span style={{ fontSize: "12px", color: "#666", background: "#1a1a1a", padding: "4px 10px", borderRadius: "6px" }}>Shows next to your name on the leaderboard</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px" }}>
            {TITLES.map(item => {
              const isOwned = owned.includes(item.id);
              const isActive = activeTitle === item.id;
              const canAfford = xp >= item.cost;
              return (
                <div key={item.id} style={{ background: isOwned ? "rgba(16,185,129,0.05)" : "#111", border: `1px solid ${isActive ? "#FF6B00" : isOwned ? "rgba(16,185,129,0.3)" : "#222"}`, borderRadius: "16px", padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <span style={{ fontSize: "28px" }}>{item.icon}</span>
                    <span style={{ fontSize: "13px", fontWeight: 800, color: canAfford || isOwned ? "#FF6B00" : "#555" }}>{item.cost} XP</span>
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>{item.name}</h3>
                  <p style={{ fontSize: "12px", color: "#555", margin: "0 0 16px" }}>{item.desc}</p>
                  {isOwned ? (
                    <button onClick={() => equipTitle(item.id)}
                      style={{ width: "100%", background: isActive ? "#FF6B00" : "#1a1a1a", border: `1px solid ${isActive ? "#FF6B00" : "#333"}`, color: isActive ? "#fff" : "#888", borderRadius: "8px", padding: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
                      {isActive ? "✓ EQUIPPED" : "EQUIP TITLE"}
                    </button>
                  ) : (
                    <button onClick={() => buyItem(item.id, item.cost, item.name)} disabled={!canAfford || buying === item.id || !userId}
                      style={{ width: "100%", background: canAfford && userId ? "linear-gradient(135deg, #FF6B00, #FF9500)" : "#1a1a1a", border: "none", color: canAfford && userId ? "#fff" : "#444", borderRadius: "8px", padding: "10px", fontSize: "13px", fontWeight: 700, cursor: canAfford && userId ? "pointer" : "not-allowed", opacity: buying === item.id ? 0.7 : 1 }}>
                      {buying === item.id ? "BUYING..." : canAfford ? `UNLOCK FOR ${item.cost} XP` : `NEED ${item.cost - xp} MORE XP`}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Badges */}
        <section style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#fff", margin: 0 }}>PROFILE BADGES</h2>
            <span style={{ fontSize: "12px", color: "#666", background: "#1a1a1a", padding: "4px 10px", borderRadius: "6px" }}>Displayed on your profile</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px" }}>
            {BADGES.map(item => {
              const isOwned = owned.includes(item.id);
              const canAfford = xp >= item.cost;
              return (
                <div key={item.id} style={{ background: isOwned ? "rgba(16,185,129,0.05)" : "#111", border: `1px solid ${isOwned ? "rgba(16,185,129,0.3)" : "#222"}`, borderRadius: "16px", padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <span style={{ fontSize: "28px" }}>{item.icon}</span>
                    <span style={{ fontSize: "13px", fontWeight: 800, color: canAfford || isOwned ? "#FF6B00" : "#555" }}>{item.cost} XP</span>
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>{item.name}</h3>
                  <p style={{ fontSize: "12px", color: "#555", margin: "0 0 16px" }}>{item.desc}</p>
                  {isOwned ? (
                    <div style={{ background: "#10B98122", border: "1px solid #10B981", borderRadius: "8px", padding: "10px", textAlign: "center", fontSize: "13px", color: "#10B981", fontWeight: 700 }}>
                      ✓ OWNED
                    </div>
                  ) : (
                    <button onClick={() => buyItem(item.id, item.cost, item.name)} disabled={!canAfford || buying === item.id || !userId}
                      style={{ width: "100%", background: canAfford && userId ? "linear-gradient(135deg, #FF6B00, #FF9500)" : "#1a1a1a", border: "none", color: canAfford && userId ? "#fff" : "#444", borderRadius: "8px", padding: "10px", fontSize: "13px", fontWeight: 700, cursor: canAfford && userId ? "pointer" : "not-allowed" }}>
                      {canAfford ? `UNLOCK FOR ${item.cost} XP` : `NEED ${item.cost - xp} MORE XP`}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bonus Drills */}
        <section style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#fff", margin: 0 }}>BONUS DRILL PACKS</h2>
            <span style={{ fontSize: "12px", color: "#666", background: "#1a1a1a", padding: "4px 10px", borderRadius: "6px" }}>Earn even more XP</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px" }}>
            {BONUS_DRILLS.map(item => {
              const isOwned = owned.includes(item.id);
              const canAfford = xp >= item.cost;
              return (
                <div key={item.id} style={{ background: isOwned ? "rgba(16,185,129,0.05)" : "#111", border: `1px solid ${isOwned ? "rgba(16,185,129,0.3)" : "#222"}`, borderRadius: "16px", padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <span style={{ fontSize: "28px" }}>{item.icon}</span>
                    <span style={{ fontSize: "13px", fontWeight: 800, color: canAfford || isOwned ? "#FF6B00" : "#555" }}>{item.cost} XP</span>
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>{item.name}</h3>
                  <p style={{ fontSize: "12px", color: "#555", margin: "0 0 16px" }}>{item.desc}</p>
                  {isOwned ? (
                    <div style={{ background: "#10B98122", border: "1px solid #10B981", borderRadius: "8px", padding: "10px", textAlign: "center", fontSize: "13px", color: "#10B981", fontWeight: 700 }}>✓ UNLOCKED</div>
                  ) : (
                    <button onClick={() => buyItem(item.id, item.cost, item.name)} disabled={!canAfford || buying === item.id || !userId}
                      style={{ width: "100%", background: canAfford && userId ? "linear-gradient(135deg, #FF6B00, #FF9500)" : "#1a1a1a", border: "none", color: canAfford && userId ? "#fff" : "#444", borderRadius: "8px", padding: "10px", fontSize: "13px", fontWeight: 700, cursor: canAfford && userId ? "pointer" : "not-allowed" }}>
                      {canAfford ? `UNLOCK FOR ${item.cost} XP` : `NEED ${item.cost - xp} MORE XP`}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* How to earn XP */}
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "28px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 900, color: "#fff", marginBottom: "16px" }}>HOW TO EARN XP</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
            {[
              { icon: "🏀", action: "Complete a drill", xp: "+50 XP" },
              { icon: "🧠", action: "Correct trivia answer", xp: "+10 XP" },
              { icon: "🔥", action: "7-day streak bonus", xp: "+100 XP" },
              { icon: "🏆", action: "Complete all drills", xp: "+500 XP" },
            ].map(e => (
              <div key={e.action} style={{ background: "#1a1a1a", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: "24px", marginBottom: "6px" }}>{e.icon}</div>
                <div style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>{e.action}</div>
                <div style={{ fontSize: "16px", fontWeight: 800, color: "#FF6B00" }}>{e.xp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
