import { Leaf, Flame, WheatOff, Star, Salad } from "lucide-react";
import { DietaryTag } from "@/config/restaurant.config";

interface DietaryIconProps {
  tag: DietaryTag;
  label: string;
  showLabel?: boolean;
}

const tagConfig: Record<DietaryTag, { icon: React.ElementType; className: string }> = {
  vegan:       { icon: Leaf,    className: "tag-vegan" },
  vegetarian:  { icon: Salad,   className: "tag-vegan" },
  spicy:       { icon: Flame,   className: "tag-spicy" },
  glutenFree:  { icon: WheatOff, className: "tag-gf" },
  chefSpecial: { icon: Star,    className: "tag-special" },
};

export default function DietaryIcon({ tag, label, showLabel = true }: DietaryIconProps) {
  const config = tagConfig[tag];
  if (!config) return null;
  const { icon: Icon, className } = config;
  return (
    <span className={`dietary-tag ${className}`}>
      <Icon size={10} strokeWidth={2.5} />
      {showLabel && label}
    </span>
  );
}
