import { IEntity } from './IEntity'

/**
 * The options used to define a request.
 * <pre>
 * action is the action we want to call and is mandatory
 * delete defines if we are calling a delete operation.  Assumed to be false
 * body is the entity we want to PUT, POST or DELETE
 * </pre>
 */
export interface IActionParams<T extends IEntity> {
  action: string
  delete?: boolean
  body?: T
}
