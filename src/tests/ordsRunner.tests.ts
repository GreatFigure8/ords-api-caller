import {describe} from "mocha";
import MockAdapter from "axios-mock-adapter";
import axios, {AxiosError, AxiosInstance} from "axios";
import OrdsRunner, {Response} from "../lib/ordsRunner";
import {expect} from "chai";

type TestHttpResp = {
    message: string;
}

describe("ords runner tests", ()=> {

    const mockAdapter = new MockAdapter(axios);
    before(()=> {
        mockAdapter.onGet("/test").replyOnce<Response<TestHttpResp>>(200, {data: [{message: "test"}] , error: undefined})
    })


    it("should run a GET and return data", async ()=> {
        const ordsRunner = new OrdsRunner<TestHttpResp>("none");
        const resp = await ordsRunner.get("/test");
        expect(resp.data[0].message).to.equal("test");
    })
})