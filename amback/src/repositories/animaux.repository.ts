import {DefaultCrudRepository} from '@loopback/repository';
import {Animaux, AnimauxRelations} from '../models';
import {AmdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AnimauxRepository extends DefaultCrudRepository<
  Animaux,
  typeof Animaux.prototype._id,
  AnimauxRelations
> {
  constructor(
    @inject('datasources.amdb') dataSource: AmdbDataSource,
  ) {
    super(Animaux, dataSource);
  }
}
