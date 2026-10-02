'use client';

import type { ImageLoaderProps } from 'next/image';
import imageManifest from './generated-image-manifest.json';

const images: Record<string, { hash: string; widths: number[] }> = imageManifest;

// Serve real, prebuilt sizes on every host, including Workers without an Images binding.
export default function imageLoader({ src, width }: ImageLoaderProps): string {
  const image = images[src];
  if (!image) return src;
  const size = image.widths.find((candidate) => candidate >= width) ?? image.widths[image.widths.length - 1];
  return `/optimized/${image.hash}-${size}.webp`;
}
