import { BalloonIcon } from './icons/balloon';
import { PumpkinIcon } from './icons/pumpkin';
import { Clover, Heart, Cake, PartyPopper } from 'lucide-react';

const calculateOpacity = (y: number) => {
  const fadeStartPoint = 10;
  if (y < fadeStartPoint) return 0.7;
  const fadeProgress = (y - fadeStartPoint) / (100 - fadeStartPoint);
  const opacity = 0.7 * Math.exp(-fadeProgress * 4);
  return Math.max(0, opacity);
};

export type FallingItemType =
  | 'snowflake'
  | 'heart'
  | 'shamrock'
  | 'confetti'
  | 'cake'
  | 'party-popper'
  | 'balloon'
  | 'pumpkin';
export interface FallingItem {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotationLimit: number;
  rotationDirection: -1 | 1;
  swayAmount: number;
  color: string;
  skew?: number;
  type: FallingItemType;
}

export const PARTICLE_COLOURS = {
  red: '#ef4444',
  blue: '#3b82f6',
  yellow: '#f59e0b',
  lightYellow: '#ffbe2b',
  green: '#10b981',
  purple: '#8b5cf6',
  pink: '#ec4899',
  darkRed: '#602020',
  darkBlue: '#1b5286',
  darkYellow: '#595e0b',
  darkGreen: '#109951',
  darkPurple: '#4b2c99',
  darkPink: '#99204b',
  lightPink: '#fa92c6',
  pink2: '#ec4899',
  pink3: '#f472b6',
  green2: '#22c55e',
  green3: '#16a34a',
  green4: '#15803d',
  white: '#e0e0e0',
  darkGrey: '#343434',
  grey: '#696969',
  lightGrey: '#a5a5a5',
  orange: '#ff8000',
  orange2: '#e06b12',
  orange3: '#c27715',
  orange4: '#c0590d',
};
const randomColors = [
  PARTICLE_COLOURS['red'],
  PARTICLE_COLOURS['blue'],
  PARTICLE_COLOURS['yellow'],
  PARTICLE_COLOURS['green'],
  PARTICLE_COLOURS['purple'],
  PARTICLE_COLOURS['pink'],
];
const shamrockColors = [
  PARTICLE_COLOURS['green2'],
  PARTICLE_COLOURS['green3'],
  PARTICLE_COLOURS['green4'],
];
const heartColors = [PARTICLE_COLOURS['pink2'], PARTICLE_COLOURS['pink3']];

const pumpkinColors = [
  PARTICLE_COLOURS['orange'],
  PARTICLE_COLOURS['orange2'],
  // PARTICLE_COLOURS['orange3'],
  // PARTICLE_COLOURS['orange4'],
  PARTICLE_COLOURS['darkGrey'],
];

const getRandomColor = () => {
  return randomColors[Math.floor(Math.random() * randomColors.length)];
};

const getShamrockColor = () => {
  return shamrockColors[Math.floor(Math.random() * shamrockColors.length)];
};

const getHeartColor = () => {
  return heartColors[Math.floor(Math.random() * heartColors.length)];
};

const getPumpkinColor = () => {
  return pumpkinColors[Math.floor(Math.random() * pumpkinColors.length)];
};

export const createSnowflake = (id: number): FallingItem => ({
  id,
  x: Math.random() * 100,
  y: -10,
  size: Math.random() * 3 + 2,
  speed: Math.random() * 2 + 1,
  rotation: 0,
  rotationLimit: 0,
  rotationDirection: Math.random() < 0.5 ? -1 : 1,
  swayAmount: 0,
  color: '#fff',
  type: 'snowflake',
});

export const createHeart = (id: number): FallingItem => ({
  id,
  x: Math.random() * 100,
  y: -10,
  size: Math.random() * 20 + 15,
  speed: Math.random() * 1.5 + 1,
  rotation: Math.random() * 360,
  rotationLimit: 360,
  rotationDirection: Math.random() < 0.5 ? -1 : 1,
  swayAmount: Math.random() * 2 - 1, // Add horizontal sway
  color: getHeartColor(),
  type: 'heart',
});

