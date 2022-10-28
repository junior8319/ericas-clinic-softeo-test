import City from "../database/models/City.model";
import Telephone from "../database/models/Telephone.model";
import ITelephone from "../interfaces/telephone.interface";

class Telephones {
  static model: Telephone;

  public prefix!: number;

  public number!: number;

  public id!: number;

  public cityId!: number;

  constructor() {
    Telephones.model = new Telephone();
  }

  public getTelephones = async (): Promise<ITelephone[] | null> => {
    const telephonesList = await Telephone.findAll({
      include: [
        { model: City, as: 'city' },
      ],
    });
    if (!telephonesList) return null;

    return telephonesList;
  };

  static getPhoneById = async (receivedId: number): Promise<ITelephone | null> => {
    const telephone = await Telephone.findByPk(receivedId);
    
    if (!telephone) return null;

    return telephone;
  };

  static telephoneExists = async (receivedPrefix: number, receivedNumber: number, cityId: number): Promise<boolean> => {
    const telephone = await Telephone.findOne({
      where: {
        prefix: receivedPrefix,
        number: receivedNumber,
        cityId: cityId,
      },
    });

    const exists = !!telephone;

    return exists;
  };

  public createTelephone = async (telephone: ITelephone): Promise<ITelephone | null> => {
    if (!telephone) return null;

    this.prefix = telephone.prefix;
    this.number = telephone.number;
    this.cityId = telephone.cityId;
    
    const telephoneExists = await Telephones.telephoneExists(this.prefix, this.number, this.cityId);
    if (telephoneExists) return null;

    const createdTelephone = await Telephone.create({ ...telephone });

    return createdTelephone;
  };

  public updateTelephone = async (telephone: ITelephone): Promise<ITelephone | null> => {
    if (!telephone) return null;

    if (telephone.id) this.id = telephone.id;
    const telephoneToUpdate = await Telephone.findOne({ where: { id: this.id }});
    if (!telephoneToUpdate) return null;

    if (telephone.prefix) {
      await telephoneToUpdate.update({
        prefix: telephone.prefix,
      });
    }

    if (telephone.number) {
      await telephoneToUpdate.update({
        number: telephone.number,
      });
    }

    if (telephone.cityId) {
      await telephoneToUpdate.update({
        cityId: telephone.cityId,
      });
    }

    return telephoneToUpdate;
  };

  public deleteTelephone = async (receivedId: string): Promise<ITelephone | null> => {
    if (!receivedId) return null;

    this.id = Number(receivedId);

    const telephoneToDelete = await Telephone.findOne({ where: { id: this.id } });

    if (telephoneToDelete) await telephoneToDelete.destroy();

    return telephoneToDelete;
  };
}

export default Telephones;
