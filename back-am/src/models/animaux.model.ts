import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Animaux extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Animaux>) {
    super(data);
  }
}

export interface AnimauxRelations {
  // describe navigational properties here
}

export type AnimauxWithRelations = Animaux & AnimauxRelations;