export const createShamrock = (id: number): FallingItem => ({
  id,
  x: Math.random() * 100,
  y: -10,
  size: Math.random() * 25 + 15,
  speed: Math.random() * 2 + 1,
  rotation: (Math.random() * 2 - 1) * 50, // +/- 50 degrees
  rotationLimit: 50,
  rotationDirection: Math.random() < 0.5 ? -1 : 1,
  swayAmount: Math.random() * 2 - 1,
  color: getShamrockColor(),
  type: 'shamrock',
});

export const createConfetti = (id: number): FallingItem => ({
  id,
  x: Math.random() * 100,
  y: -10,
  size: Math.random() * 8 + 4,
  speed: Math.random() * 2 + 1,
  rotation: Math.random() * 360,
  rotationLimit: 360,
  rotationDirection: Math.random() < 0.5 ? -1 : 1,
  swayAmount: Math.random() * 2 - 1,
  skew: (Math.random() * 2 - 1) * 20,
  color: getRandomColor(),
  type: 'confetti',
});

export const createPartyPopper = (id: number): FallingItem => ({
  id,
  x: Math.random() * 100,
  y: -10,
  size: Math.random() * 20 + 25,
  speed: Math.random() * 2 + 1,
  rotation: (Math.random() * 2 - 1) * 120, // +/- 120 degrees
  rotationLimit: 120,
  rotationDirection: Math.random() < 0.5 ? -1 : 1,
  swayAmount: (Math.random() * 2 - 1) / 3,
  color: getRandomColor(),
  type: 'party-popper',
});

export const createCake = (id: number): FallingItem => ({
  id,
  x: Math.random() * 100,
  y: -10,
  size: Math.random() * 20 + 40,
  speed: Math.random() * 1.8 + 1.4,
  rotation: (Math.random() * 2 - 1) * 15, // +/- 15 degrees
  rotationLimit: 15,
  rotationDirection: Math.random() < 0.5 ? -1 : 1,
  swayAmount: 0,
  color: getRandomColor(),
  type: 'cake',
});

export const createBalloon = (id: number): FallingItem => ({
  id,
  x: Math.random() * 100,
  y: -10,
  size: Math.random() * 45 + 45,
  speed: Math.random() * 0.5 + 0.7,
  rotation: (Math.random() * 2 - 1) * 20, // +/- 20 degrees
  rotationLimit: 20,
  rotationDirection: Math.random() < 0.5 ? -1 : 1,
  swayAmount: (Math.random() * 2 - 1) * 0.5, // +/- 0.5 (less sway)
  color: getRandomColor(),
  type: 'balloon',
});

export const createPumpkin = (id: number): FallingItem => ({
  id,
  x: Math.random() * 100,
  y: -10,
  size: Math.random() * 20 + 25,
  speed: Math.random() * 2 + 1,
  rotation: (Math.random() * 2 - 1) * 45, // +/- 45 degrees
  rotationLimit: 45,
  rotationDirection: Math.random() < 0.5 ? -1 : 1,
  swayAmount: Math.random() * 2 - 1,
  color: getPumpkinColor(),
  type: 'pumpkin',
});

export const createBirthdayItem = (id: number): FallingItem => {
  const random = Math.random();
  if (random < 0.35) {
    return createBalloon(id); // 35%
  } else if (random < 0.7) {
    return createCake(id); // 35%
  } else {
    return createPartyPopper(id); // 30%
  }
};

export const createPartyItem = (id: number): FallingItem => {
  const random = Math.random();
  if (random < 0.1) {
    return createPartyPopper(id);
  } else {
    return createConfetti(id);
  }
};

