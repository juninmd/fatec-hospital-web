import * as React from 'react';
import MenuStore from '../../components/main-menu/store';
import { Container, Card, Grid, Header } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import NewRouterStore from '../../mobx/router.store';
import HomeStore from './store';

interface Props {
  menu: MenuStore;
  router: NewRouterStore;
  home: HomeStore;
}

@inject('mainMenu', 'router', 'home')
@observer
export default class Home extends React.Component<Props> {
  redirect = (url: string) => {
    const { setMenuActive } = this.props.menu;
    setMenuActive(url);

    const { history } = this.props.router;
    history.push(`${process.env.PUBLIC_URL}/${url}`);
  };

  async componentDidMount() {
    const { buildRecords } = this.props.home;
    await buildRecords();
  }

  render() {

    const { records } = this.props.home;

    return (
      <Container>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header color='blue' as='h2'>
                <Header.Content>
                  Últimos Poemas
                 <Header.Subheader>Acompanhe os 15 melhores</Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Card.Group itemsPerRow={2}>
          {records.map((e) => {
            return (
              <Card>
                <Card.Content>
                  <Card.Meta>{e.titulo}</Card.Meta>
                  <Card.Description>{e.corpo}</Card.Description>
                </Card.Content>
              </Card>)
          })}
        </Card.Group>
      </Container>
    );
  }
}
