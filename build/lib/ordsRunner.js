"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const axios_1 = __importStar(require("axios"));
const lodash_1 = __importDefault(require("lodash"));
/**
 * This is the main class in the library.  It enables calling
 * REST methods on a ORDS enabled endpoint
 */
class OrdsRunner {
    /**
     * @constructor
     * @param {string} baseUrl The base url for the runner.  This is the endpoint of the ORDS enabled database
     */
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.runner = axios_1.default.create({ baseURL: baseUrl });
    }
    /**
     * Creates a blank response in the event we need one
     * @returns {IResponse{T}}
     */
    static makeResponse() {
        return {
            ordsResponse: {
                offset: 0,
                links: [],
                limit: 0,
                count: 0,
                hasMore: false,
                items: []
            },
            error: undefined
        };
    }
    static mapErrorToAxiosError(err) {
        const error = new axios_1.AxiosError();
        error.message = err.message;
        error.stack = err.stack;
        error.status = "BadRequest";
        error.code = "400";
        return error;
    }
    /**
     * The main get method for all ORDS entities.  Supports paging by using the
     * offset and limit params
     * @param {string} action
     * @returns {Promise<Response{T}}
     */
    get({ action }) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = OrdsRunner.makeResponse();
            try {
                const axiosResp = yield axios_1.default.get(action);
                resp.ordsResponse = axiosResp.data;
                return resp;
            }
            catch (e) {
                resp.error = e;
                return resp;
            }
        });
    }
    /**
     * This method is the main CUD method for all ORDS entities.  It posts when
     * there is no entity to update, it puts when there is an entity to update,
     * and it deletes if there is an id and the params indicate a delete
     * operation.
     * @returns {Promise<Response{{T}}
     * @param {IActionParams} params the action and the body
     */
    upsert(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = Object.assign({}, params);
                if (lodash_1.default.isUndefined(body))
                    throw new Error("To put, post or delete an item, there must be a body");
                else if ((params.delete === true) && body.id <= 0)
                    throw new Error(`To delete an item, there must be a valid id.  The id you passed was ${body.id}`);
                else {
                    if (params.delete === true)
                        return yield this.delete(params);
                    return body.id > 0 ? yield this.put(params) : yield this.post(params);
                }
            }
            catch (e) {
                const resp = OrdsRunner.makeResponse();
                resp.error = OrdsRunner.mapErrorToAxiosError(e);
                return resp;
            }
        });
    }
    /**
     * Runs a post. Usually used to add a new record
     * @param {string} action the url of the action
     * @param {{T} | undefined} body the body of the entity
     * @returns {Promise{IResponse{T}}} The response of the request
     */
    post({ action, body }) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = OrdsRunner.makeResponse();
            try {
                const axiosResp = yield axios_1.default.post(action, body);
                resp.ordsResponse.items.push(axiosResp.data);
                return resp;
            }
            catch (e) {
                resp.error = e;
                return resp;
            }
        });
    }
    /**
     * Runs a delete action to remove an entity
     * @param {string} action the url of the action
     * @param {{T} | undefined} body the entity
     * @returns {Promise{IResponse{T}}}
     */
    delete({ action, body }) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = OrdsRunner.makeResponse();
            try {
                if (lodash_1.default.isUndefined(body))
                    throw new Error("To delete an item, there must be a body");
                const axiosResp = yield axios_1.default.delete(`${action}/${body.id}`);
                resp.ordsResponse.items.push(axiosResp.data);
                return resp;
            }
            catch (e) {
                resp.error = e;
                return resp;
            }
        });
    }
    /**
     * runs a put request to update an entity
     * @param {string} action
     * @param {{T} | undefined} body
     * @returns {Promise{IResponse{T}}}
     */
    put({ action, body }) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = OrdsRunner.makeResponse();
            try {
                const axiosResp = yield axios_1.default.put(action, body);
                resp.ordsResponse.items.push(axiosResp.data);
                return resp;
            }
            catch (e) {
                resp.error = e;
                return resp;
            }
        });
    }
}
exports.default = OrdsRunner;
