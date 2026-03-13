"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

type Player = {
  id: string;
  full_name: string;
  xp: number;
  streak: number;
  drills_completed: number;
};

function getLevel(xp: number) {
  if (xp < 200) return "Rookie";
  if (xp < 500) return "Baller";
  if (xp < 1000) return "All-Star";
  if (xp < 2000) return "Elite";
  return "Legend";
}

export default function LeaderboardPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setCurrentUserId(user.id);
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, xp, streak, drills_completed")
        .order("xp", { ascending: false })
        .limit(50);
      if (data) setPlayers(data);
      setLoading(false);
    }
    load();
  }, []);

  const medalColors = ["#FFD700", "#C0C0C0", "#CD7F32"];
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Nav */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid #1a1a1a" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <span style={{ fontSize: "22px" }}>🏀</span>
          <span style={{ fontSize: "18px", fontWeight: 900, background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            HOOPHERO
          </span>
        </Link>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link href="/dashboard" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Dashboard</Link>
          <Link href="/drills" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Drills</Link>
        </div>
      </nav>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "40px", fontWeight: 900, color: "#fff", margin: "0 0 8px", letterSpacing: "-1px" }}>🏆 LEADERBOARD</h1>
          <p style={{ color: "#666", margin: 0 }}>Top hoopers ranked by total XP. Train daily. Climb the board.</p>
        </div>

        {/* Top 3 podium */}
        {players.length >= 3 && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: "16px", marginBottom: "40px" }}>
            {[players[1], players[0], players[2]].map((player, idx) => {
              const actualRank = idx === 0 ? 2 : idx === 1 ? 1 : 3;
              const height = actualRank === 1 ? 120 : 90;
              return (
                <div key={player.id} style={{ textAlign: "center", flex: 1, maxWidth: "200px" }}>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>{medals[actualRank - 1]}</div>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>
                    {player.full_name || "Hooper"}
                  </div>
                  <div style={{ fontSize: "13px", color: "#FF6B00", marginBottom: "8px", fontWeight: 700 }}>
                    {player.xp.toLocaleString()} XP
                  </div>
                  <div style={{ background: medalColors[actualRank - 1] + "22", border: `2px solid ${medalColors[actualRank - 1]}`, borderRadius: "8px 8px 0 0", height: `${height}px`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "24px", fontWeight: 900, color: medalColors[actualRank - 1] }}>#{actualRank}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Full list */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "#666" }}>Loading rankings...</div>
        ) : players.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", background: "#111", borderRadius: "16px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏀</div>
            <p style={{ color: "#666", fontSize: "16px", marginBottom: "24px" }}>No players yet. Be the first!</p>
            <Link href="/signup" style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "14px 28px", borderRadius: "10px", fontSize: "15px", fontWeight: 800 }}>
              Create Account
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {players.map((player, index) => {
              const isMe = player.id === currentUserId;
              const rank = index + 1;
              return (
                <div key={player.id} style={{ background: isMe ? "rgba(255,107,0,0.08)" : "#111", border: `1px solid ${isMe ? "rgba(255,107,0,0.4)" : "#1a1a1a"}`, borderRadius: "12px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ fontSize: "18px", fontWeight: 900, color: rank <= 3 ? medalColors[rank - 1] : "#444", width: "32px", textAlign: "center", flexShrink: 0 }}>
                    {rank <= 3 ? medals[rank - 1] : `#${rank}`}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "15px", fontWeight: 800, color: isMe ? "#FF6B00" : "#fff", display: "flex", alignItems: "center", gap: "8px" }}>
                      {player.full_name || "Hooper"}
                      {isMe && <span style={{ fontSize: "11px", background: "rgba(255,107,0,0.2)", color: "#FF6B00", padding: "2px 8px", borderRadius: "4px", fontWeight: 700 }}>YOU</span>}
                    </div>
                    <div style={{ fontSize: "12px", color: "#555", marginTop: "2px" }}>
                      {getLevel(player.xp)} · {player.drills_completed} drills · {player.streak}🔥 streak
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: "18px", fontWeight: 900, color: "#FF6B00" }}>{player.xp.toLocaleString()}</div>
                    <div style={{ fontSize: "11px", color: "#555" }}>XP</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!currentUserId && (
          <div style={{ textAlign: "center", marginTop: "32px", background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "32px" }}>
            <p style={{ color: "#888", marginBottom: "16px", fontSize: "16px" }}>Create an account to appear on the leaderboard</p>
            <Link href="/signup" style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "14px 32px", borderRadius: "10px", fontSize: "15px", fontWeight: 800 }}>
              Join & Compete
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
