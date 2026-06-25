import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const GREEN = '#0C9347';
const WHITE = '#FFFFFF';
const OFF_WHITE = '#F5F5F0';

function LeafIcon({ size = 24, color = GREEN }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 3-8 3C11 10 3.5 14.5 3 22c0 0 2-4 5-6 1 2 2 4 4 6 0 0-1-4 0-8 2-5 5-8 5-8z" />
    </svg>
  );
}

export function DowntonTitle() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const subTitleDelay = 8;
  const mainTitleDelay = 18;
  const taglineDelay = 38;
  const leafDelay = 48;

  // Green accent line sliding in from left
  const accentLineWidth = interpolate(frame, [0, 20], [0, 340], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtitle slide + fade
  const subY = interpolate(frame, [subTitleDelay, subTitleDelay + 16], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subOpacity = interpolate(frame, [subTitleDelay, subTitleDelay + 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Main title spring scale
  const titleScale = spring({
    frame: frame - mainTitleDelay,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
    from: 0.6,
    to: 1,
  });
  const titleOpacity = interpolate(frame, [mainTitleDelay, mainTitleDelay + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Tagline fade + rise
  const tagOpacity = interpolate(frame, [taglineDelay, taglineDelay + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const tagY = interpolate(frame, [taglineDelay, taglineDelay + 18], [14, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Leaf fade
  const leafOpacity = interpolate(frame, [leafDelay, leafDelay + 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        padding: '0 80px 90px',
        fontFamily: "'Georgia', 'Times New Roman', serif",
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

        {/* Episode label */}
        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 10,
          }}
        >
          <span
            style={{
              color: GREEN,
              fontSize: 14,
              letterSpacing: '0.20em',
              fontFamily: "'Arial', sans-serif",
              fontWeight: 700,
              textTransform: 'uppercase',
              textShadow: '0 1px 6px rgba(0,0,0,0.6)',
            }}
          >
            Home Renovation Series
          </span>
        </div>

        {/* Green accent line */}
        <div
          style={{
            width: accentLineWidth,
            height: 3,
            background: GREEN,
            marginBottom: 14,
            borderRadius: 2,
          }}
        />

        {/* Main title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            transformOrigin: 'left center',
            marginBottom: 10,
          }}
        >
          <div
            style={{
              color: WHITE,
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              textShadow: '0 2px 16px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.4)',
            }}
          >
            The Downton Condo
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: tagOpacity,
            transform: `translateY(${tagY}px)`,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 4,
          }}
        >
          <div style={{ opacity: leafOpacity }}>
            <LeafIcon size={15} color={GREEN} />
          </div>
          <span
            style={{
              color: OFF_WHITE,
              fontSize: 18,
              fontFamily: "'Arial', sans-serif",
              fontStyle: 'italic',
              letterSpacing: '0.03em',
              textShadow: '0 1px 8px rgba(0,0,0,0.7)',
            }}
          >
            Transforming spaces, one room at a time
          </span>
        </div>
      </div>
    </div>
  );
}
