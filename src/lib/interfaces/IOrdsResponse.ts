import IEntity from './IEntity'
import { IOrdsLink } from './IOrdsLink'

export default interface IOrdsResponse<T extends IEntity> {
  items: T[]
  hasMore: boolean
  limit: number
  offset: number
  count: number
  links: IOrdsLink[]
}
