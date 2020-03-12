import {DefaultCrudRepository} from '@loopback/repository';
import {Aliment, AlimentRelations} from '../models';
import {AmdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AlimentRepository extends DefaultCrudRepository<
  Aliment,
  typeof Aliment.prototype._id,
  AlimentRelations
> {
  constructor(
    @inject('datasources.amdb') dataSource: AmdbDataSource,
  ) {
    super(Aliment, dataSource);
  }
}
