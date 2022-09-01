import _ from 'lodash'

import IEntity from './interfaces/IEntity'

export default class OrdsMapper {
  mapToEntity <TOut extends IEntity>(item: any, inIdField: string): TOut {
    const mapped: IEntity = { id: 0 }
    _.forOwn(item, (value: any, key: string) => {
      if (key === inIdField) { mapped.id = value } else { mapped[key] = value }
    })
    return mapped as TOut
  }
}
