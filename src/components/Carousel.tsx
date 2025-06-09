import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CarouselSlide {
  id: string | number;
  content?: React.ReactNode; // For complex content
  imageUrl?: string;
  altText?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  options?: Parameters<typeof useEmblaCarousel>[0];
  showArrows?: boolean;
  autoplayDelay?: number; // in ms
  aspectRatio?: string; // e.g., 'aspect-video', 'aspect-square', or 'h-96' for fixed height
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options = { loop: true },
  showArrows = true,
  autoplayDelay = 4000,
  aspectRatio = 'aspect-video', // Default to 16:9
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })]);

  console.log("Rendering Carousel with", slides.length, "slides. Options:", options);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!slides || slides.length === 0) {
    return <div className={`w-full bg-muted flex items-center justify-center text-muted-foreground ${aspectRatio}`}>No slides to display.</div>;
  }

  return (
    <div className="relative w-full overflow-hidden group" ref={emblaRef}>
      <div className="flex">
        {slides.map((slide, index) => (
          <div className="flex-[0_0_100%] min-w-0 relative" key={slide.id || index}>
            {slide.imageUrl ? (
              <div className={`w-full bg-muted ${aspectRatio}`}>
                <img
                  src={slide.imageUrl}
                  alt={slide.altText || `Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                />
              </div>
            ) : (
              <div className={`w-full flex items-center justify-center bg-muted text-muted-foreground ${aspectRatio}`}>
                {slide.content || `Slide ${index + 1}`}
              </div>
            )}
          </div>
        ))}
      </div>

      {showArrows && emblaApi && slides.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}
      {/* Add Dots/Pagination if needed */}
    </div>
  );
};
export default Carousel;