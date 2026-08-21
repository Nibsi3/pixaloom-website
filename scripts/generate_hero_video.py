"""Generate Pixaloom's original, seamless high-definition hero motion loop.

Frames are rendered with numpy and piped straight into ffmpeg. The previous
version wrote an intermediate `mp4v` file through OpenCV and then re-encoded a
downscaled copy, so the shipped film carried two rounds of generation loss at
960x540. Here a lossless master is rendered once and every delivery file is
encoded from it.
"""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

import numpy as np

WIDTH = 1920
HEIGHT = 1080
FPS = 30
DURATION = 10

ROOT = Path(__file__).resolve().parents[1]
VIDEO_DIR = ROOT / 'public/video'
MASTER = Path('/tmp/pixaloom-ambient-master.mkv')
POSTER = VIDEO_DIR / 'pixaloom-ambient-poster-v2.jpg'
DESKTOP_MP4 = VIDEO_DIR / 'pixaloom-ambient.mp4'
DESKTOP_WEBM = VIDEO_DIR / 'pixaloom-ambient-hd-v2.webm'
MOBILE_WEBM = VIDEO_DIR / 'pixaloom-ambient-mobile-v2.webm'


def gaussian(x: np.ndarray, y: np.ndarray, cx: float, cy: float, sx: float, sy: float) -> np.ndarray:
    return np.exp(-(((x - cx) / sx) ** 2 + ((y - cy) / sy) ** 2))


def render_frame(frame_number: int, x: np.ndarray, y: np.ndarray,
                 grain_a: np.ndarray, grain_b: np.ndarray) -> np.ndarray:
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
    # Channels are written in RGB order; ffmpeg is fed rgb24 directly.
    image[..., 0] = 6 + blue * 47 + rust * 9 + pearl * 31
    image[..., 1] = 4 + blue * 29 + rust * 18 + pearl * 38
    image[..., 2] = 3 + blue * 18 + rust * 54 + pearl * 43
    image += veil[..., None] * np.array([49, 39, 30], dtype=np.float32)
    image += rings[..., None] * np.array([24, 18, 12], dtype=np.float32)
    # A slowly evolving, perfectly looping grain field avoids a static digital
    # texture and dithers the gradients, which keeps dark tones free of banding.
    grain = grain_a * np.cos(phase) + grain_b * np.sin(phase)
    image += grain[..., None] * 1.05

    vignette = 1 - 0.58 * np.clip((x ** 2 + (y * 1.2) ** 2), 0, 1)
    image *= vignette[..., None]
    return np.uint8(np.clip(image, 0, 255))


def run(command: list[str], stdin=None) -> subprocess.Popen | None:
    if stdin is subprocess.PIPE:
        return subprocess.Popen(command, stdin=subprocess.PIPE)
    subprocess.run(command, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return None


def render_master() -> None:
    encoder = run([
        'ffmpeg', '-y', '-hide_banner', '-loglevel', 'error',
        '-f', 'rawvideo', '-pix_fmt', 'rgb24',
        '-s', f'{WIDTH}x{HEIGHT}', '-r', str(FPS), '-i', '-',
        '-c:v', 'ffv1', '-level', '3', str(MASTER),
    ], stdin=subprocess.PIPE)
    assert encoder is not None and encoder.stdin is not None

    x = np.linspace(-1.0, 1.0, WIDTH, dtype=np.float32)[None, :]
    y = np.linspace(-0.62, 0.62, HEIGHT, dtype=np.float32)[:, None]
    rng = np.random.default_rng(29)
    grain_a = rng.normal(0, 1, (HEIGHT, WIDTH)).astype(np.float32)
    grain_b = rng.normal(0, 1, (HEIGHT, WIDTH)).astype(np.float32)

    total = FPS * DURATION
    for frame_number in range(total):
        encoder.stdin.write(render_frame(frame_number, x, y, grain_a, grain_b).tobytes())
        if frame_number % 30 == 0:
            print(f'  frame {frame_number}/{total}', flush=True)

    encoder.stdin.close()
    if encoder.wait() != 0:
        raise RuntimeError('ffmpeg failed while writing the lossless master')


def encode_deliverables() -> None:
    VIDEO_DIR.mkdir(parents=True, exist_ok=True)

    # VP9 reproduces these smooth gradients far more efficiently than H.264
    # (measured PSNR 50.8 at 164KB against 50.7 for H.264 at 3.1MB), so the mp4
    # exists only as a fallback for browsers without VP9 and is tuned for size.
    print('  encoding desktop mp4', flush=True)
    run([
        'ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-i', str(MASTER),
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '23',
        # aq-mode 3 spends bits on the dark, smooth areas where banding shows.
        '-x264-params', 'aq-mode=3:aq-strength=1.1',
        '-profile:v', 'high', '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart', '-an', str(DESKTOP_MP4),
    ])

    print('  encoding desktop webm', flush=True)
    run([
        'ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-i', str(MASTER),
        '-c:v', 'libvpx-vp9', '-crf', '30', '-b:v', '0',
        '-row-mt', '1', '-deadline', 'good', '-cpu-used', '1',
        '-pix_fmt', 'yuv420p', '-an', str(DESKTOP_WEBM),
    ])

    print('  encoding mobile webm', flush=True)
    run([
        'ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-i', str(MASTER),
        '-vf', 'scale=1280:720:flags=lanczos',
        '-c:v', 'libvpx-vp9', '-crf', '33', '-b:v', '0',
        '-row-mt', '1', '-deadline', 'good', '-cpu-used', '1',
        '-pix_fmt', 'yuv420p', '-an', str(MOBILE_WEBM),
    ])

    print('  writing poster', flush=True)
    run([
        'ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-i', str(MASTER),
        '-frames:v', '1', '-q:v', '2', str(POSTER),
    ])


def main() -> None:
    if shutil.which('ffmpeg') is None:
        sys.exit('ffmpeg is required to build the hero film')

    print('Rendering lossless master...', flush=True)
    render_master()
    print('Encoding deliverables...', flush=True)
    encode_deliverables()
    MASTER.unlink(missing_ok=True)
    print('Done.')


if __name__ == '__main__':
    main()
