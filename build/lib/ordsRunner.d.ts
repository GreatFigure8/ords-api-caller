import { AxiosInstance } from "axios";
import { IEntity } from "./interfaces/IEntity";
import { IActionParams } from "./interfaces/IActionParams";
import { IResponse } from "./IResponse";
/**
 * This is the main class in the library.  It enables calling
 * REST methods on a ORDS enabled endpoint
 */
export default class OrdsRunner<T extends IEntity> {
    private readonly baseUrl;
    /**
     * The axios instance used to run the requests
     * @type {AxiosInstance}
     */
    runner: AxiosInstance;
    /**
     * @constructor
     * @param {string} baseUrl The base url for the runner.  This is the endpoint of the ORDS enabled database
     */
    constructor(baseUrl: string);
    /**
     * Creates a blank response in the event we need one
     * @returns {IResponse{T}}
     */
    static makeResponse<T extends IEntity>(): IResponse<T>;
    private static mapErrorToAxiosError;
    /**
     * The main get method for all ORDS entities.  Supports paging by using the
     * offset and limit params
     * @param {string} action
     * @returns {Promise<Response{T}}
     */
    get({ action }: IActionParams<T>): Promise<IResponse<T>>;
    /**
     * This method is the main CUD method for all ORDS entities.  It posts when
     * there is no entity to update, it puts when there is an entity to update,
     * and it deletes if there is an id and the params indicate a delete
     * operation.
     * @returns {Promise<Response{{T}}
     * @param {IActionParams} params the action and the body
     */
    upsert(params: IActionParams<T>): Promise<IResponse<T>>;
    /**
     * Runs a post. Usually used to add a new record
     * @param {string} action the url of the action
     * @param {{T} | undefined} body the body of the entity
     * @returns {Promise{IResponse{T}}} The response of the request
     */
    post({ action, body }: IActionParams<T>): Promise<IResponse<T>>;
    /**
     * Runs a delete action to remove an entity
     * @param {string} action the url of the action
     * @param {{T} | undefined} body the entity
     * @returns {Promise{IResponse{T}}}
     */
    delete({ action, body }: IActionParams<T>): Promise<IResponse<T>>;
    /**
     * runs a put request to update an entity
     * @param {string} action
     * @param {{T} | undefined} body
     * @returns {Promise{IResponse{T}}}
     */
    put({ action, body }: IActionParams<T>): Promise<IResponse<T>>;
}
