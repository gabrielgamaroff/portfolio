"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProjectGallery({
  name,
  gallery,
}: {
  name: string;
  gallery?: string[];
}) {
  const slides = Array.from({ length: 4 }, (_, i) => gallery?.[i] ?? null);
  const [emblaRef, embla] = useEmblaCarousel({ loop: true }, [
    Fade(),
    Autoplay({ delay: 4200, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (embla) setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", onSelect);
    };
  }, [embla, onSelect]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-line">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((src, i) => (
            <div key={i} className="relative min-w-0 flex-[0_0_100%]">
              <div className="relative aspect-[16/9] bg-surface-2">
                {src ? (
                  <Image
                    src={src}
                    alt={`${name} screenshot ${i + 1}`}
                    fill
                    sizes="(min-width: 640px) 820px, 92vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-mono text-sm text-faint">
                      {name} {i + 1}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* arrows */}
      <button
        type="button"
        onClick={() => embla?.scrollPrev()}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-line bg-canvas/70 p-2 text-muted backdrop-blur-sm transition-colors hover:text-ink"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => embla?.scrollNext()}
        aria-label="Next image"
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-line bg-canvas/70 p-2 text-muted backdrop-blur-sm transition-colors hover:text-ink"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* dots */}
      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => embla?.scrollTo(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`h-1.5 cursor-pointer rounded-full transition-all ${
              selected === i ? "w-5 bg-accent" : "w-1.5 bg-muted/50 hover:bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
