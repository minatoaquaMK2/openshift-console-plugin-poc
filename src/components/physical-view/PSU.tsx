import * as React from 'react';
import { Tooltip } from '@patternfly/react-core';
import './physical-view.css';

export interface PSUProps {
  fqdd?: string;
  inputWatts?: string;
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

const PSU: React.FC<PSUProps> = ({ fqdd, inputWatts, status, index }) => {
  const statusClass = getStatus(status);
  
  const tooltipContent = (
    <div>
      <div><strong>{fqdd || `PSU ${index}`}</strong></div>
      <div>Input: {inputWatts || '0'}W</div>
      <div>Status: {status || 'Unknown'}</div>
    </div>
  );

  return (
    <Tooltip content={tooltipContent}>
      <div 
        className={`pv-back-psu pv-back-psu--${statusClass}`}
        role="img"
        aria-label={`${fqdd || `PSU ${index}`}, Input: ${inputWatts || '0'}W, Status: ${status || 'Unknown'}`}
      >
        <div className="pv-back-psu__vents">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="pv-back-psu__vent" />
          ))}
        </div>
        <div className="pv-back-psu__handle" />
        <div className="pv-back-psu__led">
          <span className={`pv-back-psu__led-indicator pv-back-psu__led-indicator--${statusClass}`} />
        </div>
      </div>
    </Tooltip>
  );
};

export default PSU;
