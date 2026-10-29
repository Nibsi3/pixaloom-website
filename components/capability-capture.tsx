'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react';
import styles from './capability-capture.module.css';

export function CapabilityCapture({ src, caption, width, height, className = '' }: { src: string; caption: string; width: number; height: number; className?: string }) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const captionId = useId();

  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    const opener = trigger.current;
    document.body.style.overflow = 'hidden';
    dialog.current?.showModal();
    return () => {
      document.body.style.overflow = overflow;
      opener?.focus({ preventScroll: true });
    };
  }, [open]);

  return <figure className={`${styles.capture} ${className}`}>
    <button ref={trigger} className={styles.thumbnail} type="button" aria-haspopup="dialog" aria-label={`Enlarge image: ${caption}`} onClick={() => { setZoom(false); setOpen(true); }}>
      <Image unoptimized src={src} alt={caption} width={width} height={height} />
      <span className={styles.hint}><Maximize2 size={15} /> Enlarge image</span>
    </button>
    <figcaption>{caption}</figcaption>
    {open && createPortal(<dialog ref={dialog} className={styles.dialog} aria-label="Screenshot viewer" aria-describedby={captionId} onCancel={() => setOpen(false)} onClose={() => setOpen(false)}>
      <div className={styles.toolbar}>
        <button type="button" onClick={() => setZoom(!zoom)} aria-pressed={zoom}>{zoom ? <ZoomOut size={18} /> : <ZoomIn size={18} />}{zoom ? 'Fit to screen' : 'Original size'}</button>
        <button type="button" autoFocus onClick={() => setOpen(false)} aria-label="Close image"><X size={21} /> Close</button>
      </div>
      <div className={`${styles.stage} ${zoom ? styles.zoomed : ''}`} onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
        <Image className={styles.fullImage} unoptimized src={src} alt={caption} width={width} height={height} />
      </div>
      <p id={captionId} className={styles.caption}>{caption}</p>
    </dialog>, document.body)}
  </figure>;
}
