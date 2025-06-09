import React from 'react';
import { cn } from '@/lib/utils'; // For combining class names

interface ColorOption {
  id: string | number;
  name: string; // e.g., "Red", "Ocean Blue"
  hex: string;  // e.g., "#FF0000", "#0077BE"
  isAvailable?: boolean;
}

interface ColorSwatchSelectorProps {
  options: ColorOption[];
  selectedColorId?: string | number | null;
  onColorSelect: (colorId: string | number) => void;
  label?: string;
  swatchSize?: 'sm' | 'md' | 'lg'; // Tailwind classes: w-6 h-6, w-8 h-8, w-10 h-10
}

const ColorSwatchSelector: React.FC<ColorSwatchSelectorProps> = ({
  options,
  selectedColorId,
  onColorSelect,
  label = 'Select Color',
  swatchSize = 'md',
}) => {
  console.log("Rendering ColorSwatchSelector, selected:", selectedColorId);

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium text-foreground mb-1">{label}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((color) => (
          <button
            key={color.id}
            type="button"
            title={color.name}
            onClick={() => (color.isAvailable === undefined || color.isAvailable) && onColorSelect(color.id)}
            disabled={!(color.isAvailable === undefined || color.isAvailable)}
            className={cn(
              'rounded-full border-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              sizeClasses[swatchSize],
              selectedColorId === color.id ? 'border-primary scale-110 shadow-md' : 'border-border hover:border-muted-foreground',
              !(color.isAvailable === undefined || color.isAvailable) && 'opacity-50 cursor-not-allowed relative'
            )}
            aria-pressed={selectedColorId === color.id}
            aria-label={`Select color ${color.name}`}
          >
            <span
              className="block w-full h-full rounded-full"
              style={{ backgroundColor: color.hex }}
            />
            {!(color.isAvailable === undefined || color.isAvailable) && (
              <span className="absolute inset-0 flex items-center justify-center">
                <svg className="w-3/4 h-3/4 text-background opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <line x1="2" y1="2" x2="22" y2="22" strokeWidth="2.5" />
                </svg>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
export default ColorSwatchSelector;