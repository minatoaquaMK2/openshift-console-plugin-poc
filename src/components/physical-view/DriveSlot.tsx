import * as React from 'react';
import { Tooltip } from '@patternfly/react-core';
import Led, { LedStatus } from './Led';
import './physical-view.css';

export interface DriveSlotProps {
  slotIndex: number;
  status?: string;
  type?: string;
  capacityBytes?: number;
  fqdd?: string;
  isEmpty?: boolean;
}

const formatCapacity = (bytes?: number): string => {
  if (!bytes) return 'Unknown';
  const gb = bytes / 1000000000;
  if (gb >= 1000) {
    return `${(gb / 1000).toFixed(1)} TB`;
  }
  return `${gb.toFixed(0)} GB`;
};

const getStatusLed = (status?: string): LedStatus => {
  if (!status) return 'unknown';
  const s = status.toLowerCase();
  if (s === 'ok' || s === 'healthy') return 'ok';
  if (s === 'warning' || s === 'degraded') return 'warning';
  if (s === 'critical' || s === 'failed' || s === 'error') return 'critical';
  return 'unknown';
};

const DriveSlot: React.FC<DriveSlotProps> = ({
  slotIndex,
  status,
  type,
  capacityBytes,
  fqdd,
  isEmpty = false,
}) => {
  const tooltipContent = isEmpty ? (
    <div>Slot {slotIndex}: Empty</div>
  ) : (
    <div>
      <div><strong>Slot {slotIndex}</strong></div>
      <div>Type: {type || 'Unknown'}</div>
      <div>Capacity: {formatCapacity(capacityBytes)}</div>
      <div>Status: {status || 'Unknown'}</div>
      {fqdd && <div>FQDD: {fqdd}</div>}
    </div>
  );

  return (
    <Tooltip content={tooltipContent}>
      <div
        className={`pv-drive-slot ${isEmpty ? 'pv-drive-slot--empty' : ''}`}
        aria-label={`Drive slot ${slotIndex}${isEmpty ? ' (empty)' : ''}`}
      >
        <div className="pv-drive-slot__body">
          {!isEmpty && (
            <>
              <div className="pv-drive-slot__led-container">
                <Led status={getStatusLed(status)} size="sm" />
              </div>
              <div className="pv-drive-slot__label">
                {type === 'NVMe' ? 'NVMe' : type === 'SSD' ? 'SSD' : 'HDD'}
              </div>
            </>
          )}
        </div>
        <div className="pv-drive-slot__handle" />
        <div className="pv-drive-slot__index">{slotIndex}</div>
      </div>
    </Tooltip>
  );
};

export default DriveSlot;
