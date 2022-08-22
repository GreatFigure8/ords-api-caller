import { IEntity } from "./interfaces/IEntity";
import { IOrdsLink } from "./IOrdsLink";
export interface IOrdsResponse<T extends IEntity> {
    items: T[];
    hasMore: boolean;
    limit: number;
    offset: number;
    count: number;
    links: IOrdsLink[];
}
