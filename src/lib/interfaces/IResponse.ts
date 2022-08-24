import { AxiosError } from 'axios'
import { IOrdsResponse } from './IOrdsResponse'
import IEntity from './IEntity'

/**
 * The interface defining what we should expect back from any call to an ORDS
 * endpoint
 */
export interface IResponse<T extends IEntity> {
  ordsResponse: IOrdsResponse<T>
  error?: AxiosError
}
