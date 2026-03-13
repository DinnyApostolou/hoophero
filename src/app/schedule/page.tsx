"use client";
import { useState } from "react";
import Link from "next/link";

const weeklySchedule = [
  {
    day: "Monday",
    short: "MON",
    focus: "Strength + Skills",
    type: "hard",
    color: "#FF6B00",
    emoji: "💪",
    sessions: [
      {
        time: "Morning (6-7am) or After School",
        title: "Strength Training",
        duration: "60 min",
        exercises: [
          "Squat 4x8",
          "Bench Press 4x8",
          "Pull-Ups 4x8",
          "Box Jumps 4x6",
          "Plank 3x60s",
        ]
      },
      {
        time: "Evening (if possible)",
        title: "Ball Handling Drills",
        duration: "30 min",
        exercises: [
          "Stationary dribbling 5 min",
          "Figure 8s 5 min",
          "Two-ball dribbling 10 min",
          "Cone dribbling 10 min",
        ]
      }
    ],
    nutrition: "High carb day — eat chicken & rice pre, protein shake post",
  },
  {
    day: "Tuesday",
    short: "TUE",
    focus: "Shooting + Speed",
    type: "medium",
    color: "#3B82F6",
    emoji: "🎯",
    sessions: [
      {
        time: "After School",
        title: "Shooting Workout",
        duration: "45 min",
        exercises: [
          "Form shooting (close range) 10 min",
          "Mid-range jump shots 15 min",
          "3-point shooting 15 min",
          "Free throws (50 makes) 5 min",
        ]
      },
      {
        time: "Evening",
        title: "Speed & Agility",
        duration: "30 min",
        exercises: [
          "Ladder drills 5x",
          "Broad jumps 4x5",
          "Lateral band walks 3x20",
          "Sprint intervals 6x20m",
        ]
      }
    ],
    nutrition: "Normal carbs — oat bowl before, turkey wrap after",
  },
  {
    day: "Wednesday",
    short: "WED",
    focus: "Active Recovery",
    type: "easy",
    color: "#10B981",
    emoji: "🧘",
    sessions: [
      {
        time: "Anytime",
        title: "Light Movement + Stretching",
        duration: "30-45 min",
        exercises: [
          "10 min walk or light jog",
          "Hip flexor stretch 3x30s each",
          "Hamstring stretch 3x30s each",
          "Shoulder mobility circles",
          "Foam rolling legs 10 min",
          "Ankle circles and calf stretch",
        ]
      }
    ],
    nutrition: "Lower carbs — focus on protein and veggies. Stay hydrated.",
  },
  {
    day: "Thursday",
    short: "THU",
    focus: "Lower Body Power",
    type: "hard",
    color: "#FF6B00",
    emoji: "🦵",
    sessions: [
      {
        time: "Morning or After School",
        title: "Leg Day",
        duration: "60 min",
        exercises: [
          "Romanian Deadlift 3x10",
          "Bulgarian Split Squat 3x10 each",
          "Single Leg Hops 3x10 each",
          "Calf Raises 4x15",
          "Dead Bug 3x10 each",
          "Ab Wheel 3x10",
        ]
      },
      {
        time: "Evening",
        title: "Finishing Moves",
        duration: "30 min",
        exercises: [
          "Layup combinations 10 min",
          "Euro step practice 10 min",
          "Floater practice 10 min",
        ]
      }
    ],
    nutrition: "High carb day — need fuel for heavy leg training",
  },
  {
    day: "Friday",
    short: "FRI",
    focus: "Game Prep",
    type: "medium",
    color: "#8B5CF6",
    emoji: "🏀",
    sessions: [
      {
        time: "After School",
        title: "Pre-Game Activation",
        duration: "30-40 min",
        exercises: [
          "Dynamic warm-up 10 min",
          "Shooting (just getting warm) 15 min",
          "Light ball handling 10 min",
          "Mental visualization 5 min",
        ]
      }
    ],
    nutrition: "High carb day — eat big 2-3 hrs before game. Banana 30 mins before.",
  },
  {
    day: "Saturday",
    short: "SAT",
    focus: "Game Day / Full Training",
    type: "hard",
    color: "#FFD700",
    emoji: "🏆",
    sessions: [
      {
        time: "If Game Day",
        title: "Game Day Protocol",
        duration: "All day",
        exercises: [
          "Wake up and eat big breakfast",
          "Light 15 min warm-up 2 hrs before",
          "Mental prep and team warm-up",
          "GIVE IT EVERYTHING 🔥",
          "Ice bath or cold shower after",
          "Protein-rich recovery meal within 1 hour",
        ]
      },
      {
        time: "If No Game",
        title: "Full Strength + Skills",
        duration: "90 min",
        exercises: [
          "Upper body strength 40 min",
          "Shooting workout 30 min",
          "Competitive 1v1 drills 20 min",
        ]
      }
    ],
    nutrition: "Game day = highest carb intake. Load up the night before too.",
  },
  {
    day: "Sunday",
    short: "SUN",
    focus: "Full Rest",
    type: "rest",
    color: "#444",
    emoji: "😴",
    sessions: [
      {
        time: "All Day",
        title: "Rest & Recharge",
        duration: "All day",
        exercises: [
          "Sleep 8-10 hours minimum",
          "Light walk if you want",
          "Foam roll any sore spots",
          "Meal prep for the week",
          "Watch game film or highlights",
          "Mental reset — you earned it",
        ]
      }
    ],
    nutrition: "Eat clean and protein-heavy. Prepare meals for the week.",
  },
];

