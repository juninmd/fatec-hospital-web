import * as React from 'react';
import MenuStore from '../../components/main-menu/store';
import { Container, Grid, Header, Table, Button, Icon } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import NewRouterStore from '../../mobx/router.store';
import EspecialidadeListStore from './store';

@inject('mainMenu', 'router', 'especialidadeList')
@observer
export default class EspecialidadeList extends React.Component<{
  menu: MenuStore;
  router: NewRouterStore;
  especialidadeList: EspecialidadeListStore;
}> {
  update = (id: number) => {
    const { setHistory } = this.props.router;
    setHistory(`especialidade/${id}`);
  };

  async componentDidMount() {
    const { buildRecords } = this.props.especialidadeList;
    await buildRecords();
  }

  render() {

    const { records, remove } = this.props.especialidadeList;

    return (
      <Container>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header color='blue' as='h2'>
                <Header.Content>
                  Cadastro de Especialidade
                 <Header.Subheader>Cadastre / Edite</Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>

            <Grid.Column>
              <Button onClick={() => this.update(0)} positive={true} content='Novo' />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Table celled={true}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width='1'>Id</Table.HeaderCell>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell width='1'>Ações</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {records.map((e, index) => {
              return (<Table.Row key={index}>
                <Table.Cell>{e.esp_codigo}</Table.Cell>
                <Table.Cell>{e.esp_nome}</Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button onClick={() => { this.update(e.esp_codigo); }} icon={true} primary={true} size='small'>
                      <Icon name='edit' />
                    </Button>
                    <Button negative={true} onClick={() => { remove(e.esp_codigo); }} icon={true} primary={true} size='small'>
                      <Icon name='trash' />
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>);
            })}

          </Table.Body>

        </Table>

      </Container>
    );
  }
}
