import { useK8sWatchResource, WatchK8sResource } from '@openshift-console/dynamic-plugin-sdk';
import { ManagedNodeKind, ManagedNodeModel } from '../models';

export const useManagedNodes = (namespace?: string) => {
  const watchResource: WatchK8sResource = {
    groupVersionKind: {
      group: ManagedNodeModel.apiGroup,
      version: ManagedNodeModel.apiVersion,
      kind: ManagedNodeModel.kind,
    },
    isList: true,
    namespace,
  };

  const [managedNodes, loaded, loadError] = useK8sWatchResource<ManagedNodeKind[]>(watchResource);

  return [managedNodes, loaded, loadError] as [ManagedNodeKind[], boolean, any];
};

export const useManagedNode = (name: string, namespace: string) => {
  const watchResource: WatchK8sResource = {
    groupVersionKind: {
      group: ManagedNodeModel.apiGroup,
      version: ManagedNodeModel.apiVersion,
      kind: ManagedNodeModel.kind,
    },
    name,
    namespace,
    isList: false,
  };

  const [managedNode, loaded, loadError] = useK8sWatchResource<ManagedNodeKind>(watchResource);

  return [managedNode, loaded, loadError] as [ManagedNodeKind, boolean, any];
};
