"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

const DRILLS = [
  // ── DRIBBLING (12) ──────────────────────────────────────────────
  {
    id: 1, category: "DRIBBLING", icon: "🏀", title: "Two-Ball Stationary Dribble",
    difficulty: "Beginner", time: "5 min",
    desc: "Dribble both balls simultaneously without looking down. Builds hand independence and control.",
    steps: ["Stand shoulder-width apart with one ball in each hand", "Dribble both balls at the same time at waist height", "Keep your head up and eyes forward — no looking at the ball", "Do 3 sets of 1 minute, rest 30 seconds between sets"],
    xp: 50,
  },
  {
    id: 2, category: "DRIBBLING", icon: "⚡", title: "Figure 8 Speed Dribble",
    difficulty: "Intermediate", time: "5 min",
    desc: "Weave the ball through your legs in a figure-8 pattern as fast as possible without losing control.",
    steps: ["Stand with feet wider than shoulder-width", "Pass the ball through your legs in a figure-8 pattern", "Gradually increase your speed each round", "Do 3 sets of 30 seconds — count your reps each set"],
    xp: 50,
  },
  {
    id: 3, category: "DRIBBLING", icon: "💨", title: "Crossover Attack Drill",
    difficulty: "Intermediate", time: "8 min",
    desc: "Simulate game-speed crossover moves attacking defenders. React, cross, and explode past.",
    steps: ["Set up 3 cones in a line, 5 feet apart", "Dribble toward first cone hard and fast", "Execute a sharp crossover at the cone", "Explode past it to the next cone — 5 reps each side x3 sets"],
    xp: 50,
  },
  {
    id: 4, category: "DRIBBLING", icon: "🔄", title: "Between the Legs Walking",
    difficulty: "Beginner", time: "5 min",
    desc: "Dribble between your legs with every step you take. Forces coordination between dribbling and movement.",
    steps: ["Start at one end of the court", "With each step forward, pass the ball between your legs", "Alternate left and right hand as you walk", "Walk the full length of the court and back — 4 times"],
    xp: 50,
  },
  {
    id: 5, category: "DRIBBLING", icon: "🎯", title: "Hesitation (Hesi) Move",
    difficulty: "Intermediate", time: "8 min",
    desc: "Freeze the defender with a hesitation, then explode past them. One of the most effective moves in basketball.",
    steps: ["Dribble toward a cone at medium speed", "At the cone: slow down and stand upright briefly (sell the stop)", "Then burst forward at full speed past the cone", "10 reps going right, 10 going left — 2 sets"],
    xp: 50,
  },
  {
    id: 6, category: "DRIBBLING", icon: "🌀", title: "Spin Move Drill",
    difficulty: "Advanced", time: "10 min",
    desc: "Master the spin move to protect the ball and beat defenders in the post and on drives.",
    steps: ["Dribble at half speed toward a cone defender", "Plant your inside foot firmly", "Spin 180° while keeping the ball tight to your body", "Continue the dribble out the other side — 8 reps each direction"],
    xp: 50,
  },
  {
    id: 7, category: "DRIBBLING", icon: "👀", title: "Blind Dribble Challenge",
    difficulty: "Advanced", time: "5 min",
    desc: "Close your eyes and dribble. Forces you to develop true feel for the ball without visual help.",
    steps: ["Stand in place with ball in strong hand", "Close your eyes completely", "Dribble for 30 seconds without losing the ball", "Switch hands — 5 rounds each hand. Focus on fingertip feel"],
    xp: 50,
  },
  {
    id: 8, category: "DRIBBLING", icon: "⬆️", title: "High-Low Speed Dribble",
    difficulty: "Beginner", time: "5 min",
    desc: "Alternate between high (loose) dribbles and tight (low) dribbles to control tempo.",
    steps: ["Dribble high at shoulder height for 5 counts", "Immediately drop to tight, low dribbles near your shoe for 5 counts", "Alternate back and forth rapidly", "3 sets of 1 minute — keep the rhythm consistent"],
    xp: 50,
  },
  {
    id: 9, category: "DRIBBLING", icon: "🔀", title: "Behind-the-Back Dribble",
    difficulty: "Advanced", time: "8 min",
    desc: "Wrap the ball behind your back smoothly. Looks flashy but is a real weapon to protect the ball.",
    steps: ["Dribble with your right hand while walking forward", "Swing the ball behind your back to your left hand", "Continue dribbling with left, then go back behind the back to right", "Walk the court length — 4 times total, focus on control not speed"],
    xp: 50,
  },
  {
    id: 10, category: "DRIBBLING", icon: "💪", title: "Pound Dribble Series",
    difficulty: "Beginner", time: "5 min",
    desc: "Hard, powerful dribbles that build hand strength and ball control under pressure.",
    steps: ["Dribble as hard as possible — pound the ball into the floor", "10 hard pounds with right hand", "10 hard pounds with left hand", "10 alternating (right, left, right...) — 4 full rounds"],
    xp: 50,
  },
  {
    id: 11, category: "DRIBBLING", icon: "🏃", title: "Full-Court Speed Dribble",
    difficulty: "Intermediate", time: "8 min",
    desc: "Sprint from baseline to baseline with the ball, controlling it at top speed. Pure conditioning + ball handling.",
    steps: ["Start at the baseline in athletic stance", "Sprint the full length of the court while dribbling", "Use long, pushing dribbles to keep up with your speed", "6 full-court sprints — alternate starting hand each time"],
    xp: 50,
  },
  {
    id: 12, category: "DRIBBLING", icon: "🤹", title: "Stationary 1-2-3 Combo",
    difficulty: "Intermediate", time: "6 min",
    desc: "Combine crossover → between the legs → behind the back in one fluid stationary combo.",
    steps: ["Stand in place with the ball", "Do a crossover (right to left)", "Follow immediately with a between-the-legs (left to right)", "Then a behind-the-back (right to left)", "Repeat the combo 10 times without stopping — build speed gradually"],
    xp: 50,
  },

  // ── SHOOTING (12) ───────────────────────────────────────────────
  {
    id: 13, category: "SHOOTING", icon: "🎯", title: "Form Shooting — 5 Spot",
    difficulty: "Beginner", time: "10 min",
    desc: "Perfect your shooting form from 5 spots around the key. 10 makes at each spot before moving.",
    steps: ["Start directly in front of basket, 3 feet out", "Focus on BEEF: Balance, Eyes, Elbow, Follow-through", "Make 10 shots at each spot before moving", "5 spots: center, left elbow, right elbow, left wing, right wing"],
    xp: 50,
  },
  {
    id: 14, category: "SHOOTING", icon: "🔥", title: "Catch and Shoot Off the Pass",
    difficulty: "Intermediate", time: "10 min",
    desc: "Simulate receiving a pass and shooting in one fluid motion. No wasted movement.",
    steps: ["Set up at mid-range or 3-point line", "Toss ball against backboard to simulate a pass", "Catch it already in your shot pocket", "Shoot immediately in one motion — 20 makes"],
    xp: 50,
  },
  {
    id: 15, category: "SHOOTING", icon: "💪", title: "Chair Drill — Pull-Up Jumper",
    difficulty: "Advanced", time: "12 min",
    desc: "Dribble, stop on a dime, and pull up for a mid-range jumper. NBA-level skill.",
    steps: ["Dribble hard toward the lane at full speed", "One hard dribble into a two-foot gather stop", "Rise straight up without leaning — clean jumper", "10 makes from each side of the lane"],
    xp: 50,
  },
  {
    id: 16, category: "SHOOTING", icon: "🌀", title: "Mikan Drill",
    difficulty: "Beginner", time: "8 min",
    desc: "Alternating layups from each side of the basket without letting the ball hit the floor. Builds footwork and touch.",
    steps: ["Stand on the right side of the basket underneath", "Shoot a right-handed layup off the backboard", "Catch it before it hits the floor", "Step to the left side and shoot a left-handed layup — 20 made layups total"],
    xp: 50,
  },
  {
    id: 17, category: "SHOOTING", icon: "⚡", title: "3-Point Shooting Circuit",
    difficulty: "Intermediate", time: "12 min",
    desc: "Fire from all 5 spots behind the arc. Track your makes and beat your record every session.",
    steps: ["Go to right corner 3 — shoot 5 shots", "Move to right wing — shoot 5 shots", "Center (top of the key) — shoot 5 shots", "Left wing and left corner — 5 each. Total: 25 shots, track your makes"],
    xp: 50,
  },
  {
    id: 18, category: "SHOOTING", icon: "🏃", title: "Off-Screen Curl Shot",
    difficulty: "Intermediate", time: "10 min",
    desc: "Curl around a cone like you're coming off a screen and catch-and-shoot. Game-realistic movement.",
    steps: ["Set a cone 15 feet from the basket as your screen", "Jog toward the cone, then curl around it tightly", "Catch a self-tossed ball on the move", "Shoot off the catch — 15 makes each side"],
    xp: 50,
  },
  {
    id: 19, category: "SHOOTING", icon: "🎪", title: "Free Throw Routine",
    difficulty: "Beginner", time: "10 min",
    desc: "Build a consistent free throw routine and make 25 in a row. Consistency under pressure starts here.",
    steps: ["Step to the free throw line", "Do your consistent routine: 1-2 dribbles, spin ball, breath", "Same routine EVERY single time — no variation", "Goal: make 25 free throws. If you miss 2 in a row, start your count over"],
    xp: 50,
  },
  {
    id: 20, category: "SHOOTING", icon: "👟", title: "Step-Back Jumper",
    difficulty: "Advanced", time: "10 min",
    desc: "Create separation from your defender by stepping back before your shot. The Harden special.",
    steps: ["Dribble toward the defender (cone) hard", "Plant and take a hard step backward with both feet", "Land balanced — feet shoulder-width apart", "Rise into your shot immediately — 10 makes from each wing"],
    xp: 50,
  },
  {
    id: 21, category: "SHOOTING", icon: "🔄", title: "Fadeaway Fundamentals",
    difficulty: "Advanced", time: "10 min",
    desc: "Jump slightly backward while shooting to make your shot unblockable. Kobe's signature.",
    steps: ["Start with your back to the basket in the post", "Catch a pass (or self-toss), turn to face the basket", "Jump at a slight backward angle while keeping your form perfect", "Follow through fully — 10 makes from each block area"],
    xp: 50,
  },
  {
    id: 22, category: "SHOOTING", icon: "💫", title: "Floater Finish",
    difficulty: "Intermediate", time: "8 min",
    desc: "The soft floater over the big man. Essential for any guard or small forward attacking the paint.",
    steps: ["Dribble toward the painted area at speed", "Take 1-2 steps inside the paint", "Release a soft, high-arching floater off one foot", "Aim for the square on the backboard — 15 makes each side"],
    xp: 50,
  },
  {
    id: 23, category: "SHOOTING", icon: "🏆", title: "Game Speed Shooting Drill",
    difficulty: "Advanced", time: "15 min",
    desc: "Full game speed: 10 catches, pivots, shot fakes, and quick releases. No time to think.",
    steps: ["Set up at mid-range on the wing", "Sprint to your spot, receive a self-toss, shot fake once, shoot", "Retrieve the ball, sprint to another spot, repeat", "10 spots total, as fast as possible — count your makes out of 10"],
    xp: 50,
  },
  {
    id: 24, category: "SHOOTING", icon: "🎯", title: "Bank Shot Mastery",
    difficulty: "Intermediate", time: "8 min",
    desc: "Use the backboard from the mid-range angles. The most underused weapon in basketball.",
    steps: ["Stand at the 45-degree angle on either side (elbow area)", "Aim for the top corner of the square on the backboard", "Let the bank shot roll in — soft touch is key", "10 makes from each elbow — 20 total"],
    xp: 50,
  },

  // ── FOOTWORK (12) ───────────────────────────────────────────────
  {
    id: 25, category: "FOOTWORK", icon: "👟", title: "Jab Step Series",
    difficulty: "Beginner", time: "6 min",
    desc: "Jab step to freeze your defender. Three variations: jab and shoot, jab and go, jab and cross.",
    steps: ["Start in triple threat position with the ball", "Jab left foot aggressively toward defender (cone)", "Variation 1: Defender steps back → pull up and shoot", "Variation 2: Defender holds → jab and drive past. Alternate 5 reps each"],
    xp: 50,
  },
  {
    id: 26, category: "FOOTWORK", icon: "🔄", title: "Euro Step Attack",
    difficulty: "Intermediate", time: "8 min",
    desc: "Master the Euro step to get past defenders and finish at the rim cleanly.",
    steps: ["Start with a hard dribble toward the basket from the wing", "Take a long step one direction with your first step", "Immediately step the other direction with your second step", "Finish with a layup — 10 reps each side"],
    xp: 50,
  },
  {
    id: 27, category: "FOOTWORK", icon: "⭕", title: "Pivot Fundamentals",
    difficulty: "Beginner", time: "6 min",
    desc: "Master the front pivot and reverse pivot. The foundation of every post move and triple threat.",
    steps: ["Catch the ball and establish your pivot foot immediately", "Front pivot: rotate forward on pivot foot — 10 reps", "Reverse pivot: rotate backward on pivot foot — 10 reps", "Alternate both pivots left and right foot as pivot — 3 rounds"],
    xp: 50,
  },
  {
    id: 28, category: "FOOTWORK", icon: "💫", title: "Drop Step Post Move",
    difficulty: "Intermediate", time: "8 min",
    desc: "Back down your defender in the post, drop step around them, and score. A must for forwards.",
    steps: ["Start with your back to the basket at the low post block", "Feel where the defender is with your body", "Drop step (swing one leg behind the defender) to the baseline", "Power dribble and finish with a layup — 8 reps each side"],
    xp: 50,
  },
  {
    id: 29, category: "FOOTWORK", icon: "🏃", title: "V-Cut Footwork",
    difficulty: "Beginner", time: "6 min",
    desc: "The V-cut is how you get open off the ball. Plant, push off hard, and sprint to receive a pass.",
    steps: ["Start on the wing without the ball", "Take 3 steps toward the basket (set up your cut)", "Plant hard on your inside foot", "Sprint back to the wing to receive a pass — 15 reps each side"],
    xp: 50,
  },
  {
    id: 30, category: "FOOTWORK", icon: "🎯", title: "Box Out Footwork",
    difficulty: "Beginner", time: "6 min",
    desc: "Win more rebounds by mastering box-out technique. Contact, seal, and secure.",
    steps: ["Partner or imagine a defender behind you at the block", "When the shot goes up: step into your defender's path", "Widen your base and lower your hips", "Maintain contact and hold position for 3 full seconds — 15 reps"],
    xp: 50,
  },
  {
    id: 31, category: "FOOTWORK", icon: "⚡", title: "Hop Step Layup",
    difficulty: "Intermediate", time: "8 min",
    desc: "The hop step (or gather step) creates space for your layup by letting you re-gather mid-drive.",
    steps: ["Drive toward the basket at full speed from the wing", "Two steps from the basket: take a two-footed hop/gather", "Land balanced, change the angle of your approach", "Finish the layup — 10 reps each side of the basket"],
    xp: 50,
  },
  {
    id: 32, category: "FOOTWORK", icon: "🌀", title: "Spin Move to Finish",
    difficulty: "Advanced", time: "10 min",
    desc: "Full spin move from the mid-post all the way to a finish at the rim under control.",
    steps: ["Start at the elbow (mid-range area) with a dribble", "Drive baseline hard, feel the imaginary defender", "Plant and execute a full 360° spin move", "Come out of the spin into a power layup — 8 reps each side"],
    xp: 50,
  },
  {
    id: 33, category: "FOOTWORK", icon: "🦵", title: "Triple Threat Reactions",
    difficulty: "Beginner", time: "6 min",
    desc: "From triple threat, react instantly to drive, shoot, or pass. Trains your decision-making speed.",
    steps: ["Stand in triple threat (ball on hip, knees bent, feet shoulder-width)", "Have someone (or a timer) call: DRIVE, SHOOT, or PASS", "React instantly with the correct footwork move", "30 random calls — 3 rounds. Speed up each round"],
    xp: 50,
  },
  {
    id: 34, category: "FOOTWORK", icon: "🏀", title: "Skip Step Layup Drill",
    difficulty: "Intermediate", time: "8 min",
    desc: "Skip steps as you approach the basket to confuse defenders and change your finishing angle.",
    steps: ["Start 15 feet from the basket at an angle", "Dribble toward basket taking exaggerated skip-steps", "Stay on the balls of your feet throughout", "Finish with a smooth layup — 10 reps each side"],
    xp: 50,
  },
  {
    id: 35, category: "FOOTWORK", icon: "🎪", title: "Rocker Step Series",
    difficulty: "Intermediate", time: "8 min",
    desc: "Jab, rock back to your shot, or jab and go — read the defender and react.",
    steps: ["Start in triple threat at mid-range", "Jab step hard toward the basket (defender reacts back)", "Rock your weight backward as if to shoot (they come forward)", "When they come forward: explode past them with a drive — 10 reps each side"],
    xp: 50,
  },
  {
    id: 36, category: "FOOTWORK", icon: "💪", title: "Sweep and Sway Counter",
    difficulty: "Advanced", time: "10 min",
    desc: "Sweep the ball to one side then sway into your shot when the defender reaches. Advanced footwork.",
    steps: ["Start at the elbow in triple threat", "Sweep the ball low across your body to the right", "As the defender reaches, sway left and rise into your shot", "Keep your body under control throughout — 10 reps each side"],
    xp: 50,
  },

  // ── DEFENSE (12) ────────────────────────────────────────────────
  {
    id: 37, category: "DEFENSE", icon: "🛡️", title: "Defensive Slide Gauntlet",
    difficulty: "Beginner", time: "5 min",
    desc: "Quick defensive slides to build lateral speed. This is what separates good defenders from great ones.",
    steps: ["Stand in defensive stance: bent knees, wide base, hands active", "Slide left 5 steps without crossing your feet", "Slide right 5 steps without crossing your feet", "4 sets of 30 seconds — stay low the entire time"],
    xp: 50,
  },
  {
    id: 38, category: "DEFENSE", icon: "👊", title: "Closeout Drill",
    difficulty: "Intermediate", time: "8 min",
    desc: "Sprint to close out on a shooter, then transition into defensive stance without fouling.",
    steps: ["Start under the basket in defensive stance", "Sprint hard at a cone set at 3-point range", "Chop your steps in the last 3 feet (don't fly past)", "Arrive in low, balanced defensive stance — 15 reps each side"],
    xp: 50,
  },
  {
    id: 39, category: "DEFENSE", icon: "🔒", title: "Ball Pressure Stance",
    difficulty: "Beginner", time: "5 min",
    desc: "Apply constant hand pressure on the ball handler without reaching or fouling.",
    steps: ["Get into defensive stance 1 arm's length from an imaginary ball handler", "Maintain stance: one hand up (pass lane), one hand low (dribble lane)", "Shadow-follow imaginary dribble moves left and right", "5 sets of 30 seconds — never cross your feet, stay disciplined"],
    xp: 50,
  },
  {
    id: 40, category: "DEFENSE", icon: "🏃", title: "Defensive Drop Step",
    difficulty: "Intermediate", time: "8 min",
    desc: "When your man drives past you, drop step and recover. Critical for not getting blown by.",
    steps: ["Start in defensive stance facing the cone", "The cone 'drives' right: drop your right foot back immediately", "Spin and sprint in the drive direction", "Re-establish defensive position ahead of them — 10 reps each side"],
    xp: 50,
  },
  {
    id: 41, category: "DEFENSE", icon: "🌀", title: "Zig-Zag Defensive Drill",
    difficulty: "Intermediate", time: "8 min",
    desc: "Slide diagonally across the court forcing the ball handler to a specific side. Tests your full defensive movement.",
    steps: ["Start at the baseline corner in defensive stance", "Slide diagonally to the center of the court (force baseline)", "Slide back to the sideline (force middle)", "Zig-zag the full court length — 4 times"],
    xp: 50,
  },
  {
    id: 42, category: "DEFENSE", icon: "🤲", title: "Deflection and Steal Drill",
    difficulty: "Intermediate", time: "8 min",
    desc: "Time your hands to deflect passes and dribbles. Active hands create turnovers.",
    steps: ["Partner or solo: toss ball against wall and anticipate the return path", "Time your hand to deflect the ball as it bounces back", "Focus on slapping down (not across) to avoid reach-in fouls", "20 deflections — alternate hands"],
    xp: 50,
  },
  {
    id: 43, category: "DEFENSE", icon: "🦵", title: "Charge Taking Position",
    difficulty: "Advanced", time: "6 min",
    desc: "Get in the right spot to draw a charge. Feet set, outside the restricted area, absorb the contact.",
    steps: ["Position yourself outside the charge circle (restricted area)", "Have feet set BEFORE the offensive player leaves the ground", "Slightly widen your base and slightly bend your knees", "Take the contact and fall backward in a controlled way — drill 10 reps"],
    xp: 50,
  },
  {
    id: 44, category: "DEFENSE", icon: "⚡", title: "Help Defense Rotation",
    difficulty: "Advanced", time: "10 min",
    desc: "Rotate from your man to help on a drive, then recover back. The hardest part of team defense.",
    steps: ["Start guarding cone A on the wing", "Cone B 'drives' to the basket — sprint to cut off the drive path", "Reach out (without fouling) to alter the shot", "Sprint back to recover to cone A — 10 reps each starting position"],
    xp: 50,
  },
  {
    id: 45, category: "DEFENSE", icon: "🎯", title: "Contest Shot Drill",
    difficulty: "Beginner", time: "6 min",
    desc: "Sprint out and contest shots with a high, straight hand. Don't foul, just disrupt the shooter's vision.",
    steps: ["Start at center court or under the basket", "Sprint to a shooting spot (3 random spots per set)", "Jump straight up with one hand high as the 'shot is released'", "Land balanced — no reaching, no foul — 15 contests per set x3"],
    xp: 50,
  },
  {
    id: 46, category: "DEFENSE", icon: "👥", title: "On-Ball Screen Hedge",
    difficulty: "Advanced", time: "8 min",
    desc: "Navigate around or over a pick-and-roll screen without getting caught. Essential pick-and-roll defense.",
    steps: ["Walk through the scenario: your man has the ball, screen is being set", "Communicate 'Screen!' to your imaginary teammate", "Decision: go over the top (for shooters) or under (for non-shooters)", "Sprint back into ball-denial position — practice both options 10 times"],
    xp: 50,
  },
  {
    id: 47, category: "DEFENSE", icon: "🔥", title: "Deny the Wing Pass",
    difficulty: "Intermediate", time: "6 min",
    desc: "Deny your man from receiving the ball on the wing. Force them to work harder for the catch.",
    steps: ["Your man is at the wing — position yourself ball-side between them and the ball", "Lead hand in the passing lane, eyes on both ball and man (ball-you-man)", "Follow your man's movement without losing sight of the ball", "If they cut away: open up and deny the new position — 5 min drill"],
    xp: 50,
  },
  {
    id: 48, category: "DEFENSE", icon: "💪", title: "Defensive Conditioning Box Drill",
    difficulty: "Advanced", time: "10 min",
    desc: "Sprint and slide around the 4 corners of the paint in defensive stance. Pure defensive conditioning.",
    steps: ["Start at the bottom-left corner of the paint in defensive stance", "Slide to the bottom-right corner (no crossing feet)", "Sprint to the top-right corner", "Slide to top-left, sprint back to start — 8 full rounds as fast as possible"],
    xp: 50,
  },

  // ── CONDITIONING (12) ────────────────────────────────────────────
  {
    id: 49, category: "CONDITIONING", icon: "💥", title: "4-Corner Sprint and Layup",
    difficulty: "Advanced", time: "10 min",
    desc: "Full court conditioning + finish under fatigue. Sprint all 4 corners, end every round with a layup.",
    steps: ["Sprint to each baseline corner — touch the floor", "Sprint all 4 corners as fast as possible", "Sprint back, receive (or self-toss) a pass near the basket", "Finish with a layup — 10 rounds. Your lungs will burn"],
    xp: 50,
  },
  {
    id: 50, category: "CONDITIONING", icon: "🏃", title: "17s Baseline Sprint",
    difficulty: "Advanced", time: "10 min",
    desc: "The NBA conditioning test. Sprint baseline to baseline 17 times in under a set time. No excuses.",
    steps: ["Start at the baseline", "Sprint to the opposite baseline and back — that's 1 rep", "Complete 17 reps (34 baseline touches total)", "Goal: complete all 17 in under 60 seconds. Rest 90 seconds, do it again"],
    xp: 50,
  },
  {
    id: 51, category: "CONDITIONING", icon: "⚡", title: "Suicide Sprints",
    difficulty: "Intermediate", time: "8 min",
    desc: "Sprint to the near free throw line, back, half court, back, far free throw line, back, full court, back.",
    steps: ["Start at the baseline", "Sprint to near free throw line, touch the floor, sprint back", "Sprint to half court, touch, sprint back", "Sprint to far free throw line, back, then full court and back — that's 1 suicide. Do 5"],
    xp: 50,
  },
  {
    id: 52, category: "CONDITIONING", icon: "🏀", title: "Ball-Handling Conditioning",
    difficulty: "Intermediate", time: "10 min",
    desc: "Full-court dribbling at max speed, change directions at every cone. Handles + cardio combined.",
    steps: ["Set cones every 10 feet down the court", "Sprint-dribble to each cone, execute a crossover or between-the-legs move", "Never slow down — keep full speed through every cone", "Down and back 8 times — no ball drops allowed or restart that rep"],
    xp: 50,
  },
  {
    id: 53, category: "CONDITIONING", icon: "🔥", title: "3-Man Weave Sprint",
    difficulty: "Intermediate", time: "10 min",
    desc: "Classic 3-man weave passing drill at full speed. Builds conditioning, passing, and communication.",
    steps: ["3 players start at one baseline (or solo: just run the pattern)", "Pass to the right, run behind the pass and to the far lane", "Receive the next pass, pass to the middle, continue weaving", "Finish with a layup — run 10 full-court weaves"],
    xp: 50,
  },
  {
    id: 54, category: "CONDITIONING", icon: "💪", title: "Jump Rope Footwork",
    difficulty: "Beginner", time: "8 min",
    desc: "Jump rope is the #1 conditioning tool for basketball players. Builds calf strength, agility, and rhythm.",
    steps: ["Basic two-foot jump: 1 minute", "Alternating single-foot hops (like running): 1 minute", "Double-unders if possible: 30 seconds", "Side-to-side jumps: 1 minute — 3 full rounds of all 4 variations"],
    xp: 50,
  },
  {
    id: 55, category: "CONDITIONING", icon: "🌀", title: "Defensive Slide Circuit",
    difficulty: "Intermediate", time: "8 min",
    desc: "Non-stop defensive slides for 4 minutes. Builds the lateral quickness every elite defender needs.",
    steps: ["Set cones at each sideline in the backcourt", "Defensive slide from one sideline to the other without stopping", "Chop steps at the cone, never stand upright", "4 minutes continuous — count how many full court widths you complete"],
    xp: 50,
  },
  {
    id: 56, category: "CONDITIONING", icon: "🎯", title: "Timed Shooting Circuit",
    difficulty: "Advanced", time: "12 min",
    desc: "Shoot as many shots as possible in 4 minutes from all over the court. Fatigue + shooting = game realistic.",
    steps: ["Set a 4-minute timer", "Shoot from different spots, sprint to rebound, sprint to next spot", "No walking — every movement is at a sprint or jog", "Count total makes in 4 minutes — try to beat your record each session"],
    xp: 50,
  },
  {
    id: 57, category: "CONDITIONING", icon: "👟", title: "Ladder Agility Drills",
    difficulty: "Intermediate", time: "8 min",
    desc: "Speed ladder footwork builds the quick feet every basketball player needs for cuts, defense, and drives.",
    steps: ["Set up a speed ladder (or tape lines on the floor)", "2-in, 2-out: both feet in each box, then both out each side", "Icky shuffle: in-in, out-out with alternating lead foot", "Lateral shuffle through the ladder — 3 rounds of each pattern"],
    xp: 50,
  },
  {
    id: 58, category: "CONDITIONING", icon: "🏆", title: "Box Jump Series",
    difficulty: "Advanced", time: "10 min",
    desc: "Explosive box jumps build the vertical leap and fast-twitch muscle fibers for dunks and rebounds.",
    steps: ["Find a sturdy box or step 12-24 inches high", "Two-foot takeoff: jump onto the box, land softly, step down", "Single-leg jumps: 5 reps each leg", "Depth drops: step off the box, land and immediately jump up — 3 rounds of 10"],
    xp: 50,
  },
  {
    id: 59, category: "CONDITIONING", icon: "💨", title: "Full-Court Press Break Drill",
    difficulty: "Advanced", time: "12 min",
    desc: "Simulate breaking a full-court press: quick decisions, fast dribbling, attack the gaps.",
    steps: ["Start at your baseline against imaginary full-court pressure", "Push the ball up the court with 2-3 hard dribbles", "Split imaginary traps at half court — keep your head up", "Finish with a layup at the opposite end — 10 full-court press breaks"],
    xp: 50,
  },
  {
    id: 60, category: "CONDITIONING", icon: "🔄", title: "Game Simulation Sprint",
    difficulty: "Advanced", time: "15 min",
    desc: "Simulate a full game quarter with non-stop movement: sprints, defensive slides, shots, and rest cycles.",
    steps: ["Sprint full court (offense transition): 3 reps", "Defensive slides half-court: 2 minutes", "Shoot 10 free throws (rest/focus recovery)", "Repeat the full cycle 4 times — this is what a real game quarter feels like"],
    xp: 50,
  },
];

