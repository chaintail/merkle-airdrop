"use client";

import React, { useState } from 'react';
import { Users, Trophy, Zap } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  iconBgColor: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, label, value, iconBgColor }) => {
  const { theme } = useTheme();
  
  return (
    <div className="flex items-center gap-4">
      <div className={`${iconBgColor} p-3 rounded-full`}>
        {icon}
      </div>
      <div>
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          {label}
        </p>
        <p className={`text-2xl font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {value}
        </p>
      </div>
    </div>
  );
};

interface StatsSectionProps {
  onConnect?: () => void;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ onConnect }) => {
  const { theme } = useTheme();
  const [buttonEffect, setButtonEffect] = useState(false);

  const handleConnectClick = () => {
    setButtonEffect(true);
    setTimeout(() => setButtonEffect(false), 500);
    onConnect?.();
  };

  return (
    <div className={`${
      theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
    } rounded-3xl p-6 md:p-8 ${
      theme === 'dark' ? 'backdrop-blur-sm' : 'shadow-lg'
    } mb-8`}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <StatItem
          icon={<Users className="w-8 h-8 text-emerald-500" />}
          label="Total Participants"
          value="127,445"
          iconBgColor={theme === 'dark' ? 'bg-emerald-900/50' : 'bg-emerald-100'}
        />

        <button 
          className={`w-full md:w-auto px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center gap-2 transition-all ${
            buttonEffect ? 'scale-95' : 'scale-100'
          }`}
          onClick={handleConnectClick}
        >
          <Zap className="w-5 h-5" />
          CONNECT WALLET
        </button>

        <StatItem
          icon={<Trophy className="w-8 h-8 text-purple-500" />}
          label="Total XP Earned Globally"
          value="9,876,543 XP"
          iconBgColor={theme === 'dark' ? 'bg-purple-900/50' : 'bg-purple-100'}
        />
      </div>
    </div>
  );
}; 