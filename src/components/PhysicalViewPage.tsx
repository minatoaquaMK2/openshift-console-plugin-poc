import * as React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import NodeList from './NodeList';

const PhysicalViewPage: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <div className="co-m-pane__body">
          <h1 className="co-m-pane__heading">Physical View</h1>
          <NodeList />
        </div>
      </Route>
      <Route path={`${path}/nodes/:name`}>
        <div className="co-m-pane__body">
          <h1 className="co-m-pane__heading">Node Physical View</h1>
          {/* Node detail views will go here in Phase 4 */}
        </div>
      </Route>
    </Switch>
  );
};

export default PhysicalViewPage;
