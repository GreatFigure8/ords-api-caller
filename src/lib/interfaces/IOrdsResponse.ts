import { IOrdsLink } from './IOrdsLink'
import IEntity from './IEntity'

export interface IOrdsResponse<T extends IEntity> {
  items: T[]
  hasMore: boolean
  limit: number
  offset: number
  count: number
  links: IOrdsLink[]
}
