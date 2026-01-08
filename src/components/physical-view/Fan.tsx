import * as React from 'react';
import { Tooltip } from '@patternfly/react-core';
import './physical-view.css';

export interface FanProps {
  fqdd?: string;
  rpm: number;
  status?: string;
  index?: number;
}

const getStatus = (status?: string): string => {
  if (!status) return 'unknown';
  const s = status.toLowerCase();
  if (s === 'ok' || s === 'healthy') return 'ok';
  if (s === 'warning' || s === 'degraded') return 'warning';
  if (s === 'critical' || s === 'failed' || s === 'error') return 'critical';
  return 'unknown';
};

const Fan: React.FC<FanProps> = ({ fqdd, rpm, status, index }) => {
  const statusClass = getStatus(status);
  
  const tooltipContent = (
    <div>
      <div><strong>{fqdd || `Fan ${index}`}</strong></div>
      <div>RPM: {rpm}</div>
      <div>Status: {status || 'Unknown'}</div>
    </div>
  );

  return (
    <Tooltip content={tooltipContent}>
      <div 
        className={`pv-back-fan pv-back-fan--${statusClass}`}
        role="img"
        aria-label={`${fqdd || `Fan ${index}`}, RPM: ${rpm}, Status: ${status || 'Unknown'}`}
      >
        <svg viewBox="0 0 40 40" className="pv-back-fan__svg">
          <circle cx="20" cy="20" r="18" className="pv-back-fan__housing" />
          <circle cx="20" cy="20" r="4" className="pv-back-fan__center" />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <path
              key={angle}
              d="M20 8 L23 16 L20 14 L17 16 Z"
              className="pv-back-fan__blade"
              transform={`rotate(${angle}, 20, 20)`}
            />
          ))}
        </svg>
      </div>
    </Tooltip>
  );
};

export default Fan;
