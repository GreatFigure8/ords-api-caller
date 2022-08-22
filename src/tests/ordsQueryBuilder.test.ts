import {expect} from "chai";
import OrdsQueryBuilder from "../lib/ordsQueryBuilder";
import IOrdsPagingParams from "../lib/interfaces/IOrdsPagingParams";

describe("ORDS query tests", () => {
    it("should create a querystring with paging parameters", () => {
        const params: IOrdsPagingParams = {limit: 25, offset: 25};
        const qb = new OrdsQueryBuilder();
        const actual = qb.buildQuerystring({paging: params});
        const expected = "?offset=25&limit=25";
        expect(actual).to.equal(expected);
    });

    it("should create a action url no leading slash", () => {
        const expected = "/pods";
        const qb = new OrdsQueryBuilder();
        const actual = qb.buildAction("pods");
        expect(actual).to.equal(expected);
    });
    it("should create a action url with leading slash", () => {
        const expected = "/pods";
        const qb = new OrdsQueryBuilder();
        const actual = qb.buildAction("/pods");
        expect(actual).to.equal(expected);
    });
    it("should build an id action if one present", () => {
        const expected = "/pods/1";
        const qb = new OrdsQueryBuilder();
        const actual = qb.buildAction("/pods", 1);
        expect(actual).to.equal(expected);
    });
});