const typeColors: Record<string, string> = {
  hard: "#FF6B00",
  medium: "#3B82F6",
  easy: "#10B981",
  rest: "#555",
};

const typeLabels: Record<string, string> = {
  hard: "INTENSE",
  medium: "MODERATE",
  easy: "RECOVERY",
  rest: "REST DAY",
};

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState("Monday");

  const today = weeklySchedule.find(d => d.day === selectedDay)!;

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
          <Link href="/strength" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Strength</Link>
          <Link href="/nutrition" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Nutrition</Link>
        </div>
      </nav>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "12px", color: "#FFD700", fontWeight: 700, letterSpacing: "1px", marginBottom: "8px" }}>WEEKLY SCHEDULE</div>
          <h1 style={{ fontSize: "36px", fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>📅 Your Week. Optimized.</h1>
          <p style={{ color: "#666", margin: 0 }}>A full week of basketball training, strength work, and recovery — built to make you elite.</p>
        </div>

        {/* Day selector */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px", marginBottom: "32px" }}>
          {weeklySchedule.map(d => (
            <button key={d.day} onClick={() => setSelectedDay(d.day)} style={{ background: selectedDay === d.day ? d.color : "#111", border: `1px solid ${selectedDay === d.day ? d.color : "#222"}`, borderRadius: "12px", padding: "12px 6px", cursor: "pointer", textAlign: "center", transition: "all 0.2s" }}>
              <div style={{ fontSize: "18px", marginBottom: "4px" }}>{d.emoji}</div>
              <div style={{ fontSize: "11px", fontWeight: 800, color: selectedDay === d.day ? "#fff" : "#666" }}>{d.short}</div>
            </button>
          ))}
        </div>

        {/* Day detail */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "24px" }}>
          <div>
            {/* Day header */}
            <div style={{ background: `linear-gradient(135deg, ${today.color}22, #111)`, border: `1px solid ${today.color}44`, borderRadius: "20px", padding: "24px 28px", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <span style={{ fontSize: "32px" }}>{today.emoji}</span>
                <div>
                  <h2 style={{ fontSize: "26px", fontWeight: 900, color: "#fff", margin: 0 }}>{today.day}</h2>
                  <div style={{ fontSize: "14px", color: today.color, fontWeight: 700 }}>{today.focus}</div>
                </div>
                <div style={{ marginLeft: "auto", background: typeColors[today.type] + "33", color: typeColors[today.type], padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 800, letterSpacing: "1px" }}>
                  {typeLabels[today.type]}
                </div>
              </div>
            </div>

            {/* Sessions */}
            {today.sessions.map((session, i) => (
              <div key={i} style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "24px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <div style={{ fontSize: "11px", color: "#555", fontWeight: 600, letterSpacing: "1px", marginBottom: "4px" }}>{session.time}</div>
                    <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#fff", margin: 0 }}>{session.title}</h3>
                  </div>
                  <div style={{ background: "#1a1a1a", color: "#aaa", padding: "4px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: 600 }}>⏱ {session.duration}</div>
                </div>
                <div style={{ display: "grid", gap: "8px" }}>
                  {session.exercises.map((ex, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: "10px", background: "#0d0d0d", borderRadius: "8px", padding: "10px 14px" }}>
                      <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: today.color + "33", color: today.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, flexShrink: 0 }}>{j + 1}</div>
                      <span style={{ color: "#ccc", fontSize: "14px" }}>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right sidebar */}
          <div>
            {/* Nutrition for the day */}
            <div style={{ background: "#0a1a0a", border: "1px solid #1a3a1a", borderRadius: "16px", padding: "20px", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#10B981", margin: "0 0 12px" }}>🥗 Nutrition Today</h3>
              <p style={{ color: "#aaa", fontSize: "13px", lineHeight: "1.6", margin: "0 0 14px" }}>{today.nutrition}</p>
              <Link href="/nutrition" style={{ display: "block", background: "#10B98133", color: "#10B981", textDecoration: "none", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, textAlign: "center" }}>
                View Meal Plans →
              </Link>
            </div>

            {/* Week overview */}
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 800, color: "#fff", margin: "0 0 14px", letterSpacing: "1px" }}>WEEKLY OVERVIEW</h3>
              <div style={{ display: "grid", gap: "8px" }}>
                {weeklySchedule.map(d => (
                  <div key={d.day} onClick={() => setSelectedDay(d.day)} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px", borderRadius: "8px", background: selectedDay === d.day ? d.color + "22" : "transparent", cursor: "pointer", border: `1px solid ${selectedDay === d.day ? d.color + "44" : "transparent"}` }}>
                    <span style={{ fontSize: "16px" }}>{d.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: selectedDay === d.day ? "#fff" : "#aaa" }}>{d.day}</div>
                      <div style={{ fontSize: "11px", color: "#555" }}>{d.focus}</div>
                    </div>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: typeColors[d.type] }} />
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
