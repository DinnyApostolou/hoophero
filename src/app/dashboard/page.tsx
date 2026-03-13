"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  if (xp < 200) return { name: "Rookie", next: 200, color: "#888", prev: 0 };
  if (xp < 500) return { name: "Baller", next: 500, color: "#3B82F6", prev: 200 };
  if (xp < 1000) return { name: "All-Star", next: 1000, color: "#8B5CF6", prev: 500 };
  if (xp < 2000) return { name: "Elite", next: 2000, color: "#FFD700", prev: 1000 };
  return { name: "Legend", next: 9999, color: "#FF6B00", prev: 2000 };
}

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const supabase = createClient();

    async function loadProfile(userId: string, userMeta: Record<string, string>, userEmail: string) {
      setUserName(userMeta?.full_name || userEmail?.split("@")[0] || "Hooper");
      const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
      if (data) {
        setProfile(data);
      } else {
        const newProfile = { id: userId, full_name: userMeta?.full_name || "", xp: 0, streak: 0, drills_completed: 0, is_subscribed: false };
        await supabase.from("profiles").insert(newProfile as never);
        setProfile(newProfile);
      }
      setLoading(false);
    }

    // Check existing session first
    supabase.auth.getSession().then(({ data }: { data: { session: { user: { id: string; email?: string; user_metadata: Record<string, string> } } | null } }) => {
      const session = data.session;
      if (session?.user) {
        loadProfile(session.user.id, session.user.user_metadata as Record<string, string>, session.user.email || "");
      }
    });

    // Also listen for auth changes (catches login redirect)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: { user: { id: string; email?: string; user_metadata: Record<string, string> } } | null) => {
      if (session?.user) {
        loadProfile(session.user.id, session.user.user_metadata as Record<string, string>, session.user.email || "");
      } else {
        router.push("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏀</div>
          <p style={{ color: "#666" }}>Loading your stats...</p>
        </div>
      </div>
    );
  }

  const xp = profile?.xp ?? 0;
  const streak = profile?.streak ?? 0;
  const drillsDone = profile?.drills_completed ?? 0;
  const level = getLevel(xp);
  const xpPercent = Math.min(100, Math.round(((xp - level.prev) / (level.next - level.prev)) * 100));

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid #1a1a1a" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <span style={{ fontSize: "22px" }}>🏀</span>
          <span style={{ fontSize: "18px", fontWeight: 900, background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>HOOPHERO</span>
        </Link>
        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/drills" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Drills</Link>
          <Link href="/trivia" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Trivia</Link>
          <Link href="/leaderboard" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Leaderboard</Link>
          {!profile?.is_subscribed && (
            <Link href="/subscribe" style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 700 }}>
              Subscribe $7/mo
            </Link>
          )}
          <button onClick={handleSignOut} style={{ background: "transparent", border: "1px solid #333", color: "#888", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>
            Sign Out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 900, color: "#fff", margin: "0 0 4px" }}>
            Welcome back, {userName} 👋
          </h1>
          <p style={{ color: "#666", margin: 0 }}>Ready to level up today?</p>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "40px" }}>
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "24px" }}>
            <div style={{ fontSize: "12px", color: "#666", letterSpacing: "1px", marginBottom: "8px" }}>TOTAL XP</div>
            <div style={{ fontSize: "36px", fontWeight: 900, color: "#FF6B00" }}>{xp.toLocaleString()}</div>
            <div style={{ fontSize: "12px", color: "#444", marginTop: "4px" }}>XP Points</div>
          </div>

          <div style={{ background: "#111", border: `1px solid ${level.color}44`, borderRadius: "16px", padding: "24px" }}>
            <div style={{ fontSize: "12px", color: "#666", letterSpacing: "1px", marginBottom: "8px" }}>LEVEL</div>
            <div style={{ fontSize: "36px", fontWeight: 900, color: level.color }}>{level.name}</div>
            <div style={{ marginTop: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "12px", color: "#555" }}>Progress</span>
                <span style={{ fontSize: "12px", color: "#555" }}>{xpPercent}%</span>
              </div>
              <div style={{ background: "#1a1a1a", borderRadius: "4px", height: "6px", overflow: "hidden" }}>
                <div style={{ width: `${xpPercent}%`, height: "100%", background: level.color, borderRadius: "4px", transition: "width 1s ease" }} />
              </div>
            </div>
          </div>

          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "24px" }}>
            <div style={{ fontSize: "12px", color: "#666", letterSpacing: "1px", marginBottom: "8px" }}>STREAK</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <div style={{ fontSize: "36px", fontWeight: 900, color: "#FF6B00" }}>{streak}</div>
              <div style={{ fontSize: "20px" }}>🔥</div>
            </div>
            <div style={{ fontSize: "12px", color: "#444", marginTop: "4px" }}>Days in a row</div>
          </div>

          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "24px" }}>
            <div style={{ fontSize: "12px", color: "#666", letterSpacing: "1px", marginBottom: "8px" }}>DRILLS DONE</div>
            <div style={{ fontSize: "36px", fontWeight: 900, color: "#10B981" }}>{drillsDone}</div>
            <div style={{ fontSize: "12px", color: "#444", marginTop: "4px" }}>Total completed</div>
          </div>
        </div>

        {/* Subscribe banner if not subscribed */}
        {!profile?.is_subscribed && (
          <div style={{ background: "linear-gradient(135deg, #1a0800 0%, #111 100%)", border: "1px solid rgba(255,107,0,0.4)", borderRadius: "16px", padding: "24px 28px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ fontSize: "12px", color: "#FF6B00", fontWeight: 700, letterSpacing: "1px", marginBottom: "4px" }}>UNLOCK EVERYTHING</div>
              <p style={{ color: "#ccc", margin: 0, fontSize: "15px" }}>Get full access to all 60 drills, trivia, and leaderboard for just <strong style={{ color: "#FF6B00" }}>$7/month</strong>.</p>
            </div>
            <Link href="/subscribe" style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "12px 24px", borderRadius: "10px", fontSize: "14px", fontWeight: 800, whiteSpace: "nowrap" }}>
              Subscribe Now →
            </Link>
          </div>
        )}

        {/* Today's challenge */}
        <div style={{ background: "linear-gradient(135deg, #111 0%, #1a0f00 100%)", border: "1px solid rgba(255,107,0,0.3)", borderRadius: "20px", padding: "36px", marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <div style={{ fontSize: "12px", color: "#FF6B00", letterSpacing: "1px", marginBottom: "8px", fontWeight: 700 }}>TODAY&apos;S CHALLENGE</div>
            <h2 style={{ fontSize: "24px", fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>Complete a drill · Earn 50 XP 🏆</h2>
            <p style={{ color: "#666", margin: 0, fontSize: "14px" }}>Pick any drill, mark it complete, earn XP</p>
          </div>
          <Link href="/drills" style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "16px 32px", borderRadius: "12px", fontSize: "16px", fontWeight: 800, whiteSpace: "nowrap", boxShadow: "0 0 20px rgba(255,107,0,0.4)" }}>
            GO TO DRILLS →
          </Link>
        </div>

        {/* Quick links */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
          {[
            { href: "/drills", icon: "🏀", title: "Drills Library", sub: "60 drills to complete" },
            { href: "/trivia", icon: "🧠", title: "Basketball Trivia", sub: "50 questions · +10 XP each" },
            { href: "/leaderboard", icon: "🏆", title: "Leaderboard", sub: "See how you rank" },
            { href: "/subscribe", icon: "⚡", title: "Go Pro — $7/mo", sub: "Unlock full access" },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "24px", textDecoration: "none", display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ fontSize: "32px" }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 800, color: "#fff" }}>{item.title}</div>
                <div style={{ fontSize: "12px", color: "#555", marginTop: "2px" }}>{item.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
