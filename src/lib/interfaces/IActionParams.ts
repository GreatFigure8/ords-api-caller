/**
 * @typedef {object} IActionParams - Defines a
 * The options used to define a request.
 *  @property {string} action defines the url of the action
 *  @property {IPagingParams} paging defines the paging parameters offset and limit to allow for paging results on the server
 *  @property {boolean} delete is the request an delete or not.  it is considered false if undefined
 *  @property {IEntity} body the entity we're acting on
 */

import IEntity from './IEntity'
import IPagingParams from './IPagingParams'

/** @type {IActionParams} */
export default interface IActionParams<T extends IEntity> {
  action: string
  paging?: IPagingParams
  delete?: boolean
  body?: T
}
