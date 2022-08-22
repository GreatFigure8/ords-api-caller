import IOrdsPagingParams from "./interfaces/IOrdsPagingParams";
export default class OrdsQueryBuilder {
    buildQuerystring({ paging }: {
        paging: IOrdsPagingParams;
    }): string;
    buildAction(action: string, id?: number): string;
}
