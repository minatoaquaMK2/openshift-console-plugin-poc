import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import {
  useK8sWatchResource,
} from '@openshift-console/dynamic-plugin-sdk';
import {
  PageSection,
  Title,
  Card,
  CardBody,
  Bullseye,
  Spinner,
  EmptyState,
  EmptyStateVariant,
  EmptyStateBody,
  Grid,
  GridItem,
  Flex,
  FlexItem,
  Progress,
  ProgressSize,
  Label,
  Icon,
} from '@patternfly/react-core';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from '@patternfly/react-icons';
import { ManagedNodeKind, ManagedNodeModel } from '../models';
import './NodeList.css';

type HealthStatus = 'healthy' | 'warning' | 'critical';

const getHealthStatus = (node: ManagedNodeKind): HealthStatus => {
  const healthCondition = node.status?.conditions?.find(c => c.type === 'Healthy');
  if (!healthCondition) return 'critical';
  if (healthCondition.status === 'True') return 'healthy';
  if (healthCondition.reason === 'ComponentDegraded') return 'warning';
  return 'critical';
};

const HealthIcon: React.FC<{ status: HealthStatus }> = ({ status }) => {
  switch (status) {
    case 'healthy':
      return <Icon status="success"><CheckCircleIcon /></Icon>;
    case 'warning':
      return <Icon status="warning"><ExclamationTriangleIcon /></Icon>;
    case 'critical':
    default:
      return <Icon status="danger"><ExclamationCircleIcon /></Icon>;
  }
};

