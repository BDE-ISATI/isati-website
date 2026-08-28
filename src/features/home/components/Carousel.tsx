import { useMemo, useState } from "react";

import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import cn from "@/shared/utils/cn";

interface CarouselProps {
  images: string[];
  pageSize?: number;
  alt?: string;
}

export default function Carousel({ images, pageSize = 6, alt = "Affiche d'un évènement de l'ISATI" }: CarouselProps) {
  const [page, setPage] = useState(0);

  const pages = useMemo(() => {
    const chunks: string[][] = [];
    for (let index = 0; index < images.length; index += pageSize) {
      chunks.push(images.slice(index, index + pageSize));
    }
    return chunks;
  }, [images, pageSize]);

  if (pages.length === 0) return null;

  const goTo = (index: number) => setPage((index + pages.length) % pages.length);

  return (
    <div className="flex w-full items-center gap-2 sm:gap-4">
      <button
        type="button"
        onClick={() => goTo(page - 1)}
        aria-label="Affiches précédentes"
        className="shrink-0 cursor-pointer rounded-full p-2 transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current sm:p-3"
      >
        <ChevronDown className="h-6 w-6 rotate-90 sm:h-8 sm:w-8" />
      </button>

      <div className="flex min-w-0 flex-1 flex-col items-center">
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {pages.map((chunk, chunkIndex) => (
              <div
                key={chunkIndex}
                className="grid w-full shrink-0 grid-cols-2 gap-2 p-1 sm:gap-3 md:grid-cols-3"
                aria-hidden={chunkIndex !== page}
              >
                {chunk.map((src) => (
                  <div key={src} className="relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={src}
                      alt={alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {pages.length > 1 && (
          <div className="mt-6 flex flex-row justify-center gap-3">
            {pages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Aller à la page ${index + 1}`}
                aria-current={index === page}
                className={cn(
                  "h-3 w-3 cursor-pointer rounded-full transition-colors duration-300",
                  index === page ? "bg-current" : "bg-current/30 hover:bg-current/60",
                )}
              />
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => goTo(page + 1)}
        aria-label="Affiches suivantes"
        className="shrink-0 cursor-pointer rounded-full p-2 transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current sm:p-3"
      >
        <ChevronDown className="h-6 w-6 -rotate-90 sm:h-8 sm:w-8" />
      </button>
    </div>
  );
}
