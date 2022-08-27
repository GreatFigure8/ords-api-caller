import { expect } from 'chai'

import { IResponse } from '../../lib/interfaces/IResponse'
import OrdsRunner from '../../lib/ordsRunner'
import { testHarnesses, TestHttpResp } from '../testHarnesses'

describe('ordsRunner PUT tests', () => {
  const testMsg: TestHttpResp = { id: 1, message: 'put' }
  before(() => testHarnesses.defaultBefore(testMsg))

  it('upsert should run a put and return a API response with one item', async () => {
    const expected: IResponse<TestHttpResp> = OrdsRunner.makeResponse<TestHttpResp>()
    expected.ordsResponse.items.push({
      message: 'test me',
      id: 2
    })

    const runner = new OrdsRunner<TestHttpResp>('none')
    const resp = await runner.upsert({
      action: '/put',
      body: testMsg
    })

    expect(resp.ordsResponse.items.length).to.equal(1)
    expect(resp.ordsResponse.items[0].message).to.equal(testMsg.message)
    expect(resp.ordsResponse.items[0].id).to.equal(testMsg.id)
  })

  it('upsert should throw error if the body is undefined', async () => {
    const expected: IResponse<TestHttpResp> = OrdsRunner.makeResponse<TestHttpResp>()
    expected.ordsResponse.items.push(testMsg)

    const runner = new OrdsRunner<TestHttpResp>('none')
    const resp = await runner.upsert({
      action: '/put_error',
      body: undefined
    })

    expect(resp.error).to.not.be.undefined
    expect(resp.error?.message).to.not.be.empty
    expect(resp.error?.code).to.equal('400')
  })
})
