"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const userId = params.get("user_id");
  const [done, setDone] = useState(false);

  useEffect(() => {
    async function activate() {
      if (!userId) return;
      const supabase = createClient();
      await supabase.from("profiles").update({ is_subscribed: true }).eq("id", userId);
      setDone(true);
    }
    activate();
  }, [userId]);

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif", padding: "40px" }}>
      <div style={{ textAlign: "center", maxWidth: "500px" }}>
        <div style={{ fontSize: "80px", marginBottom: "24px" }}>🏆</div>
        <h1 style={{ fontSize: "42px", fontWeight: 900, color: "#fff", marginBottom: "12px", letterSpacing: "-1px" }}>
          YOU&apos;RE A{" "}
          <span style={{ background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            HOOPHERO!
          </span>
        </h1>
        <p style={{ color: "#888", fontSize: "18px", marginBottom: "32px", lineHeight: 1.6 }}>
          Your subscription is active. Full access to all 60 drills, trivia, XP, and leaderboard — let&apos;s get to work.
        </p>
        {done && (
          <Link href="/dashboard" style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "18px 48px", borderRadius: "12px", fontSize: "18px", fontWeight: 800, display: "inline-block", boxShadow: "0 0 30px rgba(255,107,0,0.5)" }}>
            GO TO DASHBOARD →
          </Link>
        )}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
