"use client";
import { useState } from "react";
import Link from "next/link";

const exercises = [
  {
    category: "Legs & Explosiveness",
    emoji: "🦵",
    color: "#FF6B00",
    items: [
      { name: "Squat", sets: "4x8", reps: "8 reps", tip: "Go below parallel. Builds jumping power.", rest: "90s" },
      { name: "Romanian Deadlift", sets: "3x10", reps: "10 reps", tip: "Hinge at hips, keep back flat. Builds hamstrings for speed.", rest: "90s" },
      { name: "Box Jumps", sets: "4x6", reps: "6 reps", tip: "Explode from toes. Land softly. Pure basketball power.", rest: "60s" },
      { name: "Bulgarian Split Squat", sets: "3x10", reps: "10 each leg", tip: "Back foot elevated. Crushes each leg individually.", rest: "90s" },
      { name: "Calf Raises", sets: "4x15", reps: "15 reps", tip: "Slow and controlled. Essential for jumping.", rest: "45s" },
      { name: "Lateral Band Walks", sets: "3x20", reps: "20 steps each way", tip: "Builds hip stability for quick cuts.", rest: "45s" },
    ]
  },
  {
    category: "Upper Body",
    emoji: "💪",
    color: "#3B82F6",
    items: [
      { name: "Bench Press", sets: "4x8", reps: "8 reps", tip: "Controls your chest strength. Helps with ball-handling and rebounding.", rest: "90s" },
      { name: "Pull-Ups", sets: "4x8", reps: "8 reps", tip: "Wide grip. Best exercise for overall upper body strength.", rest: "90s" },
      { name: "Overhead Press", sets: "3x10", reps: "10 reps", tip: "Builds shoulder strength for shooting range.", rest: "90s" },
      { name: "Dumbbell Rows", sets: "3x12", reps: "12 each arm", tip: "Keep elbow close to body. Builds back thickness.", rest: "60s" },
      { name: "Tricep Dips", sets: "3x12", reps: "12 reps", tip: "Full range of motion. Strengthens shooting motion.", rest: "60s" },
      { name: "Bicep Curls", sets: "3x12", reps: "12 reps", tip: "Don't swing. Builds arm strength for passing and holding.", rest: "45s" },
    ]
  },
  {
    category: "Core",
    emoji: "🎯",
    color: "#10B981",
    items: [
      { name: "Plank", sets: "3x60s", reps: "60 seconds", tip: "Keep hips level. Core stability = better balance on court.", rest: "45s" },
      { name: "Dead Bug", sets: "3x10", reps: "10 each side", tip: "Slow and controlled. Best core exercise for athletes.", rest: "45s" },
      { name: "Cable Woodchops", sets: "3x12", reps: "12 each side", tip: "Rotational strength = better crossovers.", rest: "60s" },
      { name: "Hanging Leg Raises", sets: "3x12", reps: "12 reps", tip: "Control the swing. Lower abs and hip flexors.", rest: "60s" },
      { name: "Ab Wheel", sets: "3x10", reps: "10 reps", tip: "Don't collapse. Full core strength builder.", rest: "60s" },
    ]
  },
  {
    category: "Speed & Agility",
    emoji: "⚡",
    color: "#FFD700",
    items: [
      { name: "Broad Jumps", sets: "4x5", reps: "5 reps", tip: "Max distance each jump. Builds horizontal explosion.", rest: "60s" },
      { name: "Single Leg Hops", sets: "3x10", reps: "10 each leg", tip: "Builds ankle stability and single-leg power.", rest: "60s" },
      { name: "Resistance Band Sprints", sets: "6x20m", reps: "20 meters", tip: "Partner holds band around waist. Builds acceleration.", rest: "90s" },
      { name: "Ladder Drills", sets: "5x1", reps: "Full ladder", tip: "In-in-out-out. Foot speed and coordination.", rest: "45s" },
    ]
  },
];

