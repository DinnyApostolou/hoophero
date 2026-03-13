"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const questions = [
  {
    id: "position",
    question: "What position do you play?",
    emoji: "🏀",
    options: [
      { value: "pg", label: "Point Guard", desc: "Floor general, playmaker" },
      { value: "sg", label: "Shooting Guard", desc: "Scorer, off-ball threat" },
      { value: "sf", label: "Small Forward", desc: "Versatile, do-it-all" },
      { value: "pf", label: "Power Forward", desc: "Physical, mid-range game" },
      { value: "c", label: "Center", desc: "Paint presence, rim protector" },
    ]
  },
  {
    id: "experience",
    question: "How long have you been playing?",
    emoji: "📅",
    options: [
      { value: "beginner", label: "Just started", desc: "Less than 1 year" },
      { value: "developing", label: "Getting serious", desc: "1-3 years" },
      { value: "intermediate", label: "Been hooping", desc: "3-5 years" },
      { value: "advanced", label: "Hooping since young", desc: "5+ years" },
    ]
  },
  {
    id: "weakness",
    question: "What's your biggest weakness?",
    emoji: "⚠️",
    options: [
      { value: "handles", label: "Ball Handling", desc: "Dribbling, crossovers, finishing" },
      { value: "shooting", label: "Shooting", desc: "Form, range, consistency" },
      { value: "defense", label: "Defense", desc: "Footwork, positioning, IQ" },
      { value: "athleticism", label: "Athleticism", desc: "Speed, jumping, strength" },
      { value: "iq", label: "Basketball IQ", desc: "Reading the game, decision making" },
    ]
  },
  {
    id: "goal",
    question: "What's your main goal?",
    emoji: "🎯",
    options: [
      { value: "varsity", label: "Make Varsity", desc: "Earn my spot on the team" },
      { value: "starter", label: "Become a Starter", desc: "Lock in my starting spot" },
      { value: "college", label: "Play in College", desc: "Get recruited" },
      { value: "skills", label: "Just Get Better", desc: "Improve every day" },
      { value: "pro", label: "Go Pro", desc: "The dream. Why not?" },
    ]
  },
  {
    id: "days",
    question: "How many days a week can you train?",
    emoji: "🗓️",
    options: [
      { value: "2", label: "2 days", desc: "Busy schedule" },
      { value: "3", label: "3 days", desc: "Consistent grind" },
      { value: "4", label: "4 days", desc: "Serious about it" },
      { value: "5", label: "5+ days", desc: "Full commitment mode" },
    ]
  },
];

