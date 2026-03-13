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
      {
        name: "Pasta with Turkey Bolognese",
        time: "2-3 hrs before",
        calories: "580 cal",
        image: "🍝",
        macros: { carbs: "80g", protein: "32g", fat: "10g" },
        ingredients: ["1.5 cups whole wheat pasta", "100g ground turkey", "Tomato sauce", "Parmesan", "Olive oil"],
        why: "Carb-loading classic. Pasta stores glycogen that fuels your entire game.",
      },
      {
        name: "Peanut Butter Banana Smoothie",
        time: "1 hr before",
        calories: "390 cal",
        image: "🥤",
        macros: { carbs: "52g", protein: "16g", fat: "12g" },
        ingredients: ["2 bananas", "2 tbsp peanut butter", "1 cup milk", "1 tsp honey", "Ice"],
        why: "Easy to digest before a game. Won't sit heavy but gives massive energy.",
      },
      {
        name: "Sweet Potato + Ground Beef",
        time: "2-3 hrs before",
        calories: "490 cal",
        image: "🍠",
        macros: { carbs: "55g", protein: "30g", fat: "14g" },
        ingredients: ["1 large sweet potato", "120g lean ground beef", "Spinach", "Garlic", "Olive oil"],
        why: "Sweet potato = natural sugar + fiber for sustained energy. Iron from beef boosts oxygen delivery.",
      },
      {
        name: "Bagel with Salmon & Cream Cheese",
        time: "2 hrs before",
        calories: "430 cal",
        image: "🥯",
        macros: { carbs: "50g", protein: "28g", fat: "13g" },
        ingredients: ["1 whole wheat bagel", "80g smoked salmon", "Cream cheese", "Capers", "Cucumber"],
        why: "High quality carbs + omega-3s from salmon reduce pre-game inflammation.",
      },
      {
        name: "Rice Cakes with Almond Butter",
        time: "30-60 mins before",
        calories: "280 cal",
        image: "🍘",
        macros: { carbs: "38g", protein: "8g", fat: "11g" },
        ingredients: ["4 rice cakes", "2 tbsp almond butter", "Sliced banana", "Cinnamon"],
        why: "Perfect light pre-game snack. Easy on the stomach, fast energy.",
      },
      {
        name: "Quinoa Power Bowl",
        time: "2-3 hrs before",
        calories: "510 cal",
        image: "🥗",
        macros: { carbs: "62g", protein: "28g", fat: "12g" },
        ingredients: ["1 cup quinoa", "Grilled chicken", "Roasted veggies", "Lemon tahini dressing", "Chickpeas"],
        why: "Quinoa is a complete protein with all 9 amino acids. Sustained energy + muscle support.",
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
      {
        name: "Chicken Burrito Bowl",
        time: "Within 1 hour",
        calories: "590 cal",
        image: "🫕",
        macros: { carbs: "65g", protein: "42g", fat: "14g" },
        ingredients: ["Grilled chicken", "Brown rice", "Black beans", "Salsa", "Greek yogurt (instead of sour cream)", "Avocado"],
        why: "Black beans + chicken = double the protein. Huge carb refuel after intense session.",
      },
      {
        name: "Tuna Pasta",
        time: "Within 1-2 hours",
        calories: "520 cal",
        image: "🍝",
        macros: { carbs: "60g", protein: "38g", fat: "10g" },
        ingredients: ["1.5 cups whole wheat pasta", "1 can tuna", "Cherry tomatoes", "Olive oil", "Lemon", "Capers"],
        why: "Tuna is one of the best lean proteins. Budget-friendly and takes 10 mins to make.",
      },
      {
        name: "Egg Fried Rice",
        time: "Within 1 hour",
        calories: "480 cal",
        image: "🍳",
        macros: { carbs: "58g", protein: "24g", fat: "16g" },
        ingredients: ["2 cups cooked rice", "3 eggs", "Mixed veggies", "Soy sauce", "Sesame oil", "Spring onion"],
        why: "Eggs are one of the most bioavailable proteins. Rice replenishes every carb you burned.",
      },
      {
        name: "Greek Chicken Plate",
        time: "Within 1-2 hours",
        calories: "510 cal",
        image: "🫙",
        macros: { carbs: "40g", protein: "45g", fat: "16g" },
        ingredients: ["Grilled chicken thighs", "Greek salad", "Pita bread", "Tzatziki", "Olives", "Feta"],
        why: "High protein from chicken thighs. Greek yogurt in tzatziki adds extra protein bonus.",
      },
      {
        name: "Cottage Cheese Toast",
        time: "Within 30-60 mins",
        calories: "310 cal",
        image: "🍞",
        macros: { carbs: "32g", protein: "26g", fat: "7g" },
        ingredients: ["2 slices sourdough", "1 cup cottage cheese", "Cherry tomatoes", "Everything bagel seasoning"],
        why: "Cottage cheese is loaded with casein protein — slow digesting, feeds muscles for hours.",
      },
      {
        name: "Overnight Oats (Recovery Edition)",
        time: "Next morning",
        calories: "440 cal",
        image: "🥣",
        macros: { carbs: "58g", protein: "22g", fat: "10g" },
        ingredients: ["1 cup oats", "Greek yogurt", "Chia seeds", "Whey protein scoop", "Berries", "Honey"],
        why: "Prep the night before so you wake up to instant recovery food. Great for game day mornings.",
      },
    ]
  },
  snacks: {
    title: "Anytime Snacks",
    emoji: "🍌",
    subtitle: "Between meals, halftime, and pre-bed fuel.",
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
      {
        name: "Hard Boiled Eggs",
        time: "Anytime",
        calories: "140 cal",
        image: "🥚",
        macros: { carbs: "1g", protein: "12g", fat: "10g" },
        ingredients: ["2 eggs", "Salt & pepper", "Hot sauce optional"],
        why: "Pure portable protein. Prep a batch on Sunday for the whole week.",
      },
      {
        name: "Apple + Almond Butter",
        time: "Anytime",
        calories: "210 cal",
        image: "🍎",
        macros: { carbs: "28g", protein: "5g", fat: "9g" },
        ingredients: ["1 large apple", "1.5 tbsp almond butter"],
        why: "Natural sugar from apple for quick energy. Almond butter slows the crash.",
      },
      {
        name: "Chocolate Milk",
        time: "Right after training",
        calories: "190 cal",
        image: "🍫",
        macros: { carbs: "30g", protein: "8g", fat: "5g" },
        ingredients: ["1 cup low-fat milk", "2 tbsp chocolate syrup"],
        why: "Scientifically proven recovery drink. Perfect 3:1 carb-to-protein ratio.",
      },
      {
        name: "Edamame",
        time: "Anytime",
        calories: "180 cal",
        image: "🫘",
        macros: { carbs: "14g", protein: "17g", fat: "8g" },
        ingredients: ["1.5 cups edamame", "Sea salt", "Soy sauce dip"],
        why: "Highest protein plant snack. Feels like a treat but is secretly elite fuel.",
      },
      {
        name: "Tuna + Crackers",
        time: "Anytime",
        calories: "220 cal",
        image: "🐟",
        macros: { carbs: "20g", protein: "22g", fat: "6g" },
        ingredients: ["1 can tuna", "Whole grain crackers", "Lemon juice", "Mayo or mustard"],
        why: "Ridiculous protein for the calories. One of the best snacks for any athlete.",
      },
      {
        name: "Cheese + Fruit Board",
        time: "Anytime",
        calories: "260 cal",
        image: "🧀",
        macros: { carbs: "24g", protein: "12g", fat: "13g" },
        ingredients: ["Cheddar or mozzarella", "Grapes", "Apple slices", "Whole grain crackers"],
        why: "Balanced macro snack. The protein and fat from cheese steadies blood sugar.",
      },
      {
        name: "Protein Overnight Mug Cake",
        time: "Pre-bed snack",
        calories: "290 cal",
        image: "🍰",
        macros: { carbs: "28g", protein: "24g", fat: "8g" },
        ingredients: ["1 scoop protein powder", "1 egg", "2 tbsp oats", "1 tbsp cocoa", "Milk to mix"],
        why: "Hits the sweet craving while loading casein protein for overnight muscle repair.",
      },
      {
        name: "Smoothie Bowl",
        time: "Morning or post-workout",
        calories: "370 cal",
        image: "🍓",
        macros: { carbs: "55g", protein: "14g", fat: "8g" },
        ingredients: ["Frozen berries", "Banana", "Greek yogurt", "Granola topping", "Honey", "Coconut flakes"],
        why: "Antioxidants from berries reduce soreness. Looks amazing for zero effort.",
      },
      {
        name: "Hummus + Veggie Sticks",
        time: "Anytime",
        calories: "160 cal",
        image: "🥕",
        macros: { carbs: "18g", protein: "7g", fat: "7g" },
        ingredients: ["4 tbsp hummus", "Carrots", "Celery", "Bell pepper strips", "Cucumber"],
        why: "High fiber keeps you full. Chickpeas in hummus = solid plant protein.",
      },
    ]
  },
  breakfast: {
    title: "Power Breakfasts",
    emoji: "🌅",
    subtitle: "Start every day like an athlete. Never skip breakfast.",
    color: "#8B5CF6",
    meals: [
      {
        name: "Steak & Eggs",
        time: "Morning",
        calories: "550 cal",
        image: "🥩",
        macros: { carbs: "5g", protein: "52g", fat: "35g" },
        ingredients: ["150g sirloin steak", "3 eggs", "Spinach", "Butter", "Salt & pepper"],
        why: "Pro athlete breakfast. High protein from the jump starts muscle synthesis all day.",
      },
      {
        name: "Acai Bowl",
        time: "Morning",
        calories: "420 cal",
        image: "🫐",
        macros: { carbs: "60g", protein: "12g", fat: "14g" },
        ingredients: ["Acai packet", "Banana", "Mixed berries", "Granola", "Honey", "Coconut flakes", "Almond milk"],
        why: "Acai is loaded with antioxidants that reduce inflammation and speed recovery.",
      },
      {
        name: "Avocado Egg Toast",
        time: "Morning",
        calories: "390 cal",
        image: "🥑",
        macros: { carbs: "35g", protein: "20g", fat: "20g" },
        ingredients: ["2 sourdough slices", "1 avocado", "2 poached eggs", "Chili flakes", "Lemon", "Salt"],
        why: "Healthy fats from avocado + protein from eggs = perfect brain and body fuel.",
      },
      {
        name: "Protein Pancakes",
        time: "Morning",
        calories: "460 cal",
        image: "🥞",
        macros: { carbs: "48g", protein: "30g", fat: "12g" },
        ingredients: ["1 scoop protein powder", "1 banana", "2 eggs", "1/2 cup oats", "Blueberries", "Maple syrup"],
        why: "Feels like a cheat meal but is pure athlete fuel. High protein, great taste.",
      },
      {
        name: "Breakfast Burrito",
        time: "Morning",
        calories: "510 cal",
        image: "🌯",
        macros: { carbs: "50g", protein: "32g", fat: "18g" },
        ingredients: ["Large tortilla", "3 scrambled eggs", "Turkey bacon", "Cheddar", "Salsa", "Avocado"],
        why: "Portable and filling. Eat on the way to morning practice.",
      },
      {
        name: "Bircher Muesli",
        time: "Morning (prep night before)",
        calories: "380 cal",
        image: "🥣",
        macros: { carbs: "55g", protein: "16g", fat: "9g" },
        ingredients: ["1 cup rolled oats", "Apple juice", "Greek yogurt", "Grated apple", "Raisins", "Cinnamon"],
        why: "Soak overnight, grab in the morning. Slow carbs = no energy crash before practice.",
      },
    ]
  },
};

