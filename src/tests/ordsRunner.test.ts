import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import OrdsRunner from '../lib/ordsRunner'
import { expect } from 'chai'
import { IResponse } from '../lib/interfaces/IResponse'
import { describe } from 'mocha'

interface TestHttpResp {
  message: string
  id: number
}

describe('ords runner tests', () => {
  const mockAdapter = new MockAdapter(axios)
  const getEndpoint = '/get'
  const getErrorEndpoint = '/error'
  const putEndpoint = '/put'
  const postEndpoint = '/post'

  before(() => {
    const getResp = OrdsRunner.makeResponse<TestHttpResp>()
    getResp.ordsResponse.items.push({
      message: 'test get',
      id: 1
    })
    mockAdapter.onGet(getEndpoint).replyOnce(200, getResp.ordsResponse)
    mockAdapter.onGet(getErrorEndpoint).networkError()

    const putResp: TestHttpResp = {
      message: 'test put',
      id: 3
    }
    mockAdapter.onPut(putEndpoint).replyOnce(200, putResp)

    const postResp: TestHttpResp = {
      message: 'test post',
      id: 2
    }
    mockAdapter.onPost(postEndpoint).replyOnce(200, postResp)
  })

  it('should run a GET and return data', async () => {
    const ordsRunner = new OrdsRunner<TestHttpResp>('none')
    const resp = await ordsRunner.get({ action: getEndpoint })
    expect(resp.ordsResponse.items[0].message).to.equal('test get')
  })

  it('should run a GET and return an error', async () => {
    const ordsRunner = new OrdsRunner<TestHttpResp>('none')
    const resp = await ordsRunner.get({ action: getErrorEndpoint })
    expect(resp.error).to.not.be.undefined
    expect(resp.error?.isAxiosError).to.be.true
    expect(resp.error?.message).to.equal('Network Error')
  })

  it('upsert should run a POST and return a API response with one item', async () => {
    const expected: IResponse<TestHttpResp> = OrdsRunner.makeResponse<TestHttpResp>()
    expected.ordsResponse.items.push({
      message: 'test me',
      id: 2
    })

    const runner = new OrdsRunner<TestHttpResp>('none')
    const resp = await runner.upsert({
      action: '/post',
      body: {
        message: 'test post',
        id: 0
      }
    })

    expect(resp.ordsResponse.items.length).to.equal(1)
    expect(resp.ordsResponse.items[0].message).to.equal('test post')
    expect(resp.ordsResponse.items[0].id).to.equal(2)
  })

  it('upsert should throw error if the body is undefined', async () => {
    const expected: IResponse<TestHttpResp> = OrdsRunner.makeResponse<TestHttpResp>()
    expected.ordsResponse.items.push({
      message: 'test me',
      id: 2
    })

    const runner = new OrdsRunner<TestHttpResp>('none')
    const resp = await runner.upsert({
      action: '/post',
      body: undefined
    })

    expect(resp.error).to.not.be.undefined
    expect(resp.error?.message).to.not.be.empty
    expect(resp.error?.code).to.equal('400')
  })

  it('upsert should run a PUT and return a API response with one item', async () => {
    const expected: IResponse<TestHttpResp> = OrdsRunner.makeResponse<TestHttpResp>()
    expected.ordsResponse.items.push({
      message: 'test put',
      id: 3
    })

    const runner = new OrdsRunner<TestHttpResp>('none')
    const resp = await runner.upsert({
      action: '/put',
      body: {
        message: 'test put',
        id: 3
      }
    })

    expect(resp.ordsResponse.items.length).to.equal(1)
    expect(resp.ordsResponse.items[0].message).to.equal('test put')
    expect(resp.ordsResponse.items[0].id).to.equal(3)
  })
})