const plans: Record<string, Record<string, { drills: string[], focus: string, tip: string }>> = {
  pg: {
    handles: { drills: ["Figure 8 Dribbling", "Two-Ball Dribbling", "Speed Dribbling", "Cone Dribbling"], focus: "Elite ball handling is your #1 job as a PG. Master the dribble first.", tip: "Kobe said: Handle the ball for 30 mins every day, no excuses." },
    shooting: { drills: ["Form Shooting", "Catch & Shoot", "Pull-Up Jumper", "Free Throws"], focus: "PGs who can shoot are unstoppable. Your defender has to guard you 30 feet out.", tip: "Steph Curry shoots 500 shots every day in the off-season." },
    defense: { drills: ["Defensive Slides", "On-Ball Defense", "Closeouts"], focus: "Lock up the opposing PG and you control the game both ways.", tip: "Defense wins championships. Be the one who guards the best player." },
    athleticism: { drills: ["Speed Ladder", "Box Jumps", "Sprint Intervals"], focus: "First step explosion makes your handles 10x more deadly.", tip: "Work speed training 3x/week. First step speed = free layups." },
    iq: { drills: ["Pick and Roll Reads", "Help Defense", "Transition Offense"], focus: "PG IQ is everything. You're the coach on the floor.", tip: "Watch NBA film and ask yourself: why did they make that decision?" },
  },
  sg: {
    handles: { drills: ["Off-Ball Movement", "Catch & Go Dribble", "Pull-Up Dribble"], focus: "SGs need handles to create off the catch and beat defenders one-on-one.", tip: "Off-dribble skills let you get your shot off anywhere on the court." },
    shooting: { drills: ["Spot Shooting", "Off-Screen Shots", "3-Point Shooting", "Catch & Shoot"], focus: "Shooting is your superpower. Put up 300 shots every single day.", tip: "Your shooting percentage directly determines your playing time." },
    defense: { drills: ["Defensive Slides", "Closeouts", "On-Ball Defense"], focus: "Locking up wings and forcing turnovers makes you a two-way nightmare.", tip: "Use your length. SGs who defend always play more minutes." },
    athleticism: { drills: ["Explosive Starts", "Vertical Jump Training", "Lateral Speed"], focus: "Athleticism lets you get to your spots and elevate over defenders.", tip: "Jump training 3x/week adds real inches to your vert in 6-8 weeks." },
    iq: { drills: ["Reading Screens", "Backdoor Cuts", "Transition Shooting"], focus: "Know where to be before the ball arrives. Anticipation = open shots.", tip: "Great SGs move without the ball more than with it." },
  },
  sf: {
    handles: { drills: ["Isolation Dribbling", "Aggressive Drives", "Jab Step Combos"], focus: "SF ball handling unlocks your ability to create for yourself and others.", tip: "Be able to beat your defender off the dribble going both directions." },
    shooting: { drills: ["Mid-Range Pull-Ups", "Face-Up Jumpers", "Corner 3s"], focus: "Mid-range mastery is the most underrated skill in basketball right now.", tip: "Kawhi Leonard's mid-range is why he has 2 Finals MVPs." },
    defense: { drills: ["Defending Multiple Positions", "Help Defense Rotations", "Transition D"], focus: "SFs guard everyone 1-5. Versatile defense = you never come off the floor.", tip: "The best defensive forwards can guard PGs and Centers. Develop that." },
    athleticism: { drills: ["Power Jumps", "Core Strength", "Sprint Work"], focus: "SF athleticism is about being physical AND mobile. You need both.", tip: "LeBron works on strength AND cardio equally. Copy that formula." },
    iq: { drills: ["Help Defense", "Weak Side Cuts", "Post Moves"], focus: "SFs who read the game right are always in the right spot at the right time.", tip: "Watch Scottie Pippen's movement off the ball. No wasted steps." },
  },
  pf: {
    handles: { drills: ["Face-Up Dribble", "Mid-Post Moves", "Drive and Kick"], focus: "Modern PFs who can put the ball on the floor are nearly impossible to guard.", tip: "Dirk Nowitzki changed the game by developing a dribble. Be different." },
    shooting: { drills: ["Mid-Range Jumpers", "Face-Up Shots", "High Post Game"], focus: "PFs who can step out and shoot force defenses into impossible situations.", tip: "Add a reliable 15-footer and you'll get twice the touches." },
    defense: { drills: ["Help Defense", "Defensive Rebounding", "Defending in Space"], focus: "Anchor the defense. Box out every possession. Own the paint.", tip: "Dennis Rodman was undersized but dominated rebounding through pure effort." },
    athleticism: { drills: ["Box Jumps", "Strength Training", "Explosive Power"], focus: "Physical dominance separates good PFs from great ones. Get strong.", tip: "Squat and deadlift every week. Leg strength = rebounding + post dominance." },
    iq: { drills: ["Positioning", "Pick and Roll Coverage", "Sealing for Position"], focus: "PF IQ is about positioning. Be in the right spot before the ball gets there.", tip: "Tim Duncan averaged 11 rebounds per game purely through positioning, not jumping." },
  },
  c: {
    handles: { drills: ["Post Moves", "Drop Steps", "Hook Shots"], focus: "Centers with post moves are unstoppable in the paint. Master the basics first.", tip: "Hakeem Olajuwon had 15 different post moves. Start with 3 and master them." },
    shooting: { drills: ["Free Throws", "Mid-Range Shots", "High Post Game"], focus: "Centers who shoot free throws and mid-range change entire defenses.", tip: "Shaq's career would have been even greater if he shot 70% from the line." },
    defense: { drills: ["Shot Blocking", "Help Defense", "Box Out Technique"], focus: "Anchor the defense. Every team needs a paint protector. Be that guy.", tip: "Rudy Gobert changed his entire career by becoming the best rim protector alive." },
    athleticism: { drills: ["Vertical Jump", "Strength Training", "Agility Work"], focus: "Combining size with athleticism makes you a top-tier center.", tip: "Work on your feet. Centers with good footwork are twice as effective." },
    iq: { drills: ["Positioning", "Setting Screens", "Reading Pick & Roll"], focus: "Centers set the defense. Call out screens, talk constantly, be the anchor.", tip: "Your communication on defense is more valuable than your stats." },
  },
};

