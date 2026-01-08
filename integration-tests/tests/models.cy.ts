import { ManagedNodeModel } from '../../src/models';

describe('ManagedNode Model', () => {
  it('should have the correct API group and kind', () => {
    expect(ManagedNodeModel.apiGroup).to.equal('dpc.dell.com');
    expect(ManagedNodeModel.kind).to.equal('ManagedNode');
  });
});
