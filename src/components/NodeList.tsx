import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableVariant,
} from '@patternfly/react-table';
import {
  StatusIconAndText,
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
  EmptyStateIcon,
  EmptyStateBody,
  EmptyStateHeader,
  EmptyStateFooter,
} from '@patternfly/react-core';
import { CubesIcon } from '@patternfly/react-icons';
import { ManagedNodeKind, ManagedNodeModel } from '../models';

const NodeList: React.FC = () => {
  const { t } = useTranslation('plugin__console-plugin-template');
  const history = useHistory();

  const [managedNodes, loaded, loadError] = useK8sWatchResource<ManagedNodeKind[]>({
    groupVersionKind: {
      group: ManagedNodeModel.apiGroup,
      version: ManagedNodeModel.apiVersion,
      kind: ManagedNodeModel.kind,
    },
    isList: true,
  });

  const columns = [
    { title: t('Health'), key: 'health' },
    { title: t('Node name'), key: 'name' },
    { title: t('Manufacturer'), key: 'manufacturer' },
    { title: t('Model'), key: 'model' },
    { title: t('Service tag'), key: 'serviceTag' },
  ];

  const onNodeClick = (name: string) => {
    history.push(`/physical-view/nodes/${name}`);
  };

  if (loadError) {
    return (
      <EmptyState variant={EmptyStateVariant.sm}>
        <EmptyStateHeader titleText={t('Error loading nodes')} icon={<EmptyStateIcon icon={CubesIcon} />} />
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
        <EmptyStateHeader titleText={t('No Managed Nodes found')} icon={<EmptyStateIcon icon={CubesIcon} />} />
        <EmptyStateBody>
          {t('There are no ManagedNode resources in the cluster.')}
        </EmptyStateBody>
      </EmptyState>
    );
  }

  return (
    <PageSection>
      <Card>
        <CardBody>
          <Table aria-label={t('Managed Nodes')} variant={TableVariant.compact}>
            <Thead>
              <Tr>
                {columns.map((col) => (
                  <Th key={col.key}>{col.title}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {managedNodes.map((node) => {
                const inventory = node.status?.inventory;
                const healthCondition = node.status?.conditions?.find(c => c.type === 'Healthy');
                const healthStatus = healthCondition?.status === 'True' ? 'Ok' : 'Error';

                return (
                  <Tr key={node.metadata.uid} onRowClick={() => onNodeClick(node.metadata.name)} isClickable>
                    <Td dataLabel={t('Health')}>
                      <StatusIconAndText title={healthStatus} icon={null} />
                    </Td>
                    <Td dataLabel={t('Node name')}>
                      <a href="#" onClick={(e) => { e.preventDefault(); onNodeClick(node.metadata.name); }}>
                        {node.metadata.name}
                      </a>
                    </Td>
                    <Td dataLabel={t('Manufacturer')}>
                      {inventory?.system_info?.manufacturer || '-'}
                    </Td>
                    <Td dataLabel={t('Model')}>
                      {inventory?.system_info?.model || '-'}
                    </Td>
                    <Td dataLabel={t('Service tag')}>
                      {inventory?.system_info?.serial_number || '-'}
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