const diffColor: Record<string, string> = {
  Beginner: "#10B981",
  Intermediate: "#F59E0B",
  Advanced: "#EF4444",
};

const catColor: Record<string, string> = {
  DRIBBLING: "#3B82F6",
  SHOOTING: "#FF6B00",
  FOOTWORK: "#8B5CF6",
  DEFENSE: "#10B981",
  CONDITIONING: "#EF4444",
};

export default function DrillsPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
      const { data } = await supabase.from("completed_drills").select("drill_id").eq("user_id", user.id);
      if (data) setCompleted(data.map((d) => d.drill_id));
    }
    load();
  }, []);

  async function completeDrill(drillId: number) {
    if (completed.includes(drillId)) return;
    if (!userId) {
      setToast("Log in to track your progress!");
      setTimeout(() => setToast(null), 3000);
      return;
    }
    const supabase = createClient();
    await supabase.from("completed_drills").insert({ user_id: userId, drill_id: drillId });
    const { data: profile } = await supabase.from("profiles").select("xp, drills_completed").eq("id", userId).single();
    if (profile) {
      await supabase.from("profiles").update({ xp: profile.xp + 50, drills_completed: profile.drills_completed + 1 }).eq("id", userId);
    }
    setCompleted((prev) => [...prev, drillId]);
    setToast("+50 XP earned! Keep grinding! 🔥");
    setTimeout(() => setToast(null), 3000);
  }

  const categories = ["ALL", "DRIBBLING", "SHOOTING", "FOOTWORK", "DEFENSE", "CONDITIONING"];
  const filtered = filter === "ALL" ? DRILLS : DRILLS.filter((d) => d.category === filter);

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {toast && (
        <div style={{ position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)", background: "#FF6B00", color: "#fff", padding: "14px 28px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", zIndex: 9999, boxShadow: "0 0 30px rgba(255,107,0,0.6)" }}>
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
          <Link href="/trivia" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Trivia</Link>
          <Link href="/leaderboard" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>Leaderboard</Link>
        </div>
      </nav>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px" }}>
        <h1 style={{ fontSize: "40px", fontWeight: 900, color: "#fff", margin: "0 0 8px", letterSpacing: "-1px" }}>DRILLS LIBRARY 🏀</h1>
        <p style={{ color: "#666", margin: "0 0 24px" }}>60 drills across 5 categories. Earn <span style={{ color: "#FF6B00", fontWeight: 700 }}>+50 XP</span> per drill.</p>

        {userId && (
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "16px 20px", marginBottom: "28px", display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "14px", color: "#888" }}>{completed.length}/{DRILLS.length} completed</span>
            <div style={{ flex: 1, background: "#1a1a1a", borderRadius: "4px", height: "8px", overflow: "hidden" }}>
              <div style={{ width: `${(completed.length / DRILLS.length) * 100}%`, height: "100%", background: "linear-gradient(90deg, #FF6B00, #FFD700)", transition: "width 0.5s ease" }} />
            </div>
            <span style={{ fontSize: "14px", color: "#FF6B00", fontWeight: 700 }}>{completed.length * 50} XP</span>
          </div>
        )}

        <div style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} style={{ background: filter === cat ? (catColor[cat] || "#FF6B00") : "#111", border: `1px solid ${filter === cat ? (catColor[cat] || "#FF6B00") : "#222"}`, color: filter === cat ? "#fff" : "#666", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 700 }}>
              {cat} {cat !== "ALL" && `(${DRILLS.filter(d => d.category === cat).length})`}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map((drill) => {
            const done = completed.includes(drill.id);
            const open = expanded === drill.id;
            return (
              <div key={drill.id} style={{ background: done ? "rgba(16,185,129,0.05)" : "#111", border: `1px solid ${done ? "rgba(16,185,129,0.3)" : "#222"}`, borderRadius: "16px", overflow: "hidden" }}>
                <div onClick={() => setExpanded(open ? null : drill.id)} style={{ padding: "20px 24px", cursor: "pointer", display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ fontSize: "32px", flexShrink: 0 }}>{drill.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: catColor[drill.category], letterSpacing: "0.5px" }}>{drill.category}</span>
                      <span style={{ fontSize: "11px", color: diffColor[drill.difficulty], background: `${diffColor[drill.difficulty]}22`, padding: "2px 8px", borderRadius: "4px", fontWeight: 600 }}>{drill.difficulty}</span>
                      <span style={{ fontSize: "11px", color: "#555" }}>⏱ {drill.time}</span>
                    </div>
                    <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>{drill.title}</h3>
                    <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>{drill.desc}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                    {done ? (
                      <div style={{ background: "#10B981", color: "#fff", padding: "8px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 700 }}>✓ Done</div>
                    ) : (
                      <div style={{ color: "#FF6B00", fontSize: "13px", fontWeight: 700 }}>+50 XP</div>
                    )}
                    <span style={{ color: "#444", fontSize: "18px" }}>{open ? "▲" : "▼"}</span>
                  </div>
                </div>
                {open && (
                  <div style={{ padding: "0 24px 24px", borderTop: "1px solid #1a1a1a" }}>
                    {/* YouTube Tutorial Button */}
                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(drill.title + " basketball drill tutorial")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#FF0000", color: "#fff", textDecoration: "none", padding: "10px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, marginTop: "16px", marginBottom: "20px" }}
                    >
                      ▶ Watch Tutorial on YouTube
                    </a>

                    <h4 style={{ color: "#888", fontSize: "12px", letterSpacing: "1px", fontWeight: 700, marginBottom: "12px", marginTop: "4px" }}>HOW TO DO IT:</h4>
                    <ol style={{ paddingLeft: "20px", margin: "0 0 20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {drill.steps.map((step, i) => (
                        <li key={i} style={{ color: "#ccc", fontSize: "14px", lineHeight: 1.6 }}>{step}</li>
                      ))}
                    </ol>
                    {!done ? (
                      <button onClick={() => completeDrill(drill.id)} style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", border: "none", borderRadius: "10px", padding: "14px 28px", fontSize: "15px", fontWeight: 800, cursor: "pointer", boxShadow: "0 0 20px rgba(255,107,0,0.4)" }}>
                        ✓ MARK COMPLETE — EARN 50 XP
                      </button>
                    ) : (
                      <div style={{ color: "#10B981", fontSize: "15px", fontWeight: 700 }}>✅ Drill completed! XP earned.</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!userId && (
          <div style={{ textAlign: "center", marginTop: "40px", background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "32px" }}>
            <p style={{ color: "#888", marginBottom: "16px", fontSize: "16px" }}>Log in to track your XP and completed drills</p>
            <Link href="/signup" style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", color: "#fff", textDecoration: "none", padding: "14px 32px", borderRadius: "10px", fontSize: "15px", fontWeight: 800 }}>
              Create Free Account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
