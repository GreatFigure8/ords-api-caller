import axios from 'axios'
import MockAdapter from 'axios-mock-adapter/types'

import { IResponse } from '../lib/interfaces/IResponse'
import OrdsRunner from '../lib/ordsRunner'

export interface TestHttpResp {
  message: string
  id: number
}

const defaultBefore = ({ id, message }: TestHttpResp): void => {
  const mockAdapter = new MockAdapter(axios)
  const mockResp = makeMockResponse(id, message)
  mockAdapter.onAny(/\/(get|put|post|delete)/).replyOnce(200, mockResp)
  mockAdapter.onAny(/\/(get|put|post|delete)_error/).networkError()
}
const makeMockResponse = (id: number, message: string): IResponse<TestHttpResp> => {
  const resp = OrdsRunner.makeResponse<TestHttpResp>()
  resp.ordsResponse.offset = 10
  resp.ordsResponse.limit = 10
  resp.ordsResponse.items.push({ id, message })
  return resp
}

export const testHarnesses = {
  defaultBefore,
  makeMockResponse
}
