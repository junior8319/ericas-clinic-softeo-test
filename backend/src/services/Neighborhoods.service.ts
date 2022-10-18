import City from '../database/models/City.model';
import Neighborhood from '../database/models/Neighborhood.model';
import INeighborhood from '../interfaces/neighborhood.interface';

class Neighborhoods {
  static model: Neighborhood;

  public name!: string;

  public id!: number;

  public cityId!: number;

  constructor() {
    Neighborhoods.model = new Neighborhood();
  }

  public getNeighborhoods = async (): Promise<INeighborhood[] | null> => {
    const neighborhoods = await Neighborhood.findAll({
      include: [
        { model: City, as: 'city', attributes: { exclude: ['id'] } },
      ],
    });
    if (!neighborhoods) return null;

    return neighborhoods;
  };

  static neighborhoodExists = async (receivedName: string, receivedCityId: number): Promise<boolean> => {
    const neighborhood = await Neighborhood.findOne({
      where: {
        name: receivedName,
        cityId: receivedCityId,
      },
    });

    const exists = !!neighborhood;

    return exists;
  };

  public createNeighborhood = async (neighborhood: INeighborhood): Promise<INeighborhood | null> => {
    if (!neighborhood) return null;

    this.name = neighborhood.name;
    this.cityId = neighborhood.cityId;
    
    const neighborhoodExists = await Neighborhoods.neighborhoodExists(this.name, this.cityId);
    if (neighborhoodExists) return null;

    const createdNeighborhood = await Neighborhood.create({ ...neighborhood });

    return createdNeighborhood;
  };

  public updateNeighborhood = async (neighborhood: INeighborhood): Promise<INeighborhood | null> => {
    if (!neighborhood) return null;

    if (neighborhood.id) this.id = neighborhood.id;

    const neighborhoodToUpdate = await Neighborhood.findOne({ where: { id: this.id }});
    if (!neighborhoodToUpdate) return null;

    if (neighborhood.name) {
      await neighborhoodToUpdate.update({
        name: neighborhood.name,
      });
    }

    if (neighborhood.cityId) {
      await neighborhoodToUpdate.update({
        cityId: neighborhood.cityId,
      });
    }

    return neighborhoodToUpdate;
  };

  public deleteNeighborhood = async (receivedId: string): Promise<INeighborhood | null> => {
    if (!receivedId) return null;

    this.id = Number(receivedId);

    const neighborhoodToDelete = await Neighborhood.findOne({ where: { id: this.id } });

    if (neighborhoodToDelete) await neighborhoodToDelete.destroy();

    return neighborhoodToDelete;
  };
}

export default Neighborhoods;
