import * as React from 'react';
import DriveSlot from './DriveSlot';
import Led from './Led';
import { ManagedNodeKind } from '../../models';
import './physical-view.css';

export interface FrontViewProps {
  node: ManagedNodeKind;
}

const FrontView: React.FC<FrontViewProps> = ({ node }) => {
  const drives = node.status?.inventory?.storage?.drives || [];
  const healthCondition = node.status?.conditions?.find(c => c.type === 'Healthy');
  const isHealthy = healthCondition?.status === 'True';

  // Create 16 slots (typical 2U server), fill with drives where available
  const totalSlots = 16;
  const slots = Array.from({ length: totalSlots }, (_, index) => {
    const drive = drives.find(d => d.slot_index === index);
    return { index, drive };
  });

  return (
    <div className="pv-chassis pv-chassis--front" role="img" aria-label="Server front panel view">
      <div className="pv-front-view">
        <div className="pv-front-view__main">
          {/* Left Ear */}
          <div className="pv-front-view__ear" aria-hidden="true">
            <div className="pv-front-view__service-tag">TAG</div>
            <div className="pv-front-view__ear-hole" />
            <div className="pv-front-view__ear-hole" />
            <div className="pv-front-view__ear-hole" />
          </div>

          {/* Drive Bays */}
          <div className="pv-front-view__drives" role="group" aria-label="Drive bays">
            {slots.map(({ index, drive }) => (
              <DriveSlot
                key={index}
                slotIndex={index}
                isEmpty={!drive}
                status={drive?.status}
                type={drive?.type}
                capacityBytes={drive?.capacity_bytes}
                fqdd={drive?.fqdd}
              />
            ))}
          </div>

          {/* Info Panel (right side) */}
          <div className="pv-front-view__info-panel" role="group" aria-label="Status indicators">
            <div className="pv-front-view__power-button">
              <Led status={isHealthy ? 'ok' : 'critical'} size="md" label="System Health" />
            </div>
            <Led status="ok" size="sm" label="Power" />
            <Led status="ok" size="sm" label="HDD Activity" />
            <Led status={isHealthy ? 'off' : 'warning'} size="sm" label="ID" />
          </div>

          {/* Right Ear */}
          <div className="pv-front-view__ear" aria-hidden="true">
            <div className="pv-front-view__ear-hole" />
            <div className="pv-front-view__ear-hole" />
            <div className="pv-front-view__ear-hole" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontView;
