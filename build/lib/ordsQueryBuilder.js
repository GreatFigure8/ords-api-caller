"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrdsQueryBuilder {
    buildQuerystring({ paging }) {
        return `?offset=${paging.offset}&limit=${paging.limit}`;
    }
    buildAction(action, id) {
        const fullAction = action.startsWith("/") ? action : `/${action}`;
        return id ? `${fullAction}/${id}` : fullAction;
    }
}
exports.default = OrdsQueryBuilder;
