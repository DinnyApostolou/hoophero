import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HoopHero — Level Up Your Game",
  description: "Gamified basketball training for the next generation. Complete drills, earn XP, and climb the leaderboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#0A0A0A", color: "#ffffff", margin: 0, fontFamily: "system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
