import * as React from 'react';
import { Tooltip } from '@patternfly/react-core';
import { ManagedNodeKind } from '../../models';
import Fan from './Fan';
import PSU from './PSU';
import './physical-view.css';

export interface BackViewProps {
  node: ManagedNodeKind;
}

type ComponentStatus = 'ok' | 'warning' | 'critical' | 'unknown';

const getStatus = (status?: string): ComponentStatus => {
  if (!status) return 'unknown';
  const s = status.toLowerCase();
  if (s === 'ok' || s === 'healthy') return 'ok';
  if (s === 'warning' || s === 'degraded') return 'warning';
  if (s === 'critical' || s === 'failed' || s === 'error') return 'critical';
  return 'unknown';
};

const BackView: React.FC<BackViewProps> = ({ node }) => {
  const fans = node.status?.inventory?.cooling?.fans || [];
  const psus = node.status?.inventory?.power?.psus || [];
  const adapters = node.status?.inventory?.network?.adapters || [];
  
  // Check if any component has issues
  const hasIssue = psus.some(p => getStatus(p.status) === 'critical') ||
                   fans.some(f => getStatus(f.status) !== 'ok');

  // Ensure we have at least 6 fans for display
  const displayFans = fans.length >= 6 ? fans : [
    ...fans,
    ...Array(6 - fans.length).fill(null).map((_, i) => ({
      fqdd: `Fan.Embedded.${fans.length + i + 1}`,
      rpm: 0,
      status: 'unknown'
    }))
  ];

  // Ensure we have 2 PSUs
  const displayPsus = psus.length >= 2 ? psus : [
    ...psus,
    ...Array(2 - psus.length).fill(null).map((_, i) => ({
      fqdd: `PSU.Slot.${psus.length + i + 1}`,
      input_watts: '0',
      status: 'unknown'
    }))
  ];

  return (
    <div className="pv-back-chassis" role="img" aria-label="Server back panel view">
      {/* Server Back Panel */}
      <div className="pv-back-panel" role="group" aria-label="Hardware components">
        {/* Left Section - Fans */}
        <div className="pv-back-panel__fans">
          <div className="pv-back-panel__fans-grid">
            {displayFans.slice(0, 6).map((fan, index) => (
              <Fan
                key={fan.fqdd || index}
                index={index + 1}
                fqdd={fan.fqdd}
                rpm={fan.rpm}
                status={fan.status}
              />
            ))}
          </div>
        </div>

        {/* Center Section - Ports and Slots */}
        <div className="pv-back-panel__center">
          {/* Top Row - Network Ports */}
          <div className="pv-back-panel__ports-section">
            <div className="pv-back-panel__fixed-ports">
              {/* iDRAC Port */}
              <Tooltip content="iDRAC Management Port">
                <div className="pv-back-port pv-back-port--idrac" role="img" aria-label="iDRAC Management Port">
                  <div className="pv-back-port__connector" />
                  <span className="pv-back-port__label">iDRAC</span>
                </div>
              </Tooltip>
              
              {/* Serial Port */}
              <Tooltip content="Serial Port">
                <div className="pv-back-port pv-back-port--serial" role="img" aria-label="Serial Port">
                  <div className="pv-back-port__connector pv-back-port__connector--serial" />
                </div>
              </Tooltip>

              {/* VGA Port */}
              <Tooltip content="VGA Port">
                <div className="pv-back-port pv-back-port--vga" role="img" aria-label="VGA Port">
                  <div className="pv-back-port__connector pv-back-port__connector--vga" />
                </div>
              </Tooltip>

              {/* USB Ports */}
              <Tooltip content="USB 3.0 Ports">
                <div className="pv-back-port pv-back-port--usb" role="img" aria-label="USB 3.0 Ports">
                  <div className="pv-back-port__connector pv-back-port__connector--usb" />
                  <div className="pv-back-port__connector pv-back-port__connector--usb" />
                </div>
              </Tooltip>
            </div>

            {/* Network Adapters */}
            <div className="pv-back-panel__nic-section">
              {adapters.map((adapter, index) => (
                <Tooltip
                  key={adapter.fqdd || index}
                  content={
                    <div>
                      <div><strong>{adapter.fqdd}</strong></div>
                      <div>{adapter.description}</div>
                      <div>Speed: {adapter.speed_gbps} Gbps</div>
                      <div>MAC: {adapter.mac_address}</div>
                      <div>Status: {adapter.status}</div>
                    </div>
                  }
                >
                  <div 
                    className={`pv-back-nic pv-back-nic--${getStatus(adapter.status)}`}
                    role="img"
                    aria-label={`${adapter.fqdd}, ${adapter.description}, Speed: ${adapter.speed_gbps} Gbps, Status: ${adapter.status}`}
                  >
                    <div className="pv-back-nic__port" />
                    <div className="pv-back-nic__leds">
                      <span className="pv-back-nic__led pv-back-nic__led--link" />
                      <span className="pv-back-nic__led pv-back-nic__led--activity" />
                    </div>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Bottom Row - PCIe Slots */}
          <div className="pv-back-panel__pcie-section">
            <div className="pv-back-pcie-slot pv-back-pcie-slot--full">
              <div className="pv-back-pcie-slot__bracket" />
              <div className="pv-back-pcie-slot__vents">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="pv-back-pcie-slot__vent" />
                ))}
              </div>
            </div>
            <div className="pv-back-pcie-slot pv-back-pcie-slot--full">
              <div className="pv-back-pcie-slot__bracket" />
              <div className="pv-back-pcie-slot__vents">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="pv-back-pcie-slot__vent" />
                ))}
              </div>
            </div>
            
            {/* Status LED in center */}
            {hasIssue && (
              <div className="pv-back-panel__status-led">
                <Tooltip content="System Alert - Check component status">
                  <div className="pv-back-status-indicator pv-back-status-indicator--critical">
                    <span>!</span>
                  </div>
                </Tooltip>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - PSUs */}
        <div className="pv-back-panel__psus">
          {displayPsus.map((psu, index) => (
            <PSU
              key={psu.fqdd || index}
              index={index + 1}
              fqdd={psu.fqdd}
              inputWatts={psu.input_watts}
              status={psu.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackView;