export default function AssessmentPage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  function selectAnswer(questionId: string, value: string) {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 300);
    } else {
      setTimeout(() => setShowResult(true), 300);
    }
  }

  function getResult() {
    const position = answers.position || "sg";
    const weakness = answers.weakness || "shooting";
    const plan = plans[position]?.[weakness];
    return plan;
  }

  function getPositionLabel(pos: string) {
    return questions[0].options.find(o => o.value === pos)?.label || pos.toUpperCase();
  }

  const progress = ((currentQ) / questions.length) * 100;
  const result = getResult();

  if (showResult && result) {
    const posLabel = getPositionLabel(answers.position);
    const weaknessLabel = questions[2].options.find(o => o.value === answers.weakness)?.label || answers.weakness;
    const goalLabel = questions[3].options.find(o => o.value === answers.goal)?.label || answers.goal;

    return (
      <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
        <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid #1a1a1a" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <span style={{ fontSize: "22px" }}>🏀</span>
            <span style={{ fontSize: "18px", fontWeight: 900, background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>HOOPHERO</span>
          </Link>
          <Link href="/dashboard" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Dashboard</Link>
        </nav>

        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎯</div>
            <h1 style={{ fontSize: "36px", fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>Your Personal Plan</h1>
            <p style={{ color: "#666", fontSize: "16px" }}>Built specifically for a <strong style={{ color: "#FF6B00" }}>{posLabel}</strong> who wants to improve their <strong style={{ color: "#FF6B00" }}>{weaknessLabel}</strong></p>
          </div>

          {/* Profile card */}
          <div style={{ background: "linear-gradient(135deg, #1a0a00, #111)", border: "1px solid rgba(255,107,0,0.4)", borderRadius: "20px", padding: "28px", marginBottom: "24px" }}>
            <div style={{ fontSize: "12px", color: "#FF6B00", fontWeight: 700, letterSpacing: "1px", marginBottom: "16px" }}>YOUR PLAYER PROFILE</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "16px" }}>
              {[
                { label: "POSITION", value: posLabel },
                { label: "EXPERIENCE", value: questions[1].options.find(o => o.value === answers.experience)?.label || "" },
                { label: "FOCUS AREA", value: weaknessLabel },
                { label: "GOAL", value: goalLabel },
                { label: "TRAINING DAYS", value: `${answers.days} days/week` },
              ].map(item => (
                <div key={item.label} style={{ textAlign: "center", background: "#0d0d0d", borderRadius: "12px", padding: "14px" }}>
                  <div style={{ fontSize: "10px", color: "#555", fontWeight: 700, letterSpacing: "1px", marginBottom: "6px" }}>{item.label}</div>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: "#fff" }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Plan */}
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "20px", padding: "28px", marginBottom: "24px" }}>
            <div style={{ fontSize: "12px", color: "#10B981", fontWeight: 700, letterSpacing: "1px", marginBottom: "16px" }}>YOUR TRAINING FOCUS</div>
            <p style={{ color: "#ccc", fontSize: "16px", lineHeight: 1.7, margin: "0 0 24px" }}>{result.focus}</p>
            <div style={{ background: "#0d1a0d", border: "1px solid #1a3a1a", borderRadius: "12px", padding: "16px 20px", marginBottom: "24px" }}>
              <p style={{ color: "#10B981", fontSize: "14px", margin: 0, lineHeight: 1.6 }}>💡 <strong>Pro Tip:</strong> {result.tip}</p>
            </div>
            <div style={{ fontSize: "12px", color: "#FF6B00", fontWeight: 700, letterSpacing: "1px", marginBottom: "14px" }}>START WITH THESE DRILLS</div>
            <div style={{ display: "grid", gap: "8px" }}>
              {result.drills.map((drill, i) => (
                <div key={drill} style={{ display: "flex", alignItems: "center", gap: "12px", background: "#0d0d0d", borderRadius: "10px", padding: "12px 16px" }}>
                  <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#FF6B0033", color: "#FF6B00", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}>{drill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: "grid", gap: "12px" }}>
            <Link href="/drills" style={{ display: "block", background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "18px", borderRadius: "14px", fontSize: "17px", fontWeight: 800, textAlign: "center", boxShadow: "0 0 30px rgba(255,107,0,0.3)" }}>
              🏀 START TRAINING NOW →
            </Link>
            <button onClick={() => { setShowResult(false); setCurrentQ(0); setAnswers({}); }} style={{ background: "#111", border: "1px solid #333", color: "#888", padding: "14px", borderRadius: "12px", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid #1a1a1a" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <span style={{ fontSize: "22px" }}>🏀</span>
          <span style={{ fontSize: "18px", fontWeight: 900, background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>HOOPHERO</span>
        </Link>
        <Link href="/dashboard" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Dashboard</Link>
      </nav>

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "60px 24px" }}>
        {/* Progress */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", color: "#555", fontWeight: 600 }}>Question {currentQ + 1} of {questions.length}</span>
            <span style={{ fontSize: "12px", color: "#FF6B00", fontWeight: 600 }}>{Math.round(progress)}% complete</span>
          </div>
          <div style={{ background: "#1a1a1a", borderRadius: "8px", height: "6px", overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #FF6B00, #FFD700)", borderRadius: "8px", transition: "width 0.4s ease" }} />
          </div>
        </div>

        {/* Question */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "52px", marginBottom: "16px" }}>{q.emoji}</div>
          <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#fff", margin: 0 }}>{q.question}</h2>
        </div>

        {/* Options */}
        <div style={{ display: "grid", gap: "12px" }}>
          {q.options.map(option => (
            <button
              key={option.value}
              onClick={() => selectAnswer(q.id, option.value)}
              style={{
                background: answers[q.id] === option.value ? "linear-gradient(135deg, #FF6B0033, #FF6B0011)" : "#111",
                border: `2px solid ${answers[q.id] === option.value ? "#FF6B00" : "#222"}`,
                borderRadius: "14px",
                padding: "18px 22px",
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "all 0.15s",
              }}
            >
              <div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#fff" }}>{option.label}</div>
                <div style={{ fontSize: "13px", color: "#555", marginTop: "2px" }}>{option.desc}</div>
              </div>
              {answers[q.id] === option.value && <span style={{ color: "#FF6B00", fontSize: "20px" }}>✓</span>}
            </button>
          ))}
        </div>

        {currentQ > 0 && (
          <button onClick={() => setCurrentQ(currentQ - 1)} style={{ marginTop: "24px", background: "transparent", border: "none", color: "#555", cursor: "pointer", fontSize: "14px" }}>
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
