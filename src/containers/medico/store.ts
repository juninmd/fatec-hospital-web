import { action, observable } from 'mobx';
import { getMedicosById, postMedicos, putMedicos } from '../../api/medicos.api';

export default class MedicoStore {

  private baseRecords = {
    hos_codigo: '',
    hos_nome: '',
    hos_endereco: '',
    hos_telefone: '',
    hos_cnpj: ''
  };

  @observable records: any = { ...this.baseRecords };

  @action buildRecords = async (id: number) => {
    const { data: [records] } = await getMedicosById(id);
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

    if (Number(this.records.med_codigo)) {
      await putMedicos(+this.records.med_codigo, this.records);
    }
    else {
      await postMedicos(this.records);
    }
    await this.reset();
  }

}
const medico = new MedicoStore();
export { medico };
