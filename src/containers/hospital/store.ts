import { action, observable } from 'mobx';
import { getHospitaisById, postHospitais, putHospitais } from '../../api/hospitais.api';

export default class HospitalStore {

  private baseRecords = {
    hos_codigo: '',
    hos_nome: '',
    hos_endereco: '',
    hos_telefone: '',
    hos_cnpj: ''
  };

  @observable records: any = { ...this.baseRecords };

  @action buildRecords = async (id: number) => {
    const { data: [records] } = await getHospitaisById(id);
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

    if (Number(this.records.hos_codigo)) {
      await putHospitais(+this.records.hos_codigo, this.records);
    }
    else {
      await postHospitais(this.records);
    }
    await this.reset();
  }

}
const hospital = new HospitalStore();
export { hospital };
