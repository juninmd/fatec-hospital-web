import * as React from 'react';
import PrivateRoutes from './private-routes';
import { observer } from 'mobx-react';
import {
  Route,
  Switch,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { isLoggedIn } from '../util/auth.util';
import MainMenu from '../components/main-menu';
import Login from '../containers/login';
import { Divider } from 'semantic-ui-react';

// @ts-ignore
@withRouter
@observer
export default class Routes extends React.Component {

  render() {

    const publicUrl = process.env.PUBLIC_URL;

    return (
      <>
        <Switch>
          <Route path={`${publicUrl}/login`} component={Login} />
          <Route path={`${publicUrl}/logout`} component={Login} />
          {isLoggedIn() ?
            <>
              <MainMenu />
              <Divider hidden={true} />
              <PrivateRoutes />
            </> : <Redirect to={{ pathname: `${publicUrl}/login` }} />
          }
        </Switch>
      </>
    );
  }
}