import { expect } from 'chai'

import IPagingParams from '../../lib/interfaces/IPagingParams'
import OrdsRunner from '../../lib/ordsRunner'
import { testHarnesses, TestHttpResp } from '../lib/testHarnesses'

describe('ordsRunner GET all tests', () => {
  const defaultBody: TestHttpResp = { id: 1, message: 'item 1' }
  before(() => { testHarnesses.defaultBefore({ offset: 0, limit: 0 }, defaultBody) })

  it('should run a GET and return data', async () => {
    const ordsRunner = new OrdsRunner<TestHttpResp>('none')
    const resp = await ordsRunner.get({ action: '/get' })
    expect(resp.ordsResponse.items.length).to.equal(1)
    expect(resp.error).to.be.undefined
  })

  it('should run a GET and return an error', async () => {
    const ordsRunner = new OrdsRunner<TestHttpResp>('none')
    const resp = await ordsRunner.get({ action: '/get_error' })
    expect(resp.error).to.not.be.undefined
    expect(resp.error?.isAxiosError).to.be.true
    expect(resp.error?.message).to.equal('Network Error')
  })
})
describe('ordsRunner GET paging tests', () => {
  const defaultBody: TestHttpResp = { id: 1, message: 'item 1' }
  const paging: IPagingParams = { offset: 10, limit: 10 }
  before(() => { testHarnesses.defaultBefore(paging, defaultBody) })

  it('should run a GET and return data', async () => {
    const ordsRunner = new OrdsRunner<TestHttpResp>('none')
    const resp = await ordsRunner.get({ action: '/get', paging })
    expect(resp.ordsResponse.offset).to.equal(paging.offset)
    expect(resp.ordsResponse.limit).to.equal(paging.limit)
  })

  it('should run a GET and return an error', async () => {
    const ordsRunner = new OrdsRunner<TestHttpResp>('none')
    const resp = await ordsRunner.get({ action: '/get_error', paging })
    expect(resp.error).to.not.be.undefined
    expect(resp.error?.isAxiosError).to.be.true
    expect(resp.error?.message).to.equal('Network Error')
  })
})
