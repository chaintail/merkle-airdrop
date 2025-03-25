"use client";

import { useState, useEffect, memo, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import FallingParticle, {
  FallingItem,
  createSnowflake,
  createHeart,
  createShamrock,
  createBirthdayItem,
  createConfetti,
  createPumpkin,
  createBalloon,
  createPartyPopper,
  createPartyItem,
} from './falling-particle';
import EffectFab from './effect-fab';
import { getSpecialEvent } from './getSpecialEvents';

export const EFFECT_TYPES = [
  'snow',
  'heart',
  'shamrock',
  'birthday',
  'balloon',
  'party',
  'confetti',
  'pumpkin',
] as const;
export type EffectType = (typeof EFFECT_TYPES)[number];

const createFallingItem = (effectType: EffectType): FallingItem => {
  switch (effectType) {
    case 'snow':
      return createSnowflake(Date.now());
    case 'heart':
      return createHeart(Date.now());
    case 'shamrock':
      return createShamrock(Date.now());
    case 'birthday':
      return createBirthdayItem(Date.now());
    case 'confetti':
      return createConfetti(Date.now());
    case 'balloon':
      return createBalloon(Date.now());
    case 'pumpkin':
      return createPumpkin(Date.now());
    case 'party':
      return createPartyItem(Date.now());
  }
};

const updateRotation = (item: FallingItem) => {
  const newRotation = item.rotation + 2 * item.speed * item.rotationDirection;
  let newRotationDirection = item.rotationDirection;
  if (newRotation >= item.rotationLimit) {
    newRotationDirection = -1;
  } else if (newRotation <= -item.rotationLimit) {
    newRotationDirection = 1;
  }
  return [newRotation, newRotationDirection];
};

const updateFallingItem = (item: FallingItem) => {
  // update the y-position of the item
  item.y += item.speed;

  // update the rotation of the item
  const [newRotation, newRotationDirection] = updateRotation(item);
  item.rotation = newRotation;
  item.rotationDirection = newRotationDirection as 1 | -1;

  // update the x-position of the item
  item.x = item.x + Math.sin(item.y / 10) * item.swayAmount; // Add swaying motion

  // // update the skew, if confetti
  // if (item.type === 'confetti') {
  //   item.skew = item.skew! + Math.sin(item.y / 10) * item.swayAmount;
  // }

  return item;
};

interface EffectToggleProps {
  onToggle?: (isActive: boolean) => void;
  className?: string;
  effect?: EffectType | 'off';
  // queryEffect?: EffectType;
}

const EffectToggleComponent: React.FC<EffectToggleProps> = ({
  onToggle,
  className = '',
  effect,
  // queryEffect,
}) => {
  const [isActive, setIsActive] = useState(true);
  const [fallingItems, setFallingItems] = useState<FallingItem[]>([]);
  const searchParams = useSearchParams();

  // Memoize the special event check
  const specialEventEffect = useMemo(() => {
    const specialEvent = getSpecialEvent();
    console.debug(`UPDATE getSpecialEvent specialEvent: ${specialEvent}`);
    return specialEvent;
  }, []);

  // Memoize effect type calculation
  const effectType = useMemo(() => {
    console.debug(
      `UPDATE effectType props.effect: ${effect}, query.effect: ${searchParams.get('effect')}, specialEvent: ${specialEventEffect}`,
    );
    if (effect === 'off') {
      return null;
    } else if (effect) {
      return effect;
    }
    const queryEffect = searchParams.get('effect') as EffectType | 'off' | null;
    if (queryEffect === 'off') {
      return null;
    } else if (queryEffect && EFFECT_TYPES.includes(queryEffect as EffectType)) {
      return queryEffect as EffectType;
    }
    return specialEventEffect;
  }, [effect, searchParams, specialEventEffect]);

  // Memoize number of items based on effect type
  const numberOfItems = useMemo(() => {
    console.debug('UPDATE numberOfItems');
    if (!effectType) return 0;

    switch (effectType) {
      case 'snow':
        return 50;
      case 'birthday':
        return 25;
      case 'confetti':
        return 40;
      case 'heart':
      case 'shamrock':
      case 'pumpkin':
        return 30;
      case 'party':
        return 50;
      default:
        return 35;
    }
  }, [effectType]);

  useEffect(() => {
    console.debug('UPDATE useEffect');
    if (!isActive || !effectType) {
      setFallingItems([]);
      return;
    }

    const interval = setInterval(() => {
      console.debug('UPDATE setInerval setFallingItems');
      setFallingItems((prevFallingItems) => {
        const movedFallingItems = prevFallingItems
          .map(updateFallingItem)
          .filter((item) => item.y < 100);

        const newFallingItems =
          movedFallingItems.length < numberOfItems
            ? [...movedFallingItems, createFallingItem(effectType)]
            : movedFallingItems;

        return newFallingItems;
      });
    }, 75);

    return () => {
      console.debug('UPDATE clearInterval');
      clearInterval(interval);
    };
  }, [isActive, effectType, numberOfItems]);

  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    onToggle?.(newState);
  };

  const containerStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    zIndex: 11,
    pointerEvents: 'none' as const,
  };

  if (!effectType) return null;

  return (
    <div>
      <EffectFab
        isActive={isActive}
        handleToggle={handleToggle}
        effectType={effectType}
      />

      <div style={containerStyle}>
        {fallingItems.map((item, index) => (
          <FallingParticle key={item.id + index} item={item} />
        ))}
      </div>
    </div>
  );
};

const FallingParticles = memo(EffectToggleComponent);
export default FallingParticles;
