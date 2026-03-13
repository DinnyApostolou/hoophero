"use client";
import { useState } from "react";
import Link from "next/link";

const mealPlan = {
  preMeal: {
    title: "Pre-Game / Pre-Workout",
    emoji: "⚡",
    subtitle: "Eat 2-3 hours before. Fuel your engine.",
    color: "#FF6B00",
    meals: [
      {
        name: "Power Oat Bowl",
        time: "2-3 hrs before",
        calories: "450 cal",
        image: "🥣",
        macros: { carbs: "65g", protein: "18g", fat: "9g" },
        ingredients: ["1 cup oats", "1 banana", "2 tbsp peanut butter", "1 cup milk", "Honey drizzle", "Chia seeds"],
        why: "Slow-release carbs = steady energy the whole game. Banana replaces potassium you'll sweat out.",
      },
      {
        name: "Chicken & Rice",
        time: "2-3 hrs before",
        calories: "520 cal",
        image: "🍚",
        macros: { carbs: "70g", protein: "35g", fat: "8g" },
        ingredients: ["1 cup white rice", "150g chicken breast", "Soy sauce", "Broccoli", "Olive oil"],
        why: "The classic athlete meal. White rice = fast fuel. Chicken = muscle maintenance.",
      },
      {
        name: "Whole Wheat Toast + Eggs",
        time: "1-2 hrs before",
        calories: "380 cal",
        image: "🍳",
        macros: { carbs: "40g", protein: "22g", fat: "14g" },
        ingredients: ["2 slices whole wheat bread", "3 eggs scrambled", "Avocado", "Salt & pepper"],
        why: "Quick and easy. Complex carbs + protein keeps you sharp without feeling heavy.",
      },
      {
        name: "Greek Yogurt Parfait",
        time: "1 hr before",
        calories: "320 cal",
        image: "🫙",
        macros: { carbs: "45g", protein: "20g", fat: "5g" },
        ingredients: ["1 cup Greek yogurt", "Granola", "Mixed berries", "Honey", "Almonds"],
        why: "Light but powerful. Berries give you antioxidants. Yogurt has protein for muscles.",
      },
    ]
  },
  postMeal: {
    title: "Post-Game / Post-Workout",
    emoji: "💪",
    subtitle: "Eat within 30-60 mins after. Rebuild and recover.",
    color: "#10B981",
    meals: [
      {
        name: "Protein Recovery Shake",
        time: "Within 30 mins",
        calories: "350 cal",
        image: "🥤",
        macros: { carbs: "40g", protein: "30g", fat: "6g" },
        ingredients: ["Whey protein (1 scoop)", "1 banana", "1 cup milk", "1 tbsp peanut butter", "Ice"],
        why: "Fastest way to start recovery. Gets protein to muscles immediately after training.",
      },
      {
        name: "Salmon + Sweet Potato",
        time: "Within 1 hour",
        calories: "580 cal",
        image: "🐟",
        macros: { carbs: "55g", protein: "38g", fat: "16g" },
        ingredients: ["150g salmon fillet", "1 medium sweet potato", "Asparagus", "Lemon", "Olive oil"],
        why: "Omega-3s in salmon reduce muscle inflammation. Sweet potato restores glycogen stores.",
      },
      {
        name: "Turkey Wrap",
        time: "Within 1 hour",
        calories: "420 cal",
        image: "🌯",
        macros: { carbs: "45g", protein: "32g", fat: "12g" },
        ingredients: ["Whole wheat wrap", "Turkey slices", "Hummus", "Lettuce, tomato, cucumber", "Feta cheese"],
        why: "Quick to make, easy to eat. Great protein-to-carb ratio for muscle rebuilding.",
      },
      {
        name: "Beef Stir Fry + Noodles",
        time: "Within 1-2 hours",
        calories: "620 cal",
        image: "🍜",
        macros: { carbs: "68g", protein: "40g", fat: "15g" },
        ingredients: ["150g lean beef strips", "Rice noodles", "Mixed veggies", "Soy sauce", "Sesame oil", "Ginger"],
        why: "Full recovery meal. Iron from beef helps carry oxygen to muscles. Carbs replenish energy.",
      },
    ]
  },
  snacks: {
    title: "Anytime Snacks",
    emoji: "🍌",
    subtitle: "Between meals and during halftime.",
    color: "#FFD700",
    meals: [
      {
        name: "Banana + Peanut Butter",
        time: "Anytime",
        calories: "200 cal",
        image: "🍌",
        macros: { carbs: "30g", protein: "7g", fat: "8g" },
        ingredients: ["1 banana", "1 tbsp peanut butter"],
        why: "The GOAT snack. Quick carbs + potassium = no cramps.",
      },
      {
        name: "Trail Mix",
        time: "Anytime",
        calories: "250 cal",
        image: "🥜",
        macros: { carbs: "25g", protein: "8g", fat: "15g" },
        ingredients: ["Almonds", "Cashews", "Dark chocolate chips", "Dried cranberries", "Pumpkin seeds"],
        why: "Healthy fats and protein keep energy stable between training sessions.",
      },
      {
        name: "Rice Cakes + Avocado",
        time: "Anytime",
        calories: "180 cal",
        image: "🥑",
        macros: { carbs: "22g", protein: "3g", fat: "10g" },
        ingredients: ["2 rice cakes", "Half avocado", "Salt, pepper, lemon"],
        why: "Light and clean. Healthy fats without feeling sluggish.",
      },
    ]
  }
};

