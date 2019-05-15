import * as React from 'react';
import MenuStore from '../../components/main-menu/store';
import { Container, Grid, Header, Table, Button, Icon } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import NewRouterStore from '../../mobx/router.store';
import UsuarioListStore from './store';

@inject('mainMenu', 'router', 'usuarioList')
@observer
export default class UsuarioList extends React.Component<{
  menu: MenuStore;
  router: NewRouterStore;
  usuarioList: UsuarioListStore;
}> {
  update = (id: number) => {
    const { setHistory } = this.props.router;
    setHistory(`usuario/${id}`);
  };


  async componentDidMount() {
    const { buildRecords } = this.props.usuarioList;
    await buildRecords();
  }

  render() {

    const { records, remove } = this.props.usuarioList;

    return (
      <Container>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header color='blue' as='h2'>
                <Header.Content>
                  Cadastro de usuarios
                 <Header.Subheader>Cadastre / Edite</Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>

            <Grid.Column>
              <Button onClick={() => this.update(0)} positive={true} content='Novo' />
            </Grid.Column>
          </Grid.Row>
        </Grid>


        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width='1'>Id</Table.HeaderCell>
              <Table.HeaderCell>E-mail</Table.HeaderCell>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell width='1'>Ações</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {records.map((e, index) => {
              return (<Table.Row key={index}>
                <Table.Cell>{e.codigo}</Table.Cell>
                <Table.Cell>{e.email}</Table.Cell>
                <Table.Cell>{e.nome}</Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button onClick={() => { this.update(e.codigo); }} icon={true} primary={true} size='small'>
                      <Icon name='edit' />
                    </Button>
                    <Button negative={true} onClick={() => { remove(e.codigo); }} icon={true} primary={true} size='small'>
                      <Icon name='trash' />
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>)
            })}

          </Table.Body>

        </Table>

      </Container>
    );
  }
}
