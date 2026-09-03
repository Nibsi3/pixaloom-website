'use client';
import { useEffect } from 'react';
import { trackEvent } from '@/lib/events';

export function ConversionTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest('a');
      const href = anchor?.getAttribute('href') || '';
      if (href.startsWith('mailto:')) trackEvent('email_click');
      else if (href.startsWith('tel:')) trackEvent('phone_click');
      else if (href.startsWith('https://wa.me/27662995533')) trackEvent('whatsapp_click');
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
