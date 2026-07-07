"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

export function ProjectGallery({
  name,
  gallery,
}: {
  name: string;
  gallery?: string[];
}) {
  const images = gallery && gallery.length > 0 ? gallery : [];
  const hasImages = images.length > 0;
  // Real images when we have them, otherwise four placeholders.
  const slides = hasImages ? images : [null, null, null, null];

  const [emblaRef, embla] = useEmblaCarousel({ loop: true }, [
    Fade(),
    Autoplay({ delay: 4200, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

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

  const openLightbox = () => {
    if (hasImages) setLightbox(selected);
  };
  const closeLightbox = () => {
    setLightbox((i) => {
      if (i !== null) embla?.scrollTo(i); // keep the carousel in sync on close
      return null;
    });
  };
  const step = (dir: number) =>
    setLightbox((i) => (i === null ? i : (i + dir + images.length) % images.length));

  // Arrow-key navigation while the lightbox is open.
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, images.length]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-line bg-surface-2">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((src, i) => (
            <div key={i} className="relative min-w-0 flex-[0_0_100%]">
              <div className="relative aspect-[16/9] bg-surface-2">
                {src ? (
                  <button
                    type="button"
                    onClick={openLightbox}
                    aria-label="Expand image"
                    className="group absolute inset-0 cursor-zoom-in"
                  >
                    <Image
                      src={src}
                      alt={`${name} screenshot ${i + 1}`}
                      fill
                      sizes="(min-width: 640px) 820px, 92vw"
                      className="object-contain"
                    />
                    <span className="pointer-events-none absolute right-2 top-2 rounded-md bg-canvas/70 p-1.5 text-muted opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </button>
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

      {slides.length > 1 && (
        <>
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
        </>
      )}

      {/* Lightbox */}
      <Dialog.Root
        open={lightbox !== null}
        onOpenChange={(open) => {
          if (!open) closeLightbox();
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-sm motion-safe:data-[state=open]:animate-overlay-in" />
          <Dialog.Content
            aria-describedby={undefined}
            className="fixed inset-0 z-[201] grid place-items-center p-4 focus:outline-none motion-safe:data-[state=open]:animate-overlay-in"
          >
            <Dialog.Title className="sr-only">
              {name} screenshot {lightbox !== null ? lightbox + 1 : ""}
            </Dialog.Title>
            {lightbox !== null && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={images[lightbox]}
                alt={`${name} screenshot ${lightbox + 1}`}
                className="max-h-[90vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
              />
            )}

            <Dialog.Close className="fixed right-4 top-4 cursor-pointer rounded-lg bg-white/10 p-2 text-white/80 backdrop-blur transition-colors hover:bg-white/20 hover:text-white">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Dialog.Close>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="fixed left-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/10 p-2.5 text-white/80 backdrop-blur transition-colors hover:bg-white/20 hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="fixed right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/10 p-2.5 text-white/80 backdrop-blur transition-colors hover:bg-white/20 hover:text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="fixed inset-x-0 bottom-4 text-center font-mono text-xs text-white/60">
                  {lightbox !== null ? lightbox + 1 : 0} / {images.length}
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
