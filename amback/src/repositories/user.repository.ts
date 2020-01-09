import {DefaultCrudRepository} from '@loopback/repository';
import {User, UserRelations} from '../models';
import {AmdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype._id,
  UserRelations
> {
  constructor(
    @inject('datasources.amdb') dataSource: AmdbDataSource,
  ) {
    super(User, dataSource);
  }
}
