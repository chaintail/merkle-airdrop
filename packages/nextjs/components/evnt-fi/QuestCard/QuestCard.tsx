import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

interface QuestCardProps {
  title: string;
  xp: string;
  icon: LucideIcon;
  color: string;
  progress?: {
    current: number;
    total: number;
  };
  onStart?: () => void;
}

export const QuestCard: React.FC<QuestCardProps> = ({
  title,
  xp,
  icon: Icon,
  color,
  progress = { current: 0, total: 3 },
  onStart
}) => {
  const { theme } = useTheme();

  return (
    <div 
      className={`${
        theme === 'dark' ? 'bg-gray-800/30' : 'bg-white'
      } rounded-3xl p-6 ${
        theme === 'dark' ? 'backdrop-blur-sm' : 'shadow-lg'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-blue-500 text-xl font-semibold">{title}</h3>
        <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
          {progress.current} / {progress.total}
        </span>
      </div>
      
      <div className="flex justify-center my-8">
        <Icon className={`w-24 h-24 text-${color}-500`} />
      </div>

      <div className="space-y-4">
        <div className={`${
          theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'
        } p-4 rounded-xl`}>
          <div className="flex justify-between text-gray-500 mb-2">
            <span>Progress</span>
            <span>{Math.round((progress.current / progress.total) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full">
            <div 
              className={`h-full bg-blue-500 rounded-full transition-all duration-300`}
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            ></div>
          </div>
        </div>

        <button 
          onClick={onStart}
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
        >
          START QUEST
        </button>
      </div>
    </div>
  );
}; 