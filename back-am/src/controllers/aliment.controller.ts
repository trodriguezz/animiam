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
import {Aliment} from '../models';
import {AlimentRepository} from '../repositories';

export class AlimentController {
  constructor(
    @repository(AlimentRepository)
    public alimentRepository : AlimentRepository,
  ) {}

  @post('/aliments', {
    responses: {
      '200': {
        description: 'Aliment model instance',
        content: {'application/json': {schema: getModelSchemaRef(Aliment)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aliment, {
            title: 'NewAliment',
            
          }),
        },
      },
    })
    aliment: Aliment,
  ): Promise<Aliment> {
    return this.alimentRepository.create(aliment);
  }

  @get('/aliments/count', {
    responses: {
      '200': {
        description: 'Aliment model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Aliment)) where?: Where<Aliment>,
  ): Promise<Count> {
    return this.alimentRepository.count(where);
  }

  @get('/aliments', {
    responses: {
      '200': {
        description: 'Array of Aliment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Aliment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Aliment)) filter?: Filter<Aliment>,
  ): Promise<Aliment[]> {
    return this.alimentRepository.find(filter);
  }

  @patch('/aliments', {
    responses: {
      '200': {
        description: 'Aliment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aliment, {partial: true}),
        },
      },
    })
    aliment: Aliment,
    @param.query.object('where', getWhereSchemaFor(Aliment)) where?: Where<Aliment>,
  ): Promise<Count> {
    return this.alimentRepository.updateAll(aliment, where);
  }

  @get('/aliments/{id}', {
    responses: {
      '200': {
        description: 'Aliment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Aliment, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Aliment)) filter?: Filter<Aliment>
  ): Promise<Aliment> {
    return this.alimentRepository.findById(id, filter);
  }

  @patch('/aliments/{id}', {
    responses: {
      '204': {
        description: 'Aliment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aliment, {partial: true}),
        },
      },
    })
    aliment: Aliment,
  ): Promise<void> {
    await this.alimentRepository.updateById(id, aliment);
  }

  @put('/aliments/{id}', {
    responses: {
      '204': {
        description: 'Aliment PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() aliment: Aliment,
  ): Promise<void> {
    await this.alimentRepository.replaceById(id, aliment);
  }

  @del('/aliments/{id}', {
    responses: {
      '204': {
        description: 'Aliment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.alimentRepository.deleteById(id);
  }
}
