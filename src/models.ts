import { K8sModel, K8sResourceCommon } from '@openshift-console/dynamic-plugin-sdk';

export const ManagedNodeModel: K8sModel = {
  label: 'ManagedNode',
  labelPlural: 'ManagedNodes',
  apiVersion: 'v1alpha1',
  apiGroup: 'dpc.dell.com',
  plural: 'managednodes',
  abbr: 'MN',
  namespaced: true,
  kind: 'ManagedNode',
  id: 'managednode',
  crd: true,
};

export type ManagedNodeCondition = {
  lastTransitionTime: string;
  message: string;
  observedGeneration?: number;
  reason: string;
  status: 'True' | 'False' | 'Unknown';
  type: string;
};

export type ManagedNodeFan = {
  fqdd?: string;
  rpm: number;
  status?: string;
};

export type ManagedNodePSU = {
  fqdd?: string;
  input_watts?: string;
  status?: string;
};

export type ManagedNodeDrive = {
  capacity_bytes: number;
  fqdd?: string;
  slot_index: number;
  status?: string;
  type?: string;
};

export type ManagedNodeInventory = {
  system_info?: {
    bios_version?: string;
    manufacturer?: string;
    model?: string;
    serial_number?: string;
  };
  cpu?: {
    cores?: number;
    model?: string;
    speed_mhz?: number;
    threads?: number;
  };
  memory?: {
    speed_mhz?: number;
    total_gb?: number;
    type?: string;
  };
  cooling?: {
    fans?: ManagedNodeFan[];
  };
  power?: {
    psus?: ManagedNodePSU[];
  };
  storage?: {
    controllers?: string[];
    drives?: ManagedNodeDrive[];
  };
};

export type ManagedNodeKind = K8sResourceCommon & {
  spec: {
    membership?: 'Present' | 'Absent';
  };
  status?: {
    inventory?: ManagedNodeInventory;
    conditions?: ManagedNodeCondition[];
    lastCollectedAt?: string;
    membership?: {
      conditions?: ManagedNodeCondition[];
      observedGeneration?: number;
      phase?: 'Pending' | 'Running' | 'Succeeded' | 'Failed';
    };
    observedPlanGeneration?: number;
    observedRunId?: number;
    source?: string;
  };
};
