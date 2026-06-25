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

  // Phase timings (in frames at 30fps)
  const accentBarDelay = 0;
  const subTitleDelay = 8;
  const mainTitleDelay = 18;
  const taglineDelay = 38;
  const leafDelay = 48;

  // Accent bar (green bar sliding in from left)
  const accentBarWidth = interpolate(frame, [accentBarDelay, accentBarDelay + 20], [0, 480], {
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

  // Leaf decorations fade
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
      {/* Card container */}
      <div
        style={{
          position: 'relative',
          background: 'rgba(12, 147, 71, 0.92)',
          borderRadius: 4,
          padding: '32px 48px 36px',
          minWidth: 560,
          maxWidth: 720,
          backdropFilter: 'blur(2px)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
          overflow: 'hidden',
        }}
      >
        {/* White side accent */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 6,
            background: WHITE,
            borderRadius: '4px 0 0 4px',
          }}
        />

        {/* Decorative top bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${WHITE} 0%, rgba(255,255,255,0.3) 100%)`,
            width: accentBarWidth,
            overflow: 'hidden',
          }}
        />

        {/* Episode label */}
        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12,
          }}
        >
          <div style={{ width: 28, height: 2, background: OFF_WHITE, opacity: 0.8 }} />
          <span
            style={{
              color: OFF_WHITE,
              fontSize: 13,
              letterSpacing: '0.22em',
              fontFamily: "'Arial', sans-serif",
              fontWeight: 600,
              textTransform: 'uppercase',
              opacity: 0.9,
            }}
          >
            Home Renovation Series
          </span>
          <div style={{ width: 28, height: 2, background: OFF_WHITE, opacity: 0.8 }} />
        </div>

        {/* Main title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            transformOrigin: 'left center',
            marginBottom: 8,
          }}
        >
          <div
            style={{
              color: WHITE,
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              textShadow: '0 2px 12px rgba(0,0,0,0.3)',
            }}
          >
            The Downton
          </div>
          <div
            style={{
              color: WHITE,
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              textShadow: '0 2px 12px rgba(0,0,0,0.3)',
            }}
          >
            Condo
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: tagOpacity,
            transform: `translateY(${tagY}px)`,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginTop: 14,
          }}
        >
          <div style={{ opacity: leafOpacity }}>
            <LeafIcon size={16} color={OFF_WHITE} />
          </div>
          <span
            style={{
              color: OFF_WHITE,
              fontSize: 15,
              fontFamily: "'Arial', sans-serif",
              fontStyle: 'italic',
              letterSpacing: '0.04em',
              opacity: 0.9,
            }}
          >
            Transforming spaces, one room at a time
          </span>
        </div>
      </div>
    </div>
  );
}
