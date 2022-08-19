import {describe} from "mocha";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import OrdsRunner, {Response} from "../lib/ordsRunner";
import {expect} from "chai";

type TestHttpResp = {
    message: string;
}

describe("ords runner tests", () => {

    const mockAdapter = new MockAdapter(axios);
    before(() => {
        mockAdapter.onGet("/test").replyOnce<Response<TestHttpResp>>(200, {
            data: {
                items: [{message: "test"}],
                limit: 0,
                offset: 0,
                count: 1,
                hasMore: false,
                links: []
            },
            error: undefined
        });
        mockAdapter.onGet("/error").networkError();
    });

    it("should run a GET and return data", async () => {
        const ordsRunner = new OrdsRunner<TestHttpResp>("none");
        const resp = await ordsRunner.get("/test");
        expect(resp.data.items[0].message).to.equal("test");
    });

    it("should run a GET and return an error", async () => {
        const ordsRunner = new OrdsRunner<TestHttpResp>("none");
        const resp = await ordsRunner.get("/error");
        expect(resp.error).to.not.be.undefined;
        expect(resp.error?.isAxiosError).to.be.true;
        expect(resp.error?.message).to.equal("Network Error");
    });
});