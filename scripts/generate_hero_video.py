"""Generate Pixaloom's original, seamless high-definition hero motion loop."""

from pathlib import Path

import cv2
import numpy as np


WIDTH = 1440
HEIGHT = 810
FPS = 30
DURATION = 10
OUTPUT = Path('/tmp/pixaloom-ambient-hd-source.mp4')
POSTER = Path(__file__).resolve().parents[1] / 'public/video/pixaloom-ambient-poster-v2.jpg'


def gaussian(x: np.ndarray, y: np.ndarray, cx: float, cy: float, sx: float, sy: float) -> np.ndarray:
    return np.exp(-(((x - cx) / sx) ** 2 + ((y - cy) / sy) ** 2))


def main() -> None:
    writer = cv2.VideoWriter(str(OUTPUT), cv2.VideoWriter_fourcc(*'mp4v'), FPS, (WIDTH, HEIGHT))
    if not writer.isOpened():
        raise RuntimeError('Could not open the video writer')

    x = np.linspace(-1.0, 1.0, WIDTH, dtype=np.float32)[None, :]
    y = np.linspace(-0.62, 0.62, HEIGHT, dtype=np.float32)[:, None]
    rng = np.random.default_rng(29)
    grain_a = rng.normal(0, 1, (HEIGHT, WIDTH)).astype(np.float32)
    grain_b = rng.normal(0, 1, (HEIGHT, WIDTH)).astype(np.float32)

    for frame_number in range(FPS * DURATION):
        phase = 2 * np.pi * frame_number / (FPS * DURATION)
        warp_x = x + 0.10 * np.sin(2.2 * y + phase) + 0.035 * np.sin(7 * y - phase * 2)
        warp_y = y + 0.08 * np.cos(2.6 * x - phase) + 0.025 * np.sin(6 * x + phase)

        blue = gaussian(warp_x, warp_y, -0.28 + 0.13 * np.sin(phase), -0.05, 0.62, 0.34)
        rust = gaussian(warp_x, warp_y, 0.42 + 0.10 * np.cos(phase), 0.12, 0.48, 0.27)
        pearl = gaussian(warp_x, warp_y, 0.04, -0.18 + 0.09 * np.cos(phase), 0.27, 0.16)
        veil = (np.sin(13 * warp_x + 8 * warp_y + phase * 1.6) + 1) * 0.5
        veil = np.power(veil, 10) * gaussian(warp_x, warp_y, 0.03, 0.0, 0.86, 0.52)
        rings = (np.sin(24 * np.sqrt((warp_x + .06) ** 2 + (warp_y * 1.35) ** 2) - phase * 2) + 1) * 0.5
        rings = np.power(rings, 15) * 0.22

        image = np.zeros((HEIGHT, WIDTH, 3), dtype=np.float32)
        image[..., 0] = 3 + blue * 18 + rust * 54 + pearl * 43
        image[..., 1] = 4 + blue * 29 + rust * 18 + pearl * 38
        image[..., 2] = 6 + blue * 47 + rust * 9 + pearl * 31
        image += veil[..., None] * np.array([30, 39, 49], dtype=np.float32)
        image += rings[..., None] * np.array([12, 18, 24], dtype=np.float32)
        # A slowly evolving, perfectly looping grain field avoids a static
        # digital texture while keeping the motion calm enough to compress.
        grain = grain_a * np.cos(phase) + grain_b * np.sin(phase)
        image += grain[..., None] * 1.05

        vignette = 1 - 0.58 * np.clip((x ** 2 + (y * 1.2) ** 2), 0, 1)
        image *= vignette[..., None]
        finished_frame = np.uint8(np.clip(image, 0, 255))
        if frame_number == 0:
            POSTER.parent.mkdir(parents=True, exist_ok=True)
            cv2.imwrite(str(POSTER), finished_frame, [cv2.IMWRITE_JPEG_QUALITY, 92])
        writer.write(finished_frame)

    writer.release()
    print(OUTPUT)


if __name__ == '__main__':
    main()
