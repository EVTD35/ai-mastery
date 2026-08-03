'votre client'; // (ou 'use client';)
'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Durée de l'inertie (plus c'est haut, plus c'est glissant)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Courbe d'accélération fluide
      
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  children;
  return <>{children}</>;
}