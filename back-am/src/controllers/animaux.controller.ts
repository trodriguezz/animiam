import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Animaux} from '../models';
import {AnimauxRepository} from '../repositories';

export class AnimauxController {
  constructor(
    @repository(AnimauxRepository)
    public animauxRepository : AnimauxRepository,
  ) {}

  @post('/animaux', {
    responses: {
      '200': {
        description: 'Animaux model instance',
        content: {'application/json': {schema: getModelSchemaRef(Animaux)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Animaux, {
            title: 'NewAnimaux',
            
          }),
        },
      },
    })
    animaux: Animaux,
  ): Promise<Animaux> {
    return this.animauxRepository.create(animaux);
  }

  @get('/animaux/count', {
    responses: {
      '200': {
        description: 'Animaux model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Animaux)) where?: Where<Animaux>,
  ): Promise<Count> {
    return this.animauxRepository.count(where);
  }

  @get('/animaux', {
    responses: {
      '200': {
        description: 'Array of Animaux model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Animaux, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Animaux)) filter?: Filter<Animaux>,
  ): Promise<Animaux[]> {
    return this.animauxRepository.find(filter);
  }

  @patch('/animaux', {
    responses: {
      '200': {
        description: 'Animaux PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Animaux, {partial: true}),
        },
      },
    })
    animaux: Animaux,
    @param.query.object('where', getWhereSchemaFor(Animaux)) where?: Where<Animaux>,
  ): Promise<Count> {
    return this.animauxRepository.updateAll(animaux, where);
  }

  @get('/animaux/{id}', {
    responses: {
      '200': {
        description: 'Animaux model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Animaux, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Animaux)) filter?: Filter<Animaux>
  ): Promise<Animaux> {
    return this.animauxRepository.findById(id, filter);
  }

  @patch('/animaux/{id}', {
    responses: {
      '204': {
        description: 'Animaux PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Animaux, {partial: true}),
        },
      },
    })
    animaux: Animaux,
  ): Promise<void> {
    await this.animauxRepository.updateById(id, animaux);
  }

  @put('/animaux/{id}', {
    responses: {
      '204': {
        description: 'Animaux PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() animaux: Animaux,
  ): Promise<void> {
    await this.animauxRepository.replaceById(id, animaux);
  }

  @del('/animaux/{id}', {
    responses: {
      '204': {
        description: 'Animaux DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.animauxRepository.deleteById(id);
  }
}
