import Neighborhood from '../database/models/Neighborhood.model';
import PublicPlace from '../database/models/PublicPlace.model';
import User from '../database/models/User.model';
import IPublicPlace from '../interfaces/publicPlace.interface';

class PublicPlaces {
  static model: PublicPlace;

  public name!: string;

  public neighborhoodId!: number;

  public id!: number;

  constructor() {
    PublicPlaces.model = new PublicPlace();
  }

  public getPublicPlaces = async (): Promise<IPublicPlace[] | null> => {
    const publicPlacesList = await PublicPlace.findAll({
      include: [
        { model: Neighborhood, as: 'neighborhood', attributes: { exclude: ['id'] } },
        { model: User, as: 'residents', through: { attributes: [] }, attributes: { exclude: ['id', 'rg', 'cpf'] }},
      ],
    });
    if (!publicPlacesList) return null;

    return publicPlacesList;
  };

  static getPubPlaceById = async (receivedId: number): Promise<IPublicPlace | null> => {
    const publicPlace = await PublicPlace.findByPk(receivedId);

    if (!publicPlace) return null;

    return publicPlace;
  };

  static publicPlaceExists = async (
    receivedName: string,
    receivedNeighborhoodId: Number
  ): Promise<boolean> => {
    const publicPlace = await PublicPlace.findOne({
      where: {
        name: receivedName,
        neighborhoodId: receivedNeighborhoodId
      },
    });

    const exists = !!publicPlace;

    return exists;
  };

  public createPublicPlace = async (publicPlace: IPublicPlace): Promise<IPublicPlace | null> => {
    if (!publicPlace) return null;

    this.name = publicPlace.name;
    this.neighborhoodId = publicPlace.neighborhoodId;
    
    const publicPlaceExists = await PublicPlaces
      .publicPlaceExists(this.name, this.neighborhoodId);
    if (publicPlaceExists) return null;

    const createdPublicPlace = await PublicPlace.create({ ...publicPlace });

    return createdPublicPlace;
  };

  public updatePublicPlace = async (publicPlace: IPublicPlace): Promise<IPublicPlace | null> => {
    if (!publicPlace) return null;

    if (publicPlace.id) this.id = publicPlace.id;

    const publicPlaceToUpdate = await PublicPlace.findOne({ where: { id: this.id }});
    if (!publicPlaceToUpdate) return null;

    if (publicPlace.name) {
      await publicPlaceToUpdate.update({
        name: publicPlace.name,
      });
    }

    if (publicPlace.type) {
      await publicPlaceToUpdate.update({
        type: publicPlace.type,
      });
    }

    if (publicPlace.neighborhoodId) {
      await publicPlaceToUpdate.update({
        neighborhoodId: publicPlace.neighborhoodId,
      });
    }

    return publicPlaceToUpdate;
  };

  public deletePublicPlace = async (receivedId: string): Promise<IPublicPlace | null> => {
    if (!receivedId) return null;

    this.id = Number(receivedId);

    const publicPlaceToDelete = await PublicPlace.findOne({ where: { id: this.id } });

    if (publicPlaceToDelete) await publicPlaceToDelete.destroy();

    return publicPlaceToDelete;
  };
}

export default PublicPlaces;
