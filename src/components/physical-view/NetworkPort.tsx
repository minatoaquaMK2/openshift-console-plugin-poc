import * as React from 'react';
import { Tooltip } from '@patternfly/react-core';
import Led, { LedStatus } from './Led';
import './physical-view.css';

export interface NetworkPortProps {
  fqdd?: string;
  description?: string;
  macAddress?: string;
  speedGbps?: number;
  status?: string;
  type?: string;
  index?: number;
}

const getStatusLed = (status?: string): LedStatus => {
  if (!status) return 'unknown';
  const s = status.toLowerCase();
  if (s === 'ok' || s === 'healthy' || s === 'up') return 'ok';
  if (s === 'warning' || s === 'degraded') return 'warning';
  if (s === 'critical' || s === 'failed' || s === 'error' || s === 'down') return 'critical';
  return 'off';
};

const NetworkPort: React.FC<NetworkPortProps> = ({
  fqdd,
  description,
  macAddress,
  speedGbps,
  status,
  type,
  index,
}) => {
  const tooltipContent = (
    <div>
      <div><strong>{fqdd || `Port ${index}`}</strong></div>
      {description && <div>{description}</div>}
      <div>Speed: {speedGbps || 0} Gbps</div>
      <div>Type: {type || 'Ethernet'}</div>
      {macAddress && <div>MAC: {macAddress}</div>}
      <div>Status: {status || 'Unknown'}</div>
    </div>
  );

  return (
    <Tooltip content={tooltipContent}>
      <div className="pv-network-port" aria-label={fqdd || `Network port ${index}`}>
        <div className="pv-network-port__connector">
          <div className="pv-network-port__pins">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="pv-network-port__pin" />
            ))}
          </div>
        </div>
        <div className="pv-network-port__leds">
          <Led status={getStatusLed(status)} size="sm" label="Link" />
          <Led status={status === 'OK' ? 'ok' : 'off'} size="sm" label="Activity" />
        </div>
      </div>
    </Tooltip>
  );
};

export default NetworkPort;
