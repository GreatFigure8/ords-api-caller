import { expect } from 'chai'

import { IResponse } from '../../lib/interfaces/IResponse'
import OrdsRunner from '../../lib/ordsRunner'
import { testHarnesses, TestHttpResp } from '../testHarnesses'

describe('ordsRunner POST tests', () => {
  const testMsg: TestHttpResp = { id: 1, message: 'post' }
  before(() => testHarnesses.defaultBefore(testMsg))

  it('upsert should run a POST and return a API response with one item', async () => {
    const expected: IResponse<TestHttpResp> = OrdsRunner.makeResponse<TestHttpResp>()
    expected.ordsResponse.items.push({
      message: 'test me',
      id: 2
    })

    const runner = new OrdsRunner<TestHttpResp>('none')
    const resp = await runner.upsert({
      action: '/post',
      body: testMsg
    })

    expect(resp.ordsResponse.items.length).to.equal(1)
    expect(resp.ordsResponse.items[0].message).to.equal('test post')
    expect(resp.ordsResponse.items[0].id).to.equal(2)
  })

  it('upsert should throw error if the body is undefined', async () => {
    const expected: IResponse<TestHttpResp> = OrdsRunner.makeResponse<TestHttpResp>()
    expected.ordsResponse.items.push(testMsg)

    const runner = new OrdsRunner<TestHttpResp>('none')
    const resp = await runner.upsert({
      action: '/post_error',
      body: undefined
    })

    expect(resp.error).to.not.be.undefined
    expect(resp.error?.message).to.not.be.empty
    expect(resp.error?.code).to.equal('400')
  })
})