const hydration = [
  { time: "Wake up", amount: "500ml (2 cups)", tip: "You're dehydrated after sleep — fix it immediately" },
  { time: "2 hrs before game", amount: "500ml (2 cups)", tip: "Start hydrating early" },
  { time: "30 mins before", amount: "250ml (1 cup)", tip: "Top up your tank" },
  { time: "During (every 20 mins)", amount: "150-200ml", tip: "Small sips, don't chug" },
  { time: "Halftime", amount: "300ml", tip: "Also have a banana or sports gel" },
  { time: "After game", amount: "500-750ml", tip: "Replace every pound of sweat lost" },
  { time: "Before bed", amount: "250ml", tip: "Hydration during sleep = faster recovery" },
];

export default function NutritionPage() {
  const [activeTab, setActiveTab] = useState("preMeal");

  const tabs = [
    { key: "preMeal", label: "⚡ Pre-Game", color: "#FF6B00" },
    { key: "postMeal", label: "💪 Post-Game", color: "#10B981" },
    { key: "snacks", label: "🍌 Snacks", color: "#FFD700" },
    { key: "breakfast", label: "🌅 Breakfast", color: "#8B5CF6" },
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
          <p style={{ color: "#666", margin: 0 }}>40+ meals built for basketball players. What you eat = how you perform.</p>
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
          <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>💧 Full Day Hydration Guide</h2>
          <p style={{ color: "#4a7fa5", fontSize: "14px", margin: "0 0 20px" }}>Dehydration kills performance. Even 2% dehydrated = 10% drop in performance. Here&apos;s exactly when to drink.</p>
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
