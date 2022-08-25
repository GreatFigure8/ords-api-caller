import { expect } from 'chai'

import OrdsRunner from '../../lib/ordsRunner'
import { testHarnesses, TestHttpResp } from '../testHarnesses'

describe('ordsRunner GET all tests', () => {
  const expectedResponse: TestHttpResp = { message: 'testing', id: 1 }
  before(() => { testHarnesses.defaultBefore(expectedResponse) })

  it('should run a GET and return data', async () => {
    const ordsRunner = new OrdsRunner<TestHttpResp>('none')
    const resp = await ordsRunner.get({ action: '/get' })
    expect(resp.ordsResponse.items[0].id).to.equal(expectedResponse.id)
    expect(resp.ordsResponse.items[0].message).to.equal(expectedResponse.message)
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
  const expectedResponse: TestHttpResp = { message: 'testing', id: 1 }
  before(() => { testHarnesses.defaultBefore(expectedResponse) })

  it('should run a GET and return data', async () => {
    const ordsRunner = new OrdsRunner<TestHttpResp>('none')
    const resp = await ordsRunner.get({ action: '/get', paging: { limit: 10, offset: 10 } })
    expect(resp.ordsResponse.offset).to.equal(10)
    expect(resp.ordsResponse.limit).to.equal(10)
  })

  it('should run a GET and return an error', async () => {
    const ordsRunner = new OrdsRunner<TestHttpResp>('none')
    const resp = await ordsRunner.get({ action: '/get_error', paging: { limit: 10, offset: 10 } })
    expect(resp.error).to.not.be.undefined
    expect(resp.error?.isAxiosError).to.be.true
    expect(resp.error?.message).to.equal('Network Error')
  })
})
