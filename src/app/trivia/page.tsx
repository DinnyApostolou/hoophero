"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

type Question = {
  id: number;
  category: string;
  question: string;
  options: string[];
  answer: number;
  xp: number;
};

const QUESTIONS: Question[] = [
  // NBA HISTORY
  { id: 1, category: "NBA HISTORY", question: "How many NBA championships did Michael Jordan win?", options: ["4", "5", "6", "7"], answer: 2, xp: 10 },
  { id: 2, category: "NBA HISTORY", question: "Which player scored 100 points in a single NBA game?", options: ["Kareem Abdul-Jabbar", "Wilt Chamberlain", "Michael Jordan", "LeBron James"], answer: 1, xp: 10 },
  { id: 3, category: "NBA HISTORY", question: "What year was the NBA founded?", options: ["1944", "1946", "1949", "1952"], answer: 1, xp: 10 },
  { id: 4, category: "NBA HISTORY", question: "Which team has won the most NBA championships?", options: ["Los Angeles Lakers", "Chicago Bulls", "Boston Celtics", "Golden State Warriors"], answer: 2, xp: 10 },
  { id: 5, category: "NBA HISTORY", question: "Who was the first pick in the 2003 NBA Draft?", options: ["Dwyane Wade", "Carmelo Anthony", "LeBron James", "Chris Bosh"], answer: 2, xp: 10 },
  { id: 6, category: "NBA HISTORY", question: "Which player holds the record for most career NBA points?", options: ["Michael Jordan", "Kareem Abdul-Jabbar", "LeBron James", "Karl Malone"], answer: 2, xp: 10 },
  { id: 7, category: "NBA HISTORY", question: "What was the original name of the Utah Jazz?", options: ["New Orleans Jazz", "Memphis Jazz", "Houston Jazz", "Dallas Jazz"], answer: 0, xp: 10 },
  { id: 8, category: "NBA HISTORY", question: "Who coached the Chicago Bulls during all 6 of their championships?", options: ["Larry Brown", "Pat Riley", "Phil Jackson", "Doc Rivers"], answer: 2, xp: 10 },
  { id: 9, category: "NBA HISTORY", question: "Which player was nicknamed 'The Mailman'?", options: ["Charles Barkley", "Patrick Ewing", "Karl Malone", "John Stockton"], answer: 2, xp: 10 },
  { id: 10, category: "NBA HISTORY", question: "Kobe Bryant wore #8 and which other number?", options: ["10", "24", "33", "23"], answer: 1, xp: 10 },

  // PLAYERS
  { id: 11, category: "PLAYERS", question: "What position does LeBron James primarily play?", options: ["Point Guard", "Shooting Guard", "Small Forward", "Center"], answer: 2, xp: 10 },
  { id: 12, category: "PLAYERS", question: "Stephen Curry is known for his elite skill in which area?", options: ["Dunking", "Defense", "Three-point shooting", "Post moves"], answer: 2, xp: 10 },
  { id: 13, category: "PLAYERS", question: "Which player is nicknamed 'The Greek Freak'?", options: ["Joel Embiid", "Nikola Jokic", "Giannis Antetokounmpo", "Rudy Gobert"], answer: 2, xp: 10 },
  { id: 14, category: "PLAYERS", question: "Who has won the most NBA MVP awards?", options: ["LeBron James", "Michael Jordan", "Kareem Abdul-Jabbar", "Bill Russell"], answer: 2, xp: 10 },
  { id: 15, category: "PLAYERS", question: "Which player was nicknamed 'Black Mamba'?", options: ["LeBron James", "Kobe Bryant", "Dwyane Wade", "Allen Iverson"], answer: 1, xp: 10 },
  { id: 16, category: "PLAYERS", question: "Shaquille O'Neal was drafted by which team?", options: ["LA Lakers", "Orlando Magic", "Miami Heat", "Phoenix Suns"], answer: 1, xp: 10 },
  { id: 17, category: "PLAYERS", question: "Allen Iverson's signature move that drove defenders crazy was called the?", options: ["Ankle Breaker", "Crossover", "Step-back", "Euro Step"], answer: 1, xp: 10 },
  { id: 18, category: "PLAYERS", question: "Which player scored 81 points in a single game in 2006?", options: ["LeBron James", "Allen Iverson", "Tracy McGrady", "Kobe Bryant"], answer: 3, xp: 10 },
  { id: 19, category: "PLAYERS", question: "Who is the all-time leader in NBA assists?", options: ["Magic Johnson", "John Stockton", "Steve Nash", "Jason Kidd"], answer: 1, xp: 10 },
  { id: 20, category: "PLAYERS", question: "Kevin Durant is how tall?", options: ["6'7\"", "6'9\"", "6'11\"", "7'0\""], answer: 2, xp: 10 },

  // RULES
  { id: 21, category: "RULES", question: "How many seconds does an NBA team have to shoot after getting the ball?", options: ["18 seconds", "21 seconds", "24 seconds", "30 seconds"], answer: 2, xp: 10 },
  { id: 22, category: "RULES", question: "How many players from each team are on the court at one time?", options: ["4", "5", "6", "7"], answer: 1, xp: 10 },
  { id: 23, category: "RULES", question: "How many fouls can a player commit before fouling out in the NBA?", options: ["4", "5", "6", "7"], answer: 2, xp: 10 },
  { id: 24, category: "RULES", question: "How many points is a basket worth if scored beyond the 3-point line?", options: ["2", "3", "4", "5"], answer: 1, xp: 10 },
  { id: 25, category: "RULES", question: "What is a 'double-dribble' violation?", options: ["Bouncing the ball with two hands or dribbling again after stopping", "Bouncing too high", "Dribbling with your back to the basket", "Using your foot"], answer: 0, xp: 10 },
  { id: 26, category: "RULES", question: "How many seconds does a player have to inbound the ball?", options: ["3 seconds", "5 seconds", "8 seconds", "10 seconds"], answer: 1, xp: 10 },
  { id: 27, category: "RULES", question: "What happens when a player palms or carries the ball?", options: ["Free throw", "Turnover — the other team gets the ball", "Technical foul", "Warning"], answer: 1, xp: 10 },
  { id: 28, category: "RULES", question: "How many quarters are in an NBA game?", options: ["2", "3", "4", "5"], answer: 2, xp: 10 },
  { id: 29, category: "RULES", question: "How long is each quarter in the NBA?", options: ["10 minutes", "12 minutes", "15 minutes", "20 minutes"], answer: 1, xp: 10 },
  { id: 30, category: "RULES", question: "What is the 3-second rule in basketball?", options: ["You must shoot in 3 seconds", "An offensive player can't stay in the paint for more than 3 seconds", "The ball must be advanced in 3 seconds", "You can't hold the ball for 3 seconds"], answer: 1, xp: 10 },

  // TEAMS
  { id: 31, category: "TEAMS", question: "What is the home city of the Golden State Warriors?", options: ["Los Angeles", "San Francisco / Oakland", "Sacramento", "San Diego"], answer: 1, xp: 10 },
  { id: 32, category: "TEAMS", question: "What are the Chicago Bulls' team colors?", options: ["Blue and Gold", "Red and Black", "Purple and Black", "Green and White"], answer: 1, xp: 10 },
  { id: 33, category: "TEAMS", question: "The Miami Heat are in which NBA division?", options: ["Atlantic Division", "Central Division", "Southeast Division", "Pacific Division"], answer: 2, xp: 10 },
  { id: 34, category: "TEAMS", question: "Which team drafted Stephen Curry in 2009?", options: ["Oklahoma City Thunder", "Memphis Grizzlies", "Golden State Warriors", "Charlotte Bobcats"], answer: 2, xp: 10 },
  { id: 35, category: "TEAMS", question: "The Los Angeles Lakers' colors are purple and what?", options: ["Blue", "Gold", "Silver", "White"], answer: 1, xp: 10 },
  { id: 36, category: "TEAMS", question: "Which team is nicknamed 'The Knicks'?", options: ["New York", "New Jersey", "Brooklyn", "Boston"], answer: 0, xp: 10 },
  { id: 37, category: "TEAMS", question: "Where do the San Antonio Spurs play their home games?", options: ["Dallas", "Houston", "San Antonio", "Austin"], answer: 2, xp: 10 },
  { id: 38, category: "TEAMS", question: "The Toronto Raptors are the only NBA team located in which country?", options: ["Mexico", "Canada", "England", "Australia"], answer: 1, xp: 10 },
  { id: 39, category: "TEAMS", question: "Which NBA team is known as 'The Thunder'?", options: ["Denver", "Portland", "Utah", "Oklahoma City"], answer: 3, xp: 10 },
  { id: 40, category: "TEAMS", question: "The Boston Celtics have won how many NBA championships total?", options: ["14", "16", "17", "18"], answer: 3, xp: 10 },

  // SKILLS
  { id: 41, category: "SKILLS", question: "What does 'BEEF' stand for in shooting technique?", options: ["Balance, Eyes, Elbow, Follow-through", "Bend, Extend, Elbow, Fire", "Body, Eyes, Effort, Follow", "Base, Elbow, Eyes, Finish"], answer: 0, xp: 10 },
  { id: 42, category: "SKILLS", question: "What is a 'triple threat position'?", options: ["Being able to dribble, pass, or shoot from your stance", "Guarding three players at once", "Scoring in three different ways in a game", "A three-pointer late in a game"], answer: 0, xp: 10 },
  { id: 43, category: "SKILLS", question: "When driving to the basket, what move involves two steps in different directions?", options: ["Spin move", "Euro step", "Drop step", "Jab step"], answer: 1, xp: 10 },
  { id: 44, category: "SKILLS", question: "What does it mean to 'box out'?", options: ["Playing in the paint area", "Using your body to block a defender from getting a rebound", "Dribbling out of bounds intentionally", "Holding the ball near the sideline"], answer: 1, xp: 10 },
  { id: 45, category: "SKILLS", question: "What is the correct way to hold the ball when shooting?", options: ["Grip the ball with your palm flat", "Fingertips on the ball, with space between palm and ball", "Squeeze the ball tightly with both hands", "Hold it loosely in your fingertips only"], answer: 1, xp: 10 },
  { id: 46, category: "SKILLS", question: "What is a 'pick and roll'?", options: ["A move where you spin away from defenders", "A player sets a screen, then rolls to the basket for a pass", "Rolling the ball on the floor as a pass", "A defensive move to switch opponents"], answer: 1, xp: 10 },
  { id: 47, category: "SKILLS", question: "What is the best defensive stance for guarding a ball handler?", options: ["Stand straight up to see the court better", "Bend knees, wide base, stay between your man and the basket", "Stand on your toes for quick movement", "Cross your feet to move quickly side to side"], answer: 1, xp: 10 },
  { id: 48, category: "SKILLS", question: "What does it mean to 'read the defense'?", options: ["Reading a scouting report before a game", "Watching the defender's movements to decide your next action", "Guarding a player who can't shoot", "Dribbling slowly to waste time"], answer: 1, xp: 10 },
  { id: 49, category: "SKILLS", question: "Why is it important to dribble with your head up?", options: ["So you look more confident", "To see teammates, defenders, and the whole court", "To avoid getting called for a travel", "Coaches prefer it"], answer: 1, xp: 10 },
  { id: 50, category: "SKILLS", question: "What is the purpose of a shot fake?", options: ["To waste time on the shot clock", "To get the defender in the air so you can drive or draw a foul", "To practice your shooting motion", "To confuse your own teammates"], answer: 1, xp: 10 },
];

