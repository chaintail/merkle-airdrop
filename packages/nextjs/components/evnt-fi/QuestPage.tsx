"use client";

import React from "react";
import { Star, Target, Award, Dog } from "lucide-react";
import { ThemeProvider, Header, TitleSection, StatsSection, QuestCard, Footer, useTheme } from "@/components/evnt-fi/";
import { BubbleHaze } from "@/components/effects";

const QUESTS = [
  { icon: Star, title: "Daily Quests", xp: "500", color: "blue" },
  { icon: Target, title: "Weekly Missions", xp: "2000", color: "purple" },
  { icon: Award, title: "Special Events", xp: "5000", color: "emerald" },
  { icon: Dog, title: "Community Tasks", xp: "1000", color: "indigo" },
];

const QuestPageContent: React.FC = () => {
  const { theme } = useTheme();

  const handleConnectWallet = () => {
    // Implement wallet connection logic
    console.log("Connecting wallet...");
  };

  const handleStartQuest = (questTitle: string) => {
    // Implement quest start logic
    console.log(`Starting quest: ${questTitle}`);
  };

  return (
    <div
      className={`min-h-screen relative z-10 ${
        theme === "dark"
          ? "bg-gradient-to-br from-blue-950 via-blue-900 to-purple-900"
          : "bg-gradient-to-br from-blue-50/50 via-white/50 to-purple-50/50"
      }`}
    >
      <Header />

      <main className="container mx-auto px-4 pt-8 md:pt-16">
        <TitleSection tokenAmount={2123456789} />
        <StatsSection onConnect={handleConnectWallet} />

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {QUESTS.map((quest, index) => (
            <QuestCard key={index} {...quest} onStart={() => handleStartQuest(quest.title)} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

const QuestPage: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="relative overflow-hidden">
        <BubbleHaze />
        <QuestPageContent />
      </div>
    </ThemeProvider>
  );
};

export default QuestPage;
