import React, { useState } from 'react';

// Common Colors
const BRAND_COLORS = ['#1DB2AA', '#A87454', '#D4956B', '#0A4F4C', '#5A3A2B', '#EEDCCB'];

// Sleek Tooltip Component
const FloatingTooltip = ({ active, x, y, label, value }) => {
  if (!active) return null;
  return (
    <div
      style={{
        position: 'absolute',
        top: y - 60,
        left: x,
        transform: 'translateX(-50%)',
        background: 'rgba(90, 58, 43, 0.95)',
        backdropFilter: 'blur(4px)',
        color: '#ffffff',
        padding: '0.5rem 0.75rem',
        borderRadius: '6px',
        fontSize: '0.75rem',
        fontWeight: '500',
        pointerEvents: 'none',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        border: '1px solid rgba(255,255,255,0.1)',
        zIndex: 100,
        whiteSpace: 'nowrap',
        transition: 'left 0.15s ease, top 0.15s ease',
      }}
    >
      <div style={{ fontWeight: '700', color: '#1DB2AA', marginBottom: '2px' }}>{label}</div>
      <div>{value}</div>
    </div>
  );
};

// ==========================================
// 1. SVGAreaChart Component
// ==========================================
export const SVGAreaChart = ({ data = [], dataKey, xKey }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [tooltip, setTooltip] = useState({ active: false, x: 0, y: 0, label: '', value: '' });

  if (!data || data.length === 0) return <div>Aucune donnée disponible</div>;

  const width = 500;
  const height = 200;
  const paddingLeft = 45;
  const paddingRight = 15;
  const paddingTop = 15;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const values = data.map((d) => d[dataKey]);
  const maxValue = Math.max(...values, 1) * 1.15; // 15% buffer
  const minValue = 0;
  const valueRange = maxValue - minValue;

  // Compute point coordinates
  const points = data.map((d, index) => {
    const x = paddingLeft + (index / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - ((d[dataKey] - minValue) / valueRange) * chartHeight;
    return { x, y, ...d };
  });

  // Construct SVG path for line and area
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = points.length > 0 
    ? `${linePath} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`
    : '';

  // Grid lines
  const gridLinesCount = 4;
  const gridLines = Array.from({ length: gridLinesCount }, (_, i) => {
    const yVal = minValue + (valueRange / (gridLinesCount - 1)) * i;
    const yCoord = paddingTop + chartHeight - (i / (gridLinesCount - 1)) * chartHeight;
    return { yCoord, value: Math.round(yVal) };
  });

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const point = points[index];
    setHoveredIdx(index);
    setTooltip({
      active: true,
      x: point.x * (rect.width / width),
      y: point.y * (rect.height / height),
      label: point[xKey],
      value: `${point[dataKey].toLocaleString()} utilisateurs`,
    });
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
    setTooltip({ active: false, x: 0, y: 0, label: '', value: '' });
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <FloatingTooltip {...tooltip} />
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1DB2AA" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1DB2AA" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {gridLines.map((line, i) => (
          <g key={i}>
            <line
              x1={paddingLeft}
              y1={line.yCoord}
              x2={width - paddingRight}
              y2={line.yCoord}
              stroke="#EEDCCB"
              strokeWidth="0.75"
              strokeDasharray="4 4"
            />
            {/* Y Axis text */}
            <text
              x={paddingLeft - 8}
              y={line.yCoord + 3}
              textAnchor="end"
              fill="#8B6B56"
              fontSize="9"
              fontWeight="600"
            >
              {line.value}
            </text>
          </g>
        ))}

        {/* Area fill */}
        {areaPath && <path d={areaPath} fill="url(#areaGrad)" />}

        {/* Smooth line */}
        {linePath && (
          <path
            d={linePath}
            fill="none"
            stroke="#1DB2AA"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* X Axis text */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={height - 10}
            textAnchor="middle"
            fill="#8B6B56"
            fontSize="9"
            fontWeight="600"
          >
            {p[xKey]}
          </text>
        ))}

        {/* Vertical hover line indicator */}
        {hoveredIdx !== null && (
          <line
            x1={points[hoveredIdx].x}
            y1={paddingTop}
            x2={points[hoveredIdx].x}
            y2={height - paddingBottom}
            stroke="#1DB2AA"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
        )}

        {/* Hover interactive areas */}
        {points.map((p, i) => (
          <g key={i}>
            {/* Display anchor dot on hover */}
            {hoveredIdx === i && (
              <circle
                cx={p.x}
                cy={p.y}
                r="5"
                fill="#1DB2AA"
                stroke="#ffffff"
                strokeWidth="1.5"
                style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.15))' }}
              />
            )}
            {/* Large invisible interactive vertical bar for easy hover */}
            <rect
              x={p.x - chartWidth / (data.length - 1) / 2}
              y={paddingTop}
              width={chartWidth / (data.length - 1)}
              height={chartHeight}
              fill="transparent"
              style={{ cursor: 'pointer' }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={handleMouseLeave}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

// ==========================================
// 2. SVGBarChart Component
// ==========================================
export const SVGBarChart = ({ data = [], dataKey, xKey }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [tooltip, setTooltip] = useState({ active: false, x: 0, y: 0, label: '', value: '' });

  if (!data || data.length === 0) return <div>Aucune donnée disponible</div>;

  const width = 500;
  const height = 200;
  const paddingLeft = 40;
  const paddingRight = 15;
  const paddingTop = 15;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const values = data.map((d) => d[dataKey]);
  const maxValue = Math.max(...values, 100); // usually percentage
  const minValue = 0;
  const valueRange = maxValue - minValue;

  const barCount = data.length;
  const gapRatio = 0.4; // gap is 40% of the slot
  const slotWidth = chartWidth / barCount;
  const barWidth = slotWidth * (1 - gapRatio);

  // Compute bars
  const bars = data.map((d, index) => {
    const x = paddingLeft + index * slotWidth + (slotWidth * gapRatio) / 2;
    const barVal = d[dataKey];
    const barHeight = (barVal / valueRange) * chartHeight;
    const y = paddingTop + chartHeight - barHeight;
    return { x, y, width: barWidth, height: barHeight, value: barVal, label: d[xKey] };
  });

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const bar = bars[index];
    setHoveredIdx(index);
    setTooltip({
      active: true,
      x: (bar.x + bar.width / 2) * (rect.width / width),
      y: bar.y * (rect.height / height),
      label: bar.label,
      value: `Taux de réussite: ${bar.value}%`,
    });
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
    setTooltip({ active: false, x: 0, y: 0, label: '', value: '' });
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <FloatingTooltip {...tooltip} />
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
        {/* Horizontal gridlines */}
        {[0, 25, 50, 75, 100].map((val) => {
          const yCoord = paddingTop + chartHeight - (val / 100) * chartHeight;
          return (
            <g key={val}>
              <line
                x1={paddingLeft}
                y1={yCoord}
                x2={width - paddingRight}
                y2={yCoord}
                stroke="#EEDCCB"
                strokeWidth="0.75"
                strokeDasharray="4 4"
              />
              <text
                x={paddingLeft - 8}
                y={yCoord + 3}
                textAnchor="end"
                fill="#8B6B56"
                fontSize="9"
                fontWeight="600"
              >
                {val}%
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {bars.map((bar, i) => (
          <g key={i}>
            <rect
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              fill={hoveredIdx === i ? '#0A4F4C' : '#1DB2AA'}
              rx="4"
              ry="4"
              style={{
                transition: 'fill 0.15s ease, opacity 0.15s ease',
                cursor: 'pointer',
              }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={handleMouseLeave}
            />
            {/* Label below */}
            <text
              x={bar.x + bar.width / 2}
              y={height - 10}
              textAnchor="middle"
              fill="#8B6B56"
              fontSize="9"
              fontWeight="600"
            >
              {bar.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

// ==========================================
// 3. SVGPieChart Component
// ==========================================
export const SVGPieChart = ({ data = [] }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [tooltip, setTooltip] = useState({ active: false, x: 0, y: 0, label: '', value: '' });

  if (!data || data.length === 0) return <div>Aucune donnée disponible</div>;

  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);

  // SVG parameters
  const size = 200;
  const radius = 50;
  const strokeWidth = 16;
  const circumference = 2 * Math.PI * radius; // 314.159

  const slices = data.map((d, index) => {
    const percent = d.value / totalValue;
    const strokeLength = percent * circumference;
    const previousSum = data.slice(0, index).reduce((acc, curr) => acc + curr.value, 0);
    const strokeOffset = (previousSum / totalValue) * circumference;

    return {
      ...d,
      strokeLength,
      strokeOffset: -strokeOffset, // Negative offset to rotate clockwise
      color: BRAND_COLORS[index % BRAND_COLORS.length],
    };
  });

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const slice = slices[index];
    setHoveredIdx(index);
    setTooltip({
      active: true,
      x: rect.width / 2,
      y: rect.height / 2 - 10,
      label: slice.country,
      value: `Distribution: ${slice.value}%`,
    });
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
    setTooltip({ active: false, x: 0, y: 0, label: '', value: '' });
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <FloatingTooltip {...tooltip} />

      <div style={{ position: 'relative', width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%" style={{ transform: 'rotate(-90deg)' }}>
          {slices.map((slice, i) => (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke={slice.color}
              strokeWidth={hoveredIdx === i ? strokeWidth + 3 : strokeWidth}
              strokeDasharray={`${slice.strokeLength} ${circumference}`}
              strokeDashoffset={slice.strokeOffset}
              style={{
                transition: 'stroke-width 0.2s ease, opacity 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </svg>

        {/* Center label */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <div style={{ fontSize: '0.65rem', fontWeight: '600', color: '#8B6B56', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {hoveredIdx !== null ? slices[hoveredIdx].country : 'Total'}
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#5A3A2B', marginTop: '2px' }}>
            {hoveredIdx !== null ? `${slices[hoveredIdx].value}%` : '100%'}
          </div>
        </div>
      </div>

      {/* Modern custom grid legend below */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.5rem 1rem',
          width: '100%',
          marginTop: '1.25rem',
          padding: '0 0.5rem',
        }}
      >
        {slices.map((slice, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.72rem',
              fontWeight: hoveredIdx === i ? '700' : '500',
              color: hoveredIdx === i ? '#5A3A2B' : '#8B6B56',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: slice.color, display: 'inline-block', flexShrink: 0 }}></span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {slice.country} ({slice.value}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
