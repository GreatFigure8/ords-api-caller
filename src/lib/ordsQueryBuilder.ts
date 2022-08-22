import IOrdsPagingParams from "./interfaces/IOrdsPagingParams";

export default class OrdsQueryBuilder {
    buildQuerystring({paging}: { paging: IOrdsPagingParams }): string {
        return `?offset=${paging.offset}&limit=${paging.limit}`;
    }
    buildAction(action: string, id?: number): string {
        const fullAction = action.startsWith("/") ? action : `/${action}`;
        return id ? `${fullAction}/${id}` : fullAction;
    }
}