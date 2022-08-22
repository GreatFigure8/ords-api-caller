"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const ordsQueryBuilder_1 = __importDefault(require("../lib/ordsQueryBuilder"));
describe("ORDS query tests", () => {
    it("should create a querystring with paging parameters", () => {
        const params = { limit: 25, offset: 25 };
        const qb = new ordsQueryBuilder_1.default();
        const actual = qb.buildQuerystring({ paging: params });
        const expected = "?offset=25&limit=25";
        (0, chai_1.expect)(actual).to.equal(expected);
    });
    it("should create a action url no leading slash", () => {
        const expected = "/pods";
        const qb = new ordsQueryBuilder_1.default();
        const actual = qb.buildAction("pods");
        (0, chai_1.expect)(actual).to.equal(expected);
    });
    it("should create a action url with leading slash", () => {
        const expected = "/pods";
        const qb = new ordsQueryBuilder_1.default();
        const actual = qb.buildAction("/pods");
        (0, chai_1.expect)(actual).to.equal(expected);
    });
    it("should build an id action if one present", () => {
        const expected = "/pods/1";
        const qb = new ordsQueryBuilder_1.default();
        const actual = qb.buildAction("/pods", 1);
        (0, chai_1.expect)(actual).to.equal(expected);
    });
});
