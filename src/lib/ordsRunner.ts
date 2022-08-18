import axios, {AxiosError, AxiosInstance} from "axios";

export type Response<T> = {
    data: Array<T>;
    error?: AxiosError;
}

export default class OrdsRunner<T> {
    runner: AxiosInstance;
    constructor(private baseUrl: string) {
        this.runner = axios.create({baseURL: baseUrl})
    }

    async get(action: string): Promise<Response<T>> {
        const resp = await this.runner.get(action);
        return resp.data;
    }


}