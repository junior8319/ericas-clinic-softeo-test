import City from "../database/models/City.model";
import Country from "../database/models/Country.model";
import ICity from "../interfaces/city.interface";

class Cities {
  static model: City;

  public name!: string;

  public id!: number;

  constructor() {
    Cities.model = new City();
  }

  public getCities = async (): Promise<ICity[] | null> => {
    const cities = await City.findAll({
      include: { model: Country, as: 'country', attributes: { exclude: ['id'] } },
    });
    if (!cities) return null;

    return cities;
  };

  static cityExists = async (receivedName: string): Promise<boolean> => {
    const city = await City.findOne({
      where: { name: receivedName },
    });

    const exists = !!city;

    return exists;
  };

  static getCityById = async (id: number): Promise<ICity | null> => {
    const foundCity = await City.findByPk(id);
    if (!foundCity) return null;

    return foundCity;
  };

  public createCity = async (city: ICity): Promise<ICity | null> => {
    if (!city) return null;

    this.name = city.name;
    
    const cityExists = await Cities.cityExists(this.name);
    if (cityExists) return null;

    const createdCity = await City.create({ ...city });

    return createdCity;
  };

  public updateCity = async (city: ICity): Promise<ICity | null> => {
    if (!city) return null;

    if (city.id) this.id = city.id;

    const cityToUpdate = await City.findOne({ where: { id: this.id }});
    if (!cityToUpdate) return null;

    if (city.name) {
      await cityToUpdate.update({
        name: city.name,
      });
    }

    if (city.countryId) {
      await cityToUpdate.update({
        countryId: city.countryId,
      });
    }

    if (city.phoneCode) {
      await cityToUpdate.update({
        phoneCode: city.phoneCode,
      });
    }

    if (city.state) {
      await cityToUpdate.update({
        state: city.state,
      });
    }

    return cityToUpdate;
  };

  public deleteCity = async (receivedId: string): Promise<ICity | null> => {
    if (!receivedId) return null;

    this.id = Number(receivedId);

    const cityToDelete = await City.findOne({ where: { id: this.id } });

    if (cityToDelete) await cityToDelete.destroy();

    return cityToDelete;
  };
}

export default Cities;
