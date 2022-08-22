import axios, { AxiosError, AxiosInstance } from 'axios'
import _ from 'lodash'
import { IEntity } from './IEntity'
import { IActionParams } from './IActionParams'

export interface OrdsResponse<T extends IEntity> {
  items: T[]
  hasMore: boolean
  limit: number
  offset: number
  count: number
  links: OrdsLink[]
}

export interface OrdsLink {
  rel: string
  link: string
}

/**
 * The interface defining what we should expect back from any call to an ORDS endpoint
 */
export interface IResponse<T extends IEntity> {
  ordsResponse: OrdsResponse<T>
  error?: AxiosError
}

export default class OrdsRunner<T extends IEntity> {
  runner: AxiosInstance
  constructor (private readonly baseUrl: string) {
    this.runner = axios.create({ baseURL: baseUrl })
  }

  public static makeResponse<T>(): IResponse<T> {
    return {
      ordsResponse: {
        offset: 0,
        links: [],
        limit: 0,
        count: 0,
        hasMore: false,
        items: []
      },
      error: undefined
    }
  }

  private static mapErrorToAxiosError (err: Error): AxiosError {
    const error = new AxiosError()
    error.message = err.message
    error.stack = err.stack
    error.status = 'BadRequest'
    error.code = '400'
    return error
  }

  /**
   * The main get method for all ORDS entities.  Supports paging by using the offset and limit params
   * @param {string} action
   * @returns {Promise<Response{T}}
   */
  async get ({ action }: IActionParams<T>): Promise<IResponse<T>> {
    const resp: IResponse<T> = OrdsRunner.makeResponse<T>()
    try {
      const axiosResp = await axios.get<OrdsResponse<T>>(action)
      resp.ordsResponse = axiosResp.data
      return resp
    } catch (e) {
      resp.error = e as AxiosError
      return resp
    }
  }

  /**
   * This method is the main CUD method for all ORDS entities.  It posts when there is no entity to update, it puts when there is an entity to update, and
   * it deletes if there is an id and the params indicate a delete operation.
   * @returns {Promise<Response{{T}}
   * @param {IActionParams} params the action and the body
   */
  async upsert (params: IActionParams<T>): Promise<IResponse<T>> {
    try {
      const { body } = { ...params }
      if (_.isUndefined(body)) throw new Error('To put, post or delete an item, there must be a body')
      else if ((params.delete === true) && body.id <= 0) throw new Error(`To delete an item, there must be a valid id.  The id you passed was ${body.id}`)
      else {
        if (params.delete === true) return await this.delete(params)
        return body.id > 0 ? await this.put(params) : await this.post(params)
      }
    } catch (e) {
      const resp = OrdsRunner.makeResponse<T>()
      resp.error = OrdsRunner.mapErrorToAxiosError(e as Error)
      return resp
    }
  }

  async post ({ action, body }: IActionParams<T>): Promise<IResponse<T>> {
    const resp: IResponse<T> = OrdsRunner.makeResponse<T>()
    try {
      const axiosResp = await axios.post<T>(action, body)
      resp.ordsResponse.items.push(axiosResp.data)
      return resp
    } catch (e) {
      resp.error = e as AxiosError
      return resp
    }
  }

  async delete ({ action, body }: IActionParams<T>): Promise<IResponse<T>> {
    const resp: IResponse<T> = OrdsRunner.makeResponse<T>()
    try {
      if (_.isUndefined(body)) throw new Error('To delete an item, there must be a body')
      const axiosResp = await axios.delete<T>(`${action}/${body.id}`)
      resp.ordsResponse.items.push(axiosResp.data)
      return resp
    } catch (e) {
      resp.error = e as AxiosError
      return resp
    }
  }

  async put ({ action, body }: IActionParams<T>): Promise<IResponse<T>> {
    const resp: IResponse<T> = OrdsRunner.makeResponse<T>()
    try {
      const axiosResp = await axios.put<T>(action, body)
      resp.ordsResponse.items.push(axiosResp.data)
      return resp
    } catch (e) {
      resp.error = e as AxiosError
      return resp
    }
  }
}