const catColors: Record<string, string> = {
  "NBA HISTORY": "#FFD700",
  "PLAYERS": "#FF6B00",
  "RULES": "#3B82F6",
  "TEAMS": "#10B981",
  "SKILLS": "#8B5CF6",
};

const CATEGORIES = ["ALL", "NBA HISTORY", "PLAYERS", "RULES", "TEAMS", "SKILLS"];

export default function TriviaPage() {
  const [filter, setFilter] = useState("ALL");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [answered, setAnswered] = useState<Set<number>>(new Set());
  const [userId, setUserId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizResults, setQuizResults] = useState<{ correct: number; total: number; xp: number }>({ correct: 0, total: 0, xp: 0 });

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    }
    load();
  }, []);

  const filtered = filter === "ALL" ? QUESTIONS : QUESTIONS.filter(q => q.category === filter);

  async function awardXP(amount: number) {
    if (!userId) return;
    const supabase = createClient();
    const { data: profile } = await supabase.from("profiles").select("xp").eq("id", userId).single();
    if (profile) {
      await supabase.from("profiles").update({ xp: profile.xp + amount }).eq("id", userId);
    }
  }

  function startQuiz() {
    setCurrentIdx(0);
    setSelected(null);
    setScore(0);
    setTotalXP(0);
    setQuizMode(true);
    setQuizComplete(false);
  }

  function handleAnswer(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    const q = filtered[currentIdx];
    const correct = idx === q.answer;
    if (correct) {
      setScore(s => s + 1);
      setTotalXP(x => x + q.xp);
      setAnswered(prev => new Set([...prev, q.id]));
    }
  }

  async function nextQuestion() {
    if (currentIdx + 1 >= filtered.length) {
      // Quiz done
      await awardXP(totalXP + (selected === filtered[currentIdx].answer ? filtered[currentIdx].xp : 0));
      const finalXP = totalXP + (selected === filtered[currentIdx].answer ? filtered[currentIdx].xp : 0);
      const finalScore = score + (selected === filtered[currentIdx].answer ? 1 : 0);
      setQuizResults({ correct: finalScore, total: filtered.length, xp: finalXP });
      setQuizComplete(true);
      setQuizMode(false);
      if (finalXP > 0) {
        setToast(`Quiz done! +${finalXP} XP earned! 🎉`);
        setTimeout(() => setToast(null), 4000);
      }
    } else {
      setCurrentIdx(i => i + 1);
      setSelected(null);
    }
  }

  const currentQ = filtered[currentIdx];

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {toast && (
        <div style={{ position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)", background: "#FF6B00", color: "#fff", padding: "14px 28px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", zIndex: 9999, boxShadow: "0 0 30px rgba(255,107,0,0.6)", whiteSpace: "nowrap" }}>
          {toast}
        </div>
      )}

      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid #1a1a1a" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <span style={{ fontSize: "22px" }}>🏀</span>
          <span style={{ fontSize: "18px", fontWeight: 900, background: "linear-gradient(90deg, #FF6B00, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>HOOPHERO</span>
        </Link>
        <div style={{ display: "flex", gap: "16px" }}>
          <Link href="/dashboard" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Dashboard</Link>
          <Link href="/drills" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Drills</Link>
          <Link href="/leaderboard" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Leaderboard</Link>
        </div>
      </nav>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "40px", fontWeight: 900, color: "#fff", margin: "0 0 8px", letterSpacing: "-1px" }}>🧠 BASKETBALL TRIVIA</h1>
          <p style={{ color: "#666", margin: "0 0 24px" }}>Test your knowledge. Earn <span style={{ color: "#FF6B00", fontWeight: 700 }}>+10 XP</span> per correct answer.</p>
        </div>

        {/* Category filters */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "32px", flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => { setFilter(cat); setQuizMode(false); setQuizComplete(false); setCurrentIdx(0); setSelected(null); }}
              style={{ background: filter === cat ? (catColors[cat] || "#FF6B00") : "#111", border: `1px solid ${filter === cat ? (catColors[cat] || "#FF6B00") : "#222"}`, color: filter === cat ? "#fff" : "#666", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 700 }}>
              {cat} {cat !== "ALL" && `(${QUESTIONS.filter(q => q.category === cat).length})`}
            </button>
          ))}
        </div>

        {/* Quiz complete */}
        {quizComplete && (
          <div style={{ background: "#111", border: "2px solid rgba(255,107,0,0.4)", borderRadius: "20px", padding: "48px", textAlign: "center", marginBottom: "32px" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>🏆</div>
            <h2 style={{ fontSize: "32px", fontWeight: 900, color: "#fff", marginBottom: "8px" }}>Quiz Complete!</h2>
            <p style={{ color: "#888", fontSize: "18px", marginBottom: "24px" }}>
              {quizResults.correct}/{quizResults.total} correct
            </p>
            <div style={{ fontSize: "36px", fontWeight: 900, color: "#FF6B00", marginBottom: "24px" }}>+{quizResults.xp} XP</div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={startQuiz} style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", border: "none", borderRadius: "10px", padding: "14px 28px", fontSize: "15px", fontWeight: 800, cursor: "pointer" }}>
                Play Again
              </button>
              <Link href="/dashboard" style={{ background: "#1a1a1a", color: "#fff", textDecoration: "none", padding: "14px 28px", borderRadius: "10px", fontSize: "15px", fontWeight: 700, border: "1px solid #333" }}>
                Back to Dashboard
              </Link>
            </div>
          </div>
        )}

        {/* Quiz in progress */}
        {quizMode && currentQ && (
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "20px", padding: "40px", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
              <span style={{ fontSize: "13px", color: catColors[currentQ.category] || "#FF6B00", fontWeight: 700 }}>{currentQ.category}</span>
              <span style={{ fontSize: "13px", color: "#555" }}>Question {currentIdx + 1} of {filtered.length}</span>
            </div>

            {/* Progress bar */}
            <div style={{ background: "#1a1a1a", borderRadius: "4px", height: "4px", marginBottom: "28px", overflow: "hidden" }}>
              <div style={{ width: `${((currentIdx + 1) / filtered.length) * 100}%`, height: "100%", background: "#FF6B00", transition: "width 0.3s" }} />
            </div>

            <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", marginBottom: "28px", lineHeight: 1.4 }}>{currentQ.question}</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
              {currentQ.options.map((opt, i) => {
                let bg = "#1a1a1a";
                let border = "1px solid #333";
                let color = "#ccc";
                if (selected !== null) {
                  if (i === currentQ.answer) { bg = "rgba(16,185,129,0.15)"; border = "1px solid #10B981"; color = "#10B981"; }
                  else if (i === selected && i !== currentQ.answer) { bg = "rgba(239,68,68,0.15)"; border = "1px solid #EF4444"; color = "#EF4444"; }
                }
                return (
                  <button key={i} onClick={() => handleAnswer(i)} disabled={selected !== null}
                    style={{ background: bg, border, borderRadius: "12px", padding: "16px 20px", textAlign: "left", cursor: selected !== null ? "default" : "pointer", color, fontSize: "15px", fontWeight: 600, transition: "all 0.2s" }}>
                    <span style={{ marginRight: "12px", opacity: 0.5 }}>{["A", "B", "C", "D"][i]}.</span>
                    {opt}
                    {selected !== null && i === currentQ.answer && <span style={{ float: "right" }}>✓</span>}
                    {selected !== null && i === selected && i !== currentQ.answer && <span style={{ float: "right" }}>✗</span>}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "15px", fontWeight: 700, color: selected === currentQ.answer ? "#10B981" : "#EF4444" }}>
                  {selected === currentQ.answer ? "✅ Correct! +10 XP" : `❌ The answer was: ${currentQ.options[currentQ.answer]}`}
                </div>
                <button onClick={nextQuestion} style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", border: "none", borderRadius: "10px", padding: "12px 24px", fontSize: "14px", fontWeight: 800, cursor: "pointer" }}>
                  {currentIdx + 1 >= filtered.length ? "See Results" : "Next →"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Start quiz or browse */}
        {!quizMode && !quizComplete && (
          <>
            <div style={{ background: "linear-gradient(135deg, #111 0%, #1a0f00 100%)", border: "1px solid rgba(255,107,0,0.3)", borderRadius: "20px", padding: "36px", marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
              <div>
                <div style={{ fontSize: "12px", color: "#FF6B00", letterSpacing: "1px", marginBottom: "8px", fontWeight: 700 }}>READY TO TEST YOUR KNOWLEDGE?</div>
                <h2 style={{ fontSize: "24px", fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>
                  {filtered.length} Questions · {filter} Category
                </h2>
                <p style={{ color: "#666", margin: 0 }}>Max possible: <span style={{ color: "#FF6B00", fontWeight: 700 }}>{filtered.length * 10} XP</span></p>
              </div>
              <button onClick={startQuiz} style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", border: "none", borderRadius: "12px", padding: "16px 32px", fontSize: "16px", fontWeight: 800, cursor: "pointer", boxShadow: "0 0 20px rgba(255,107,0,0.4)", whiteSpace: "nowrap" }}>
                START QUIZ →
              </button>
            </div>

            {/* Question list preview */}
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#888", letterSpacing: "1px", marginBottom: "16px" }}>ALL QUESTIONS</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {filtered.map((q, i) => (
                <div key={q.id} style={{ background: answered.has(q.id) ? "rgba(16,185,129,0.05)" : "#111", border: `1px solid ${answered.has(q.id) ? "rgba(16,185,129,0.3)" : "#1a1a1a"}`, borderRadius: "12px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "13px", color: "#444", width: "24px", flexShrink: 0 }}>#{i + 1}</span>
                  <span style={{ fontSize: "11px", color: catColors[q.category], fontWeight: 700, width: "90px", flexShrink: 0 }}>{q.category}</span>
                  <span style={{ fontSize: "14px", color: answered.has(q.id) ? "#10B981" : "#ccc", flex: 1 }}>{q.question}</span>
                  {answered.has(q.id) && <span style={{ fontSize: "12px", color: "#10B981", fontWeight: 700 }}>✓ +10 XP</span>}
                  {!answered.has(q.id) && <span style={{ fontSize: "12px", color: "#444" }}>+10 XP</span>}
                </div>
              ))}
            </div>
          </>
        )}

        {!userId && (
          <div style={{ textAlign: "center", marginTop: "40px", background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "32px" }}>
            <p style={{ color: "#888", marginBottom: "16px", fontSize: "16px" }}>Log in to earn XP for correct answers</p>
            <Link href="/signup" style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "14px 32px", borderRadius: "10px", fontSize: "15px", fontWeight: 800 }}>
              Create Free Account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
