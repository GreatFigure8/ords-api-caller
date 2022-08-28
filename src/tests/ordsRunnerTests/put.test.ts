import { expect } from 'chai'

import OrdsRunner from '../../lib/ordsRunner'
import { testHarnesses, TestHttpResp } from '../lib/testHarnesses'

describe('ordsRunner PUT tests', () => {
  const defaultBody: TestHttpResp = { id: 1, message: 'item 1' }
  before(() => testHarnesses.defaultBefore({ offset: 0, limit: 0 }, defaultBody))

  it('upsert should run a put and return a API response with one item', async () => {
    const runner = new OrdsRunner<TestHttpResp>('none')
    const resp = await runner.upsert({
      action: '/put',
      body: { id: 1, message: 'item 1' }
    })

    expect(resp.ordsResponse.items.length).to.equal(1)
    expect(resp.ordsResponse.items[0].message).to.equal(defaultBody.message)
    expect(resp.ordsResponse.items[0].id).to.equal(defaultBody.id)
  })

  it('upsert should throw error if the body is undefined', async () => {
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
