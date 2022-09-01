import { expect } from 'chai'

import OrdsMapper from '../../lib/ordsMapper'
import { IPod } from '../ordsRunnerTests/get.integration.test'

describe('ordsMapper tests', function () {
  this.timeout(60000)
  let mapper: OrdsMapper
  before(() => { mapper = new OrdsMapper() })
  it('should map to pod', () => {
    const pod: IPod = {
      pod_id: 1,
      pod_name: 'pod name',
      pod_svc_user: 'user',
      pod_svc_user_pass: 'user pass',
      pod_url: 'https://www.google.com/',
      id: 0
    }
    const mapped = mapper.mapToEntity<IPod>(pod, 'pod_id')
    expect(mapped.id).to.equal(1)
    expect(mapped.pod_id).to.be.equal(pod.pod_id)
    expect(mapped.pod_name).to.be.equal(pod.pod_name)
    expect(mapped.pod_svc_user).to.be.equal(pod.pod_svc_user)
    expect(mapped.pod_svc_user_pass).to.be.equal(pod.pod_svc_user_pass)
  })
})
