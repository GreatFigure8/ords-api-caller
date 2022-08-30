import _ from 'lodash'

import IEntity from './interfaces/IEntity'

export default class OrdsMapper {
  mapToEntity (item: any, inIdField: string): IEntity {
    const mapped: IEntity = { id: 0 }
    _.forOwn(item, (value: any, key: string) => {
      if (key === inIdField) { mapped.id = value } else { mapped[key] = value }
    })
    return mapped
  }
}