const hydration = [
  { time: "2 hrs before game", amount: "500ml (2 cups)", tip: "Start hydrating early" },
  { time: "30 mins before", amount: "250ml (1 cup)", tip: "Top up your tank" },
  { time: "During (every 20 mins)", amount: "150ml", tip: "Small sips, don't chug" },
  { time: "After game", amount: "500-750ml", tip: "Replace every pound of sweat lost" },
];

export default function NutritionPage() {
  const [activeTab, setActiveTab] = useState("preMeal");

  const tabs = [
    { key: "preMeal", label: "⚡ Pre-Game", color: "#FF6B00" },
    { key: "postMeal", label: "💪 Post-Game", color: "#10B981" },
    { key: "snacks", label: "🍌 Snacks", color: "#FFD700" },
  ];

  const current = mealPlan[activeTab as keyof typeof mealPlan];

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
          <Link href="/schedule" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Schedule</Link>
        </div>
      </nav>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "12px", color: "#10B981", fontWeight: 700, letterSpacing: "1px", marginBottom: "8px" }}>NUTRITION PLANNER</div>
          <h1 style={{ fontSize: "36px", fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>🥗 Eat Like a Pro</h1>
          <p style={{ color: "#666", margin: 0 }}>Meals and timing built for basketball players. What you eat = how you perform.</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "32px", flexWrap: "wrap" }}>
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ background: activeTab === tab.key ? tab.color : "#111", color: activeTab === tab.key ? "#fff" : "#888", border: `1px solid ${activeTab === tab.key ? tab.color : "#333"}`, padding: "10px 20px", borderRadius: "20px", cursor: "pointer", fontSize: "14px", fontWeight: 700 }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Section header */}
        <div style={{ background: `linear-gradient(135deg, #111, #0d0d0d)`, border: `1px solid ${current.color}33`, borderRadius: "16px", padding: "20px 24px", marginBottom: "24px" }}>
          <div style={{ fontSize: "28px", marginBottom: "8px" }}>{current.emoji}</div>
          <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>{current.title}</h2>
          <p style={{ color: "#666", margin: 0, fontSize: "14px" }}>{current.subtitle}</p>
        </div>

        {/* Meal cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginBottom: "48px" }}>
          {current.meals.map((meal) => (
            <div key={meal.name} style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", overflow: "hidden" }}>
              <div style={{ background: `linear-gradient(135deg, ${current.color}22, #111)`, padding: "20px", borderBottom: "1px solid #1a1a1a" }}>
                <div style={{ fontSize: "40px", marginBottom: "8px" }}>{meal.image}</div>
                <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>{meal.name}</h3>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: current.color, fontWeight: 600 }}>{meal.time}</span>
                  <span style={{ color: "#333" }}>·</span>
                  <span style={{ fontSize: "12px", color: "#555" }}>{meal.calories}</span>
                </div>
              </div>
              <div style={{ padding: "16px 20px" }}>
                {/* Macros */}
                <div style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
                  {Object.entries(meal.macros).map(([key, val]) => (
                    <div key={key} style={{ textAlign: "center", flex: 1 }}>
                      <div style={{ fontSize: "15px", fontWeight: 800, color: "#fff" }}>{val}</div>
                      <div style={{ fontSize: "11px", color: "#555", textTransform: "capitalize" }}>{key}</div>
                    </div>
                  ))}
                </div>
                {/* Ingredients */}
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ fontSize: "11px", color: "#555", fontWeight: 600, letterSpacing: "1px", marginBottom: "6px" }}>INGREDIENTS</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {meal.ingredients.map(ing => (
                      <span key={ing} style={{ background: "#1a1a1a", color: "#888", padding: "3px 8px", borderRadius: "6px", fontSize: "12px" }}>{ing}</span>
                    ))}
                  </div>
                </div>
                {/* Why */}
                <div style={{ background: "#0d0d0d", borderRadius: "8px", padding: "10px 12px" }}>
                  <p style={{ color: "#aaa", fontSize: "12px", margin: 0, lineHeight: "1.5" }}>💡 {meal.why}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hydration guide */}
        <div style={{ background: "#0d1a2e", border: "1px solid #1e3a5f", borderRadius: "20px", padding: "28px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>💧 Hydration Guide</h2>
          <p style={{ color: "#4a7fa5", fontSize: "14px", margin: "0 0 20px" }}>Dehydration kills performance. Even 2% dehydrated = 10% drop in performance.</p>
          <div style={{ display: "grid", gap: "12px" }}>
            {hydration.map(h => (
              <div key={h.time} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0a1525", borderRadius: "12px", padding: "14px 18px" }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>{h.time}</div>
                  <div style={{ fontSize: "12px", color: "#4a7fa5", marginTop: "2px" }}>{h.tip}</div>
                </div>
                <div style={{ fontSize: "18px", fontWeight: 800, color: "#3B82F6" }}>{h.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
