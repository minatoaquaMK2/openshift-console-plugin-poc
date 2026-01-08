import * as React from 'react';
import { Tooltip } from '@patternfly/react-core';
import './physical-view.css';

export type LedStatus = 'ok' | 'warning' | 'critical' | 'off' | 'unknown';

export interface LedProps {
  status: LedStatus;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const statusColorMap: Record<LedStatus, string> = {
  ok: '#3e8635',      // Green
  warning: '#f0ab00', // Yellow/Amber
  critical: '#c9190b', // Red
  off: '#6a6e73',     // Gray
  unknown: '#6a6e73', // Gray
};

const Led: React.FC<LedProps> = ({ status, label, size = 'sm' }) => {
  const sizeMap = {
    sm: 8,
    md: 12,
    lg: 16,
  };

  const diameter = sizeMap[size];
  const color = statusColorMap[status];

  const ledElement = (
    <span
      className={`pv-led pv-led--${status}`}
      style={{
        display: 'inline-block',
        width: diameter,
        height: diameter,
        borderRadius: '50%',
        backgroundColor: color,
        boxShadow: status !== 'off' && status !== 'unknown' 
          ? `0 0 ${diameter / 2}px ${color}` 
          : 'none',
      }}
      aria-label={label || `Status: ${status}`}
    />
  );

  if (label) {
    return (
      <Tooltip content={label}>
        {ledElement}
      </Tooltip>
    );
  }

  return ledElement;
};

export default Led;
