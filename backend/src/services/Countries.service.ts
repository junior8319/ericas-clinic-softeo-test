import Country from "../database/models/Country.model";
import ICountry from '../interfaces/country.interface';

class Countries {
  static model: Country;

  public name!: string;

  public id!: number;

  constructor() {
    Countries.model = new Country();
  }

  public getCountries = async (): Promise<ICountry[] | null> => {
    const countries = await Country.findAll({ raw: true });
    if (!countries) return null;

    return countries;
  };

  static countryExists = async (receivedName: string): Promise<boolean> => {
    const country = await Country.findOne({
      where: { name: receivedName },
    });

    const exists = !!country;

    return exists;
  };

  public createCountry = async (country: ICountry): Promise<ICountry | null> => {
    if (!country) return null;

    this.name = country.name;
    
    const countryExists = await Countries.countryExists(this.name);
    if (countryExists) return null;

    const createdCountry = await Country.create({ ...country });

    return createdCountry;
  };

  public updateCountry = async (country: ICountry): Promise<ICountry | null> => {
    if (!country) return null;

    if (country.id) this.id = country.id;

    const countryToUpdate = await Country.findOne({ where: { id: this.id }});
    if (!countryToUpdate) return null;

    if (country.name) {
      await countryToUpdate.update({
        name: country.name,
      });
    }

    if (country.continent) {
      await countryToUpdate.update({
        continent: country.continent,
      });
    }

    if (country.phoneCode) {
      await countryToUpdate.update({
        phoneCode: country.phoneCode,
      });
    }

    return countryToUpdate;
  };
}

export default Countries;