const ClusterSummary: React.FC<{ nodes: ManagedNodeKind[] }> = ({ nodes }) => {
  const { t } = useTranslation('plugin__console-plugin-template');
  
  const healthyCount = nodes.filter(n => getHealthStatus(n) === 'healthy').length;
  const warningCount = nodes.filter(n => getHealthStatus(n) === 'warning').length;
  const criticalCount = nodes.filter(n => getHealthStatus(n) === 'critical').length;
  
  const clusterHealth: HealthStatus = criticalCount > 0 ? 'critical' : warningCount > 0 ? 'warning' : 'healthy';
  const lastUpdated = new Date().toLocaleString();

  return (
    <Card className="pv-cluster-summary">
      <CardBody>
        <Grid hasGutter>
          <GridItem span={3}>
            <div className="pv-summary-item">
              <div className="pv-summary-label">{t('Cluster health')}</div>
              <div className="pv-summary-value">
                <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsSm' }}>
                  <FlexItem>
                    <HealthIcon status={clusterHealth} />
                  </FlexItem>
                  <FlexItem>
                    <span className={`pv-health-text pv-health-text--${clusterHealth}`}>
                      {clusterHealth === 'healthy' ? t('Healthy') : clusterHealth === 'warning' ? t('Warning') : t('Critical')}
                    </span>
                  </FlexItem>
                </Flex>
              </div>
            </div>
          </GridItem>
          <GridItem span={3}>
            <div className="pv-summary-item">
              <div className="pv-summary-label">{t('Number of nodes')}</div>
              <div className="pv-summary-value">
                <Flex spaceItems={{ default: 'spaceItemsMd' }}>
                  <FlexItem>
                    <span className="pv-node-count">{nodes.length}</span>
                  </FlexItem>
                  <FlexItem>
                    <Flex spaceItems={{ default: 'spaceItemsSm' }}>
                      <FlexItem>
                        <Label color="red" isCompact>{criticalCount}</Label>
                      </FlexItem>
                      <FlexItem>
                        <Label color="orange" isCompact>{warningCount}</Label>
                      </FlexItem>
                      <FlexItem>
                        <Label color="green" isCompact>{healthyCount}</Label>
                      </FlexItem>
                    </Flex>
                  </FlexItem>
                </Flex>
              </div>
            </div>
          </GridItem>
          <GridItem span={3}>
            <div className="pv-summary-item">
              <div className="pv-summary-label">{t('Issues')}</div>
              <div className="pv-summary-value">
                <span className="pv-issues-count">{criticalCount + warningCount}</span>
              </div>
            </div>
          </GridItem>
          <GridItem span={3}>
            <div className="pv-summary-item">
              <div className="pv-summary-label">{t('Last time stamp')}</div>
              <div className="pv-summary-value pv-summary-value--small">
                {lastUpdated}
              </div>
            </div>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

const NodeList: React.FC = () => {
  const { t } = useTranslation('plugin__console-plugin-template');

  const [managedNodes, loaded, loadError] = useK8sWatchResource<ManagedNodeKind[]>({
    groupVersionKind: {
      group: ManagedNodeModel.apiGroup,
      version: ManagedNodeModel.apiVersion,
      kind: ManagedNodeModel.kind,
    },
    isList: true,
  });

  if (loadError) {
    return (
      <EmptyState variant={EmptyStateVariant.sm}>
        <Title headingLevel="h2" size="lg">
          {t('Error loading nodes')}
        </Title>
        <EmptyStateBody>{loadError.message || t('An error occurred while fetching ManagedNode resources.')}</EmptyStateBody>
      </EmptyState>
    );
  }

  if (!loaded) {
    return (
      <Bullseye>
        <Spinner />
      </Bullseye>
    );
  }

  if (managedNodes.length === 0) {
    return (
      <EmptyState variant={EmptyStateVariant.sm}>
        <Title headingLevel="h2" size="lg">
          {t('No Managed Nodes found')}
        </Title>
        <EmptyStateBody>
          {t('There are no ManagedNode resources in the cluster.')}
        </EmptyStateBody>
      </EmptyState>
    );
  }

  return (
    <PageSection className="pv-node-list-page">
      <ClusterSummary nodes={managedNodes} />
      
      <Card className="pv-node-table-card">
        <CardBody>
          <Table aria-label={t('Managed Nodes')} className="pv-node-table">
            <Thead>
              <Tr>
                <Th></Th>
                <Th>{t('Health')}</Th>
                <Th>{t('Node name')}</Th>
                <Th>{t('Role')}</Th>
                <Th>{t('Manufacturer')}</Th>
                <Th>{t('Node type')}</Th>
                <Th>{t('Model')}</Th>
                <Th>{t('Service tag')}</Th>
                <Th>{t('CPU usage')}</Th>
                <Th>{t('Memory usage')}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {managedNodes.map((node) => {
                const inventory = node.status?.inventory;
                const healthStatus = getHealthStatus(node);
                const healthLabel = healthStatus === 'healthy' ? t('Ok') : healthStatus === 'warning' ? t('Warning') : t('Critical');
                
                // Mock CPU/Memory usage (in real scenario, this would come from metrics)
                const cpuUsage = Math.floor(Math.random() * 40) + 5;
                const memoryUsage = Math.floor(Math.random() * 60) + 20;

                return (
                  <Tr key={node.metadata.uid}>
                    <Td>
                      <input type="checkbox" aria-label={`Select ${node.metadata.name}`} />
                    </Td>
                    <Td dataLabel={t('Health')}>
                      <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsSm' }}>
                        <FlexItem>
                          <HealthIcon status={healthStatus} />
                        </FlexItem>
                        <FlexItem>
                          <span className={`pv-health-text pv-health-text--${healthStatus}`}>
                            {healthLabel}
                          </span>
                        </FlexItem>
                      </Flex>
                    </Td>
                    <Td dataLabel={t('Node name')}>
                      <Link to={`/physical-view/nodes/${node.metadata.name}`} className="pv-node-link">
                        {node.metadata.name}
                      </Link>
                    </Td>
                    <Td dataLabel={t('Role')}>
                      {t('Control plane, Master, Worker')}
                    </Td>
                    <Td dataLabel={t('Manufacturer')}>
                      <Link to="#" className="pv-link">
                        {inventory?.system_info?.manufacturer || '-'}
                      </Link>
                    </Td>
                    <Td dataLabel={t('Node type')}>
                      {t('Compute')}
                    </Td>
                    <Td dataLabel={t('Model')}>
                      {inventory?.system_info?.model || '-'}
                    </Td>
                    <Td dataLabel={t('Service tag')}>
                      {inventory?.system_info?.serial_number || '-'}
                    </Td>
                    <Td dataLabel={t('CPU usage')}>
                      <div className="pv-usage-cell">
                        <span className="pv-usage-percent">{cpuUsage}%</span>
                        <Progress
                          value={cpuUsage}
                          size={ProgressSize.sm}
                          className="pv-usage-bar"
                          aria-label={`CPU usage ${cpuUsage}%`}
                        />
                      </div>
                    </Td>
                    <Td dataLabel={t('Memory usage')}>
                      <div className="pv-usage-cell">
                        <span className="pv-usage-percent">{memoryUsage}%</span>
                        <Progress
                          value={memoryUsage}
                          size={ProgressSize.sm}
                          className="pv-usage-bar"
                          aria-label={`Memory usage ${memoryUsage}%`}
                        />
                      </div>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </PageSection>
  );
};

export default NodeList;
