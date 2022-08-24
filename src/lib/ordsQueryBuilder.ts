import IPagingParams from './interfaces/IPagingParams'

export default class OrdsQueryBuilder {
  buildQuerystring ({ paging }: { paging: IPagingParams }): string {
    return `?offset=${paging.offset}&limit=${paging.limit}`
  }

  buildAction (action: string, id?: number): string {
    const fullAction = action.startsWith('/') ? action : `/${action}`
    return id ? `${fullAction}/${id}` : fullAction
  }
}
