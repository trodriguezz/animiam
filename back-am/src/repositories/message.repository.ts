import {DefaultCrudRepository} from '@loopback/repository';
import {Message, MessageRelations} from '../models';
import {AmdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MessageRepository extends DefaultCrudRepository<
  Message,
  typeof Message.prototype._id,
  MessageRelations
> {
  constructor(
    @inject('datasources.amdb') dataSource: AmdbDataSource,
  ) {
    super(Message, dataSource);
  }
}
