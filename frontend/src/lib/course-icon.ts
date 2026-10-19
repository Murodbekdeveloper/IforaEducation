import {
  Baby,
  Crown,
  Flower2,
  Gem,
  Palette,
  Scissors,
  Shirt,
  Waves,
  type LucideIcon,
} from "lucide-react";

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Asoslar: Scissors,
  "Ayollar kiyimi": Flower2,
  "Pro dizayn": Gem,
  "Erkaklar kiyimi": Shirt,
  "Bolalar kiyimi": Baby,
  "Milliy liboslar": Crown,
  Trikotaj: Waves,
  Dizayn: Palette,
};

export const DEFAULT_CATEGORY_ICON: LucideIcon = Scissors;
