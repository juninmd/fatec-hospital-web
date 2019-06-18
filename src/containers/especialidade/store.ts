import { action, observable } from 'mobx';
import { getEspecialidadesById, postEspecialidades, putEspecialidades } from '../../api/especialidades.api';

export default class EspecialidadeStore {
  private baseRecords = {
    esp_codigo: '',
    esp_nome: ''
  };

  @observable records: any = { ...this.baseRecords };

  @action buildRecords = async (id: number) => {
    const { data: [records] } = await getEspecialidadesById(id);
    this.records = records;
  }

  @action reset = () => {
    this.records = { ...this.baseRecords };
  }

  @action handleForm = (event: any, select?: any) => {
    const { id, value } = select || event.target;
    this.records[id] = value;
  };

  @action handleSubmit = async () => {

    if (Number(this.records.esp_codigo)) {
      await putEspecialidades(+this.records.esp_codigo, this.records);
    }
    else {
      await postEspecialidades(this.records);
    }
    await this.reset();
  }

}
const especialidade = new EspecialidadeStore();
export { especialidade };
