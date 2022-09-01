import { expect } from 'chai'

import IEntity from '../../lib/interfaces/IEntity'
import OrdsRunner from '../../lib/ordsRunner'

export interface IPod extends IEntity {
  pod_id: number
  pod_name: string
  pod_svc_user: string
  pod_svc_user_pass: string
  pod_url: string

}

describe('ordsRunner GET all integration tests', function () {
  let runner: OrdsRunner<IPod>

  this.timeout(60000)

  before(() => {
    runner = new OrdsRunner<IPod>('https://g6b2527b56da518-convertfinitedev.adb.us-ashburn-1.oraclecloudapps.com/ords/admin')
  })
  it('should pull 500 pods', async () => {
    const pods = await runner.get({ action: '/pods' })
    expect(pods).to.not.be.undefined
    expect(pods.ordsResponse).to.not.be.undefined
    expect(pods.ordsResponse.items.length).to.be.greaterThan(0)
    expect('').to.be.empty
  })
})
