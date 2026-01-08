import * as React from 'react';
import { useParams } from 'react-router-dom';
import {
  Tabs,
  Tab,
  TabTitleText,
  Breadcrumb,
  BreadcrumbItem,
  PageSection,
  Title,
  Spinner,
  Bullseye,
  EmptyState,
  EmptyStateBody,
} from '@patternfly/react-core';
import { useK8sWatchResource } from '@openshift-console/dynamic-plugin-sdk';
import { Link } from 'react-router-dom';
import NodeList from './NodeList';
import { FrontView, BackView, InfoPanel } from './physical-view';
import { ManagedNodeKind, ManagedNodeModel } from '../models';
import './physical-view/physical-view.css';
import './NodeList.css';

const NodeDetailView: React.FC<{ name: string }> = ({ name }) => {
  const [activeTab, setActiveTab] = React.useState<string | number>('front');

  const [node, loaded, loadError] = useK8sWatchResource<ManagedNodeKind>({
    groupVersionKind: {
      group: ManagedNodeModel.apiGroup,
      version: ManagedNodeModel.apiVersion,
      kind: ManagedNodeModel.kind,
    },
    name,
    namespace: 'default',
  });

  if (loadError) {
    return (
      <EmptyState>
        <Title headingLevel="h2" size="lg">Error loading node</Title>
        <EmptyStateBody>{loadError.message || 'Failed to load ManagedNode'}</EmptyStateBody>
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

  if (!node) {
    return (
      <EmptyState>
        <Title headingLevel="h2" size="lg">Node not found</Title>
        <EmptyStateBody>ManagedNode "{name}" was not found.</EmptyStateBody>
      </EmptyState>
    );
  }

  return (
    <PageSection>
      <Breadcrumb className="pf-v5-u-mb-md">
        <BreadcrumbItem>
          <Link to="/physical-view">Physical View</Link>
        </BreadcrumbItem>
        <BreadcrumbItem isActive>{name}</BreadcrumbItem>
      </Breadcrumb>

      <Title headingLevel="h1" className="pf-v5-u-mb-lg">Physical View</Title>

      <div className="pv-node-detail">
        <div className="pv-node-detail__view">
          <Tabs
            activeKey={activeTab}
            onSelect={(_, tabKey) => setActiveTab(tabKey)}
            className="pv-tabs"
          >
            <Tab eventKey="front" title={<TabTitleText>Front view</TabTitleText>}>
              <FrontView node={node} />
            </Tab>
            <Tab eventKey="back" title={<TabTitleText>Back view</TabTitleText>}>
              <BackView node={node} />
            </Tab>
          </Tabs>
        </div>
        <div className="pv-node-detail__sidebar">
          <InfoPanel node={node} />
        </div>
      </div>
    </PageSection>
  );
};

const PhysicalViewPage: React.FC = () => {
  const params = useParams<{ name?: string }>();
  
  // Extract node name from URL path as fallback
  const pathname = window.location.pathname;
  const match = pathname.match(/\/physical-view\/nodes\/([^/]+)/);
  const nodeName = params.name || (match ? match[1] : null);
  
  console.log('PhysicalViewPage params:', params, 'pathname:', pathname, 'nodeName:', nodeName);

  if (nodeName) {
    return <NodeDetailView name={nodeName} />;
  }

  return (
    <>
      <PageSection className="pv-page-header">
        <Title headingLevel="h1" size="2xl">Physical View</Title>
      </PageSection>
      <NodeList />
    </>
  );
};

export default PhysicalViewPage;
