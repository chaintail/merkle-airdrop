import React from 'react';
import { Dog, Zap } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';
import { AnimatedNumber } from "@/components/effects"

interface TitleSectionProps {
  tokenAmount: number;
}

export const TitleSection: React.FC<TitleSectionProps> = ({ tokenAmount }) => {
  const { theme } = useTheme();

  return (
    <div className="text-center mb-12">
      <div className="flex justify-center items-center gap-4 mb-4">
        <Dog className={`w-16 h-16 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600">
          My Awesome Airdrop
        </h1>
      </div>
      <div className={`relative ${
        theme === 'dark' ? 'bg-gray-800/30' : 'bg-white'
      } rounded-2xl p-6 max-w-2xl mx-auto ${
        theme === 'dark' ? 'backdrop-blur-sm' : 'shadow-lg'
      }`}>
        <div className="flex flex-col items-center space-y-2">
          <div className={`text-xl ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Total $SWEET Available
          </div>
          <AnimatedNumber 
            value={tokenAmount} 
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400"
          />
          <div className="flex items-center gap-2 text-emerald-500">
            <Zap className="w-4 h-4" />
            <span>Ready for claiming</span>
          </div>
        </div>
      </div>
    </div>
  );
};