const lightenColor = (color: string, amount: number) => {
  let [r, g, b] = color.match(/\d+/g)!.map(Number);
  r = Math.min(255, r + amount);
  g = Math.min(255, g + amount);
  b = Math.min(255, b + amount);
  return `rgb(${r}, ${g}, ${b})`;
};

interface FallingParticleProps {
  item: FallingItem;
}

const FallingParticle = (props: FallingParticleProps) => {
  const { item } = props;

  const itemStyle = {
    position: 'absolute' as const,
    left: `${item.x}%`,
    top: `${item.y}%`,
    width: `${item.size}px`,
    height: `${item.size}px`,
    backgroundColor: 'transparent',
    transform: `rotate(${item.rotation}deg)`,
    transition: 'transform 0.1s ease-out',
    zIndex: 1001,
    pointerEvents: 'none' as const,
  };

  if (item.type === 'snowflake') {
    return (
      <div
        style={{
          ...itemStyle,
          borderRadius: '50%',
          backgroundColor: item.color,
          opacity: calculateOpacity(item.y),
          transition: 'opacity 0.1s ease-out',
        }}
      />
    );
  } else if (item.type === 'confetti') {
    return (
      <div
        style={{
          ...itemStyle,
          height: `${item.size * Math.random()}px`,
          backgroundColor: item.color,
          opacity: calculateOpacity(item.y),
          transition: 'opacity 0.1s ease-out',
          // skew
          // transform: `skewX(${item.skew}deg) skewY(${item.swayAmount}deg)`,
        }}
      />
    );
  } else if (item.type === 'heart') {
    return (
      <div
        className="absolute"
        style={{
          ...itemStyle,
        }}
      >
        <Heart
          className="transform -translate-x-1/2 -translate-y-1/2"
          size={item.size}
          fill={item.color}
          color="none"
          style={{
            opacity: calculateOpacity(item.y),
          }}
        />
      </div>
    );
  } else if (item.type === 'shamrock') {
    return (
      <div className="absolute" style={itemStyle}>
        <Clover
          className="transform -translate-x-1/2 -translate-y-1/2"
          size={item.size}
          fill={`${item.color}aa`}
          stroke={item.color}
          // stroke={lightenColor(item.color, 100)}
          color="none"
          style={{
            opacity: calculateOpacity(item.y),
            strokeWidth: 1,
          }}
        />
      </div>
    );
  } else if (item.type === 'cake') {
    return (
      <div className="absolute" style={itemStyle}>
        <Cake
          className="transform -translate-x-1/2 -translate-y-1/2"
          size={item.size}
          fill="transparent"
          stroke={item.color}
          color="none"
          style={{
            strokeOpacity: calculateOpacity(item.y) * 2,
            opacity: calculateOpacity(item.y),
          }}
        />
      </div>
    );
  } else if (item.type === 'party-popper') {
    return (
      <div className="absolute" style={itemStyle}>
        <PartyPopper
          className="transform -translate-x-1/2 -translate-y-1/2"
          size={item.size}
          // fill={item.color}
          stroke={item.color}
          color="none"
          style={{
            opacity: calculateOpacity(item.y),
          }}
        />
      </div>
    );
  } else if (item.type === 'balloon') {
    return (
      <BalloonIcon
        fill={item.color}
        stroke={item.color}
        color={item.color}
        style={{
          ...itemStyle,
          // color: item.color,
          opacity: calculateOpacity(item.y),
        }}
      />
    );
  } else if (item.type === 'pumpkin') {
    return (
      <PumpkinIcon
        fill={item.color}
        stroke="#000"
        color={item.color}
        style={{
          ...itemStyle,
          // color: item.color,
          opacity: calculateOpacity(item.y),
        }}
      />
    );
  }
  return (
    // Return snowflake as default
    <div
      style={{
        ...itemStyle,
        borderRadius: '50%',
        backgroundColor: item.color,
        opacity: calculateOpacity(item.y),
        transition: 'opacity 0.1s ease-out',
      }}
    />
  );
};

export default FallingParticle;
