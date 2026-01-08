import * as React from 'react';
import { ManagedNodeKind } from '../../models';
import './physical-view.css';

export interface InfoPanelProps {
  node: ManagedNodeKind;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ node }) => {
  const inventory = node.status?.inventory;
  const systemInfo = inventory?.system_info;
  const healthCondition = node.status?.conditions?.find(c => c.type === 'Healthy');
  const healthStatus = healthCondition?.status === 'True' ? 'Healthy' : 'Critical';
  const healthClass = healthCondition?.status === 'True' ? 'ok' : 'critical';

  return (
    <div className="pv-info-panel">
      <div className="pv-info-panel__title">Overview</div>
      
      <div className="pv-info-panel__item">
        <span className="pv-info-panel__label">Node health</span>
        <span className={`pv-info-panel__value pv-info-panel__value--${healthClass}`}>
          {healthStatus}
        </span>
      </div>

      <div className="pv-info-panel__item">
        <span className="pv-info-panel__label">System LED</span>
        <span className="pv-info-panel__value pv-info-panel__value--ok">Healthy</span>
      </div>

      <div className="pv-info-panel__item">
        <span className="pv-info-panel__label">Power state</span>
        <span className="pv-info-panel__value">Powered on</span>
      </div>

      <div className="pv-info-panel__item">
        <span className="pv-info-panel__label">Service tag</span>
        <span className="pv-info-panel__value">{systemInfo?.serial_number || '-'}</span>
      </div>

      <div className="pv-info-panel__item">
        <span className="pv-info-panel__label">Manufacturer</span>
        <span className="pv-info-panel__value">{systemInfo?.manufacturer || '-'}</span>
      </div>

      <div className="pv-info-panel__item">
        <span className="pv-info-panel__label">Model</span>
        <span className="pv-info-panel__value">{systemInfo?.model || '-'}</span>
      </div>

      <div className="pv-info-panel__item">
        <span className="pv-info-panel__label">BIOS version</span>
        <span className="pv-info-panel__value">{systemInfo?.bios_version || '-'}</span>
      </div>

      <div className="pv-info-panel__title" style={{ marginTop: '16px' }}>Hardware</div>

      <div className="pv-info-panel__item">
        <span className="pv-info-panel__label">CPU</span>
        <span className="pv-info-panel__value">
          {inventory?.cpu?.model || '-'}
        </span>
      </div>

      <div className="pv-info-panel__item">
        <span className="pv-info-panel__label">CPU Cores</span>
        <span className="pv-info-panel__value">
          {inventory?.cpu?.cores || '-'}
        </span>
      </div>

      <div className="pv-info-panel__item">
        <span className="pv-info-panel__label">Memory</span>
        <span className="pv-info-panel__value">
          {inventory?.memory?.total_gb ? `${inventory.memory.total_gb} GB` : '-'}
        </span>
      </div>

      <div className="pv-info-panel__item">
        <span className="pv-info-panel__label">Memory Type</span>
        <span className="pv-info-panel__value">
          {inventory?.memory?.type || '-'}
        </span>
      </div>
    </div>
  );
};

export default InfoPanel;
