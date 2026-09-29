import React from 'react';

interface ContentSkeletonProps {
  id?: string;
  minHeight?: number;
  loading?: boolean;
  markerRef?: React.Ref<HTMLDivElement>;
  variant?: 'section' | 'page';
}

/** A layout-shaped placeholder used while lazy page content is being fetched. */
export const ContentSkeleton: React.FC<ContentSkeletonProps> = ({
  id,
  minHeight = 720,
  loading = true,
  markerRef,
  variant = 'section',
}) => (
  <div
    ref={markerRef}
    id={id}
    className={`content-skeleton content-skeleton--${variant}`}
    style={{ minHeight }}
    role={loading ? 'status' : undefined}
    aria-label={loading ? 'Loading content' : undefined}
    aria-hidden={loading ? undefined : true}
    aria-live={loading ? 'polite' : undefined}
  >
    <div className="content-skeleton__inner" aria-hidden="true">
      <div className="content-skeleton__eyebrow skeleton-shape" />
      <div className="content-skeleton__title skeleton-shape" />
      <div className="content-skeleton__copy skeleton-shape" />
      <div className="content-skeleton__copy content-skeleton__copy--short skeleton-shape" />
      <div className="content-skeleton__grid">
        <div className="content-skeleton__feature skeleton-shape" />
        <div className="content-skeleton__stack">
          <div className="content-skeleton__card skeleton-shape" />
          <div className="content-skeleton__card content-skeleton__card--short skeleton-shape" />
        </div>
      </div>
    </div>
  </div>
);
