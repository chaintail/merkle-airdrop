import { EffectType } from "./FallingParticles";

// Move special events calculations outside component
export const getSpecialEvent = (): EffectType | null => {
  const today = new Date();

  // December (snow)
  if (today.getMonth() === 11 && today.getDate() !== 31) {
    return 'snow';
  }

  // New Years Eve
  if (today.getMonth() === 11 && today.getDate() === 31) {
    return 'party';
  }

  // New Years Day
  if (today.getMonth() === 0 && today.getDate() === 1) {
    return 'confetti';
  }

  // Valentine's Day (heart)
  if (
    today.getMonth() === 1 &&
    today.getDate() >= 10 &&
    today.getDate() <= 14
  ) {
    return 'heart';
  }

  // St Patrick's Day (shamrock)
  if (
    today.getMonth() === 2 &&
    today.getDate() >= 14 &&
    today.getDate() <= 17
  ) {
    return 'shamrock';
  }

  // Halloween (pumpkin)
  if (today.getMonth() === 9 && today.getDate() >= 28) {
    return 'pumpkin';
  }

  // Special birthdays (birthday)
  // const isTGE = today.getMonth() === 2 && today.getDate() === 7;
  const isSHIBBirthday =
    (today.getMonth() === 6 && today.getDate() === 31) ||
    (today.getMonth() === 7 && today.getDate() === 1);
  const isShibariumBirthday = today.getMonth() === 7 && today.getDate() === 5;
  // const isPlatformBirthday =
  //   today.getMonth() === 8 && today.getDate() >= 11 && today.getDate() <= 18;

  if (
    (today.getMonth() === 3 && today.getDate() === 1) // april fools day
    || (today.getMonth() === 3 && today.getDate() === 20) // 4-20
    || isSHIBBirthday
    || isShibariumBirthday
    // || isTGE
    // || isPlatformBirthday

  ) {
    return 'birthday';
  }

  return null;
};
