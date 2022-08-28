import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import _ from 'lodash'

import IOrdsResponse from '../../lib/interfaces/IOrdsResponse'
import IPagingParams from '../../lib/interfaces/IPagingParams'

export interface TestHttpResp {
  message: string
  id: number
}

const defaultBefore = ({ offset, limit }: IPagingParams, defaultBody: TestHttpResp): void => {
  const mockAdapter = new MockAdapter(axios)
  const mockItems: TestHttpResp[] = []
  if (offset === 0 && limit === 0 && !_.isUndefined(defaultBefore)) mockItems.push(defaultBody)
  else {
    let i = 1
    while (i <= limit) {
      mockItems.push({ id: i, message: `item ${i}` })
      i++
    }
  }
  const mockOrdsResp: IOrdsResponse<TestHttpResp> = {
    items: mockItems,
    offset,
    limit,
    links: [],
    count: limit,
    hasMore: false
  }
  mockAdapter.onGet().replyOnce(200, mockOrdsResp)
  mockAdapter.onAny(/\/(put|post|delete)/).replyOnce(200, mockItems[0])
  mockAdapter.onAny(/\/(get|put|post|delete)_error/).networkError()
}

export const testHarnesses = {
  defaultBefore
}
