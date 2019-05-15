import * as React from 'react';
import Home from '../containers/home';
import NotFound from '../containers/not-found';
import { Route, Switch } from 'react-router-dom';
import { routes } from './routes';

export default class PrivateRoutes extends React.Component {

  render() {
    const publicUrl = process.env.PUBLIC_URL;
    return (
      <Switch>
        <Route exact={true} path={`${publicUrl}/`} component={Home} />
        <Route path={`${publicUrl}/home`} component={Home} />
        {routes.map((route, i) => (
          <Route key={i} {...route} />)
        )}
        <Route render={props => <NotFound {...props} />} />
      </Switch>
    );
  }
}