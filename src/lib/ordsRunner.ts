/**
 * This is the main class in the library.  It enables calling
 * REST methods on a ORDS enabled endpoint
 */
import axios, { AxiosError, AxiosInstance } from 'axios'
import _ from 'lodash'

import IActionParams from './interfaces/IActionParams'
import IEntity from './interfaces/IEntity'
import IOrdsResponse from './interfaces/IOrdsResponse'
import { IResponse } from './interfaces/IResponse'

export default class OrdsRunner<T extends IEntity> {
  /**
   * The axios instance used to run the requests
   * @type {AxiosInstance}
   */
  runner: AxiosInstance

  /**
   * @constructor
   * @param {string} baseUrl The base url for the runner.  This is the endpoint of the ORDS enabled database
   */
  constructor (private readonly baseUrl: string) {
    this.runner = axios.create({ baseURL: baseUrl })
  }

  /**
   * Creates a blank response in the event we need one
   * @returns {IResponse{T}}
   */
  public static makeResponse<T extends IEntity> (): IResponse<T> {
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
   * The main get method for all ORDS entities.  Supports paging by using the
   * offset and limit params
   * @param {string} action
   * @returns {Promise<Response{T}}
   */
  async get ({ action }: IActionParams<T>): Promise<IResponse<T>> {
    const resp: IResponse<T> = OrdsRunner.makeResponse<T>()
    try {
      const axiosResp = await axios.get<IOrdsResponse<T>>(action)
      resp.ordsResponse = axiosResp.data
      return resp
    } catch (e) {
      resp.error = e as AxiosError
      return resp
    }
  }

  /**
   * This method is the main CUD method for all ORDS entities.  It posts when
   * there is no entity to update, it puts when there is an entity to update,
   * and it deletes if there is an id and the params indicate a delete
   * operation.
   * @returns {Promise<Response{{T}}
   * @param {IActionParams} params the action and the body
   */
  async upsert (params: IActionParams<T>): Promise<IResponse<T>> {
    try {
      const { body } = { ...params }
      if (_.isUndefined(body)) {
        throw new Error('To put, post or delete an item, there must be a body')
      } else if ((params.delete === true) && body.id <= 0) {
        throw new Error(`To delete an item, there must be a valid id.  The id you passed was ${body.id}`)
      } else {
        if (params.delete === true) return await this.delete(params)
        return body.id > 0 ? await this.put(params) : await this.post(params)
      }
    } catch (e) {
      const resp = OrdsRunner.makeResponse<T>()
      resp.error = OrdsRunner.mapErrorToAxiosError(e as Error)
      return resp
    }
  }

  /**
   * Runs a post. Usually used to add a new record
   * @param {string} action the url of the action
   * @param {{T} | undefined} body the body of the entity
   * @returns {Promise{IResponse{T}}} The response of the request
   */
  async post ({
    action,
    body
  }: IActionParams<T>): Promise<IResponse<T>> {
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

  /**
   * Runs a delete action to remove an entity
   * @param {string} action the url of the action
   * @param {{T} | undefined} body the entity
   * @returns {Promise{IResponse{T}}}
   */
  async delete ({
    action,
    body
  }: IActionParams<T>): Promise<IResponse<T>> {
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

  /**
   * runs a put request to update an entity
   * @param {string} action
   * @param {{T} | undefined} body
   * @returns {Promise{IResponse{T}}}
   */
  async put ({
    action,
    body
  }: IActionParams<T>): Promise<IResponse<T>> {
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
