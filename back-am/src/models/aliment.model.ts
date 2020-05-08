import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Aliment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  _id?: number;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  animaux: string[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Aliment>) {
    super(data);
  }
}

export interface AlimentRelations {
  // describe navigational properties here
}

export type AlimentWithRelations = Aliment & AlimentRelations;
