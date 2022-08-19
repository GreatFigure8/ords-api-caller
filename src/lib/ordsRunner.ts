import axios, {AxiosError, AxiosInstance} from "axios";

export type OrdsResponse<T> = {
    items: Array<T>;
    hasMore: boolean,
    limit: number,
    offset: number,
    count: number,
    links: Array<OrdsLink>
}
export type OrdsLink = {
    rel: string;
    link: string;
}
export type Response<T> = {
    data: OrdsResponse<T>;
    error?: AxiosError;
}

export default class OrdsRunner<T> {
    runner: AxiosInstance;
    constructor(private baseUrl: string) {
        this.runner = axios.create({baseURL: baseUrl});
    }
    async get(action: string): Promise<Response<T>> {
        const resp: Response<T> = this.makeResponse();
        try {
            const axiosResp = await axios.get(action);
            resp.data = axiosResp.data;
            return resp;
        } catch (e) {
            resp.error = e as AxiosError;
            return resp;
        }
    }
    private makeResponse(): Response<T> {
        return {
            data: {
                offset: 0,
                links: [],
                limit: 0,
                count: 0,
                hasMore: false,
                items: []
            }, error: undefined
        }
    }
}