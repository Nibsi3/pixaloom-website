'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/components/utils';
import { Lens } from '@/components/ui/lens';

type Props = {
  title: string;
  heroPng: string;
  heroFallback: string;
  gallery?: string[];
};

export function WorkGallery({ title, heroPng, heroFallback, gallery }: Props) {
  const images = useMemo(() => {
    const merged = [heroPng, ...(gallery || [])];
    const uniq: string[] = [];
    for (const src of merged) {
      if (!src) continue;
      if (!uniq.includes(src)) uniq.push(src);
    }
    return uniq;
  }, [heroPng, gallery]);

  const [active, setActive] = useState(images[0] || heroPng);

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-lg border border-bg-700 bg-bg-850">
        <div className="aspect-[16/9] w-full">
          <Image
            src={active || heroFallback}
            alt={title}
            width={1600}
            height={900}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {images.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {images.map((src) => {
            const selected = src === active;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setActive(src)}
                className={cn(
                  'shrink-0 overflow-hidden rounded-md border transition',
                  selected
                    ? 'border-accent-500 ring-1 ring-accent-500/40'
                    : 'border-bg-700 opacity-60 hover:opacity-100',
                )}
                aria-pressed={selected}
              >
                <Lens zoomFactor={1.6} lensSize={90}>
                  <div className="h-12 w-20 bg-bg-850">
                    <Image
                      src={src}
                      alt=""
                      width={160}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Lens>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
