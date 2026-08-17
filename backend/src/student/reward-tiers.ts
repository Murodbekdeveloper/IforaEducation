import { RewardStatus, RewardTier, RewardTierStatus } from './student.types';

export const REWARD_TIERS: RewardTier[] = [
  {
    key: 'bronza',
    title: 'Bronza',
    threshold: 200,
    discountPercent: 5,
    perk: 'Keyingi kursga 5% chegirma',
  },
  {
    key: 'kumush',
    title: 'Kumush',
    threshold: 500,
    discountPercent: 10,
    perk: 'Tikuvchilik anjomlari toʻplami (oʻlchov lentasi, ignalar, ilgichlar) + 10% chegirma',
  },
  {
    key: 'oltin',
    title: 'Oltin',
    threshold: 900,
    discountPercent: 20,
    perk: 'Ifora Isaqova bilan 30 daqiqalik shaxsiy konsultatsiya + 20% chegirma',
  },
  {
    key: 'olmos',
    title: 'Olmos',
    threshold: 1400,
    discountPercent: 35,
    perk: '"Yilning eng faol shogirdi" sertifikati va premium tikuvchilik toʻplami + 35% chegirma',
  },
];

export function getDiscountPercent(totalPoints: number): number {
  let percent = 0;
  for (const tier of REWARD_TIERS) {
    if (totalPoints >= tier.threshold) {
      percent = tier.discountPercent;
    }
  }
  return percent;
}

export function buildRewardStatus(totalPoints: number): RewardStatus {
  const tiers: RewardTierStatus[] = REWARD_TIERS.map((tier) => ({
    ...tier,
    unlocked: totalPoints >= tier.threshold,
  }));
  const unlockedTiers = tiers.filter((tier) => tier.unlocked);
  const currentTier =
    unlockedTiers.length > 0 ? unlockedTiers[unlockedTiers.length - 1] : null;
  const nextTier = tiers.find((tier) => !tier.unlocked) ?? null;

  return {
    totalPoints,
    discountPercent: currentTier?.discountPercent ?? 0,
    currentTierTitle: currentTier?.title ?? null,
    nextTier,
    pointsToNext: nextTier ? nextTier.threshold - totalPoints : null,
    tiers,
  };
}