export default function StrengthPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);

  const categories = ["All", ...exercises.map(e => e.category)];
  const filtered = selectedCategory === "All" ? exercises : exercises.filter(e => e.category === selectedCategory);
  const totalExercises = exercises.reduce((sum, cat) => sum + cat.items.length, 0);
  const completedCount = completedExercises.size;

  function toggleComplete(name: string) {
    setCompletedExercises(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

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
          <Link href="/nutrition" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Nutrition</Link>
          <Link href="/schedule" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Schedule</Link>
        </div>
      </nav>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "12px", color: "#FF6B00", fontWeight: 700, letterSpacing: "1px", marginBottom: "8px" }}>STRENGTH TRAINER</div>
          <h1 style={{ fontSize: "36px", fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>💪 Build Muscle. Play Better.</h1>
          <p style={{ color: "#666", margin: 0 }}>Exercises specifically chosen for basketball players. Get stronger, jump higher, run faster.</p>
        </div>

        {/* Progress bar */}
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "20px 24px", marginBottom: "32px", display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#aaa", fontSize: "14px", fontWeight: 600 }}>Today&apos;s session</span>
              <span style={{ color: "#FF6B00", fontSize: "14px", fontWeight: 700 }}>{completedCount}/{totalExercises} done</span>
            </div>
            <div style={{ background: "#1a1a1a", borderRadius: "8px", height: "10px", overflow: "hidden" }}>
              <div style={{ width: `${(completedCount / totalExercises) * 100}%`, height: "100%", background: "linear-gradient(90deg, #FF6B00, #FFD700)", borderRadius: "8px", transition: "width 0.4s ease" }} />
            </div>
          </div>
          {completedCount === totalExercises && completedCount > 0 && (
            <div style={{ fontSize: "28px" }}>🏆</div>
          )}
        </div>

        {/* Category filter */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "32px", flexWrap: "wrap" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ background: selectedCategory === cat ? "#FF6B00" : "#111", color: selectedCategory === cat ? "#fff" : "#888", border: `1px solid ${selectedCategory === cat ? "#FF6B00" : "#333"}`, padding: "8px 16px", borderRadius: "20px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Exercises */}
        {filtered.map(category => (
          <div key={category.category} style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span style={{ fontSize: "24px" }}>{category.emoji}</span>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", margin: 0 }}>{category.category}</h2>
              <div style={{ flex: 1, height: "1px", background: "#222" }} />
            </div>
            <div style={{ display: "grid", gap: "12px" }}>
              {category.items.map(exercise => {
                const done = completedExercises.has(exercise.name);
                const open = expandedExercise === exercise.name;
                return (
                  <div key={exercise.name} style={{ background: done ? "#0a1a0a" : "#111", border: `1px solid ${done ? "#10B981" : "#222"}`, borderRadius: "14px", overflow: "hidden", transition: "all 0.2s" }}>
                    <div onClick={() => setExpandedExercise(open ? null : exercise.name)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", cursor: "pointer" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <button onClick={e => { e.stopPropagation(); toggleComplete(exercise.name); }} style={{ width: "28px", height: "28px", borderRadius: "50%", border: `2px solid ${done ? "#10B981" : "#444"}`, background: done ? "#10B981" : "transparent", color: "#fff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {done ? "✓" : ""}
                        </button>
                        <div>
                          <div style={{ fontSize: "16px", fontWeight: 700, color: done ? "#10B981" : "#fff", textDecoration: done ? "line-through" : "none" }}>{exercise.name}</div>
                          <div style={{ fontSize: "13px", color: "#555", marginTop: "2px" }}>{exercise.sets} · Rest {exercise.rest}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ background: category.color + "22", color: category.color, padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 700 }}>{exercise.reps}</div>
                        <span style={{ color: "#444", fontSize: "16px" }}>{open ? "▲" : "▼"}</span>
                      </div>
                    </div>
                    {open && (
                      <div style={{ padding: "0 20px 16px 62px", borderTop: "1px solid #1a1a1a" }}>
                        <p style={{ color: "#aaa", fontSize: "14px", margin: "12px 0 0" }}>💡 {exercise.tip}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
