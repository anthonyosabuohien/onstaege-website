import React, { Suspense, useEffect, useRef, useState } from 'react';
import type { EarlyAccessContext } from './EarlyAccessModal';
import { ContentSkeleton } from './ContentSkeleton';

interface DeferredSectionProps {
  id?: string;
  minHeight: number;
  component: React.LazyExoticComponent<
    React.ComponentType<{ onOpenEarlyAccess: (context?: EarlyAccessContext) => void }>
  >;
  onOpenEarlyAccess: (context?: EarlyAccessContext) => void;
}

/** Loads long, below-the-fold sections only when a visitor is close to them. */
export const DeferredSection: React.FC<DeferredSectionProps> = ({
  id,
  minHeight,
  component: Component,
  onOpenEarlyAccess,
}) => {
  const markerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker || !('IntersectionObserver' in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: '800px 0px' },
    );

    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  const placeholder = (loading: boolean) => (
    <ContentSkeleton
      markerRef={markerRef}
      id={id}
      minHeight={minHeight}
      loading={loading}
    />
  );

  if (!shouldRender) return placeholder(false);

  return (
    <Suspense fallback={placeholder(true)}>
      <Component onOpenEarlyAccess={onOpenEarlyAccess} />
    </Suspense>
  );
};
