"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
const axios_1 = __importDefault(require("axios"));
const ordsRunner_1 = __importDefault(require("../lib/ordsRunner"));
const chai_1 = require("chai");
(0, mocha_1.describe)("ords runner tests", () => {
    const postEndpoint = "/post";
    const getEndpoint = "/get";
    const getErrorEndpoint = "/error";
    const mockAdapter = new axios_mock_adapter_1.default(axios_1.default);
    before(() => {
        const getResp = ordsRunner_1.default.makeResponse();
        getResp.ordsResponse.items.push({ message: "test get", id: 1 });
        mockAdapter.onGet(getEndpoint).replyOnce(200, getResp.ordsResponse);
        mockAdapter.onGet(getErrorEndpoint).networkError();
        const postResp = { message: "test post", id: 2 };
        mockAdapter.onPost(postEndpoint).replyOnce(200, postResp);
    });
    it("should run a GET and return data", () => __awaiter(void 0, void 0, void 0, function* () {
        const ordsRunner = new ordsRunner_1.default("none");
        const resp = yield ordsRunner.get({ action: getEndpoint });
        (0, chai_1.expect)(resp.ordsResponse.items[0].message).to.equal("test get");
    }));
    it("should run a GET and return an error", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const ordsRunner = new ordsRunner_1.default("none");
        const resp = yield ordsRunner.get({ action: getErrorEndpoint });
        (0, chai_1.expect)(resp.error).to.not.be.undefined;
        (0, chai_1.expect)((_a = resp.error) === null || _a === void 0 ? void 0 : _a.isAxiosError).to.be.true;
        (0, chai_1.expect)((_b = resp.error) === null || _b === void 0 ? void 0 : _b.message).to.equal("Network Error");
    }));
    it("upsert should run a POST and return a API response with one item", () => __awaiter(void 0, void 0, void 0, function* () {
        const expected = ordsRunner_1.default.makeResponse();
        expected.ordsResponse.items.push({ message: "test me", id: 2 });
        const runner = new ordsRunner_1.default("none");
        const resp = yield runner.upsert({ action: "/post", body: { message: "test post", id: 0 } });
        (0, chai_1.expect)(resp.ordsResponse.items.length).to.equal(1);
        (0, chai_1.expect)(resp.ordsResponse.items[0].message).to.equal("test post");
        (0, chai_1.expect)(resp.ordsResponse.items[0].id).to.equal(2);
    }));
    it("upsert should throw error if the body is undefined", () => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d;
        const expected = ordsRunner_1.default.makeResponse();
        expected.ordsResponse.items.push({ message: "test me", id: 2 });
        const runner = new ordsRunner_1.default("none");
        const resp = yield runner.upsert({ action: "/post", body: undefined });
        (0, chai_1.expect)(resp.error).to.not.be.undefined;
        (0, chai_1.expect)((_c = resp.error) === null || _c === void 0 ? void 0 : _c.message).to.not.be.empty;
        (0, chai_1.expect)((_d = resp.error) === null || _d === void 0 ? void 0 : _d.code).to.equal("400");
    }));
});
