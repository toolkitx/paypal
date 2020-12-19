import {AxiosRequestConfig} from "axios";

const axios = require('axios').default;

export class PayPalRequest {
    requestConfig: AxiosRequestConfig = {};

    constructor(host: string, clientId: string, clientSecret: string) {
        this.requestConfig.baseURL = host;
        this.requestConfig.auth = {
            username: clientId,
            password: clientSecret
        }
    }

    url(url: string) {
        this.requestConfig.url = url;
        return this;
    }

    query(queryParams: { [key: string]: string | number | boolean }) {
        this.requestConfig.params = queryParams;
        return this;
    }

    header(key: string, value: string | number | boolean) {
        if (!this.requestConfig.headers) {
            this.requestConfig.headers = {};
        }
        this.requestConfig.headers[key] = value;
        return this;
    }

    get() {
        this.requestConfig.method = 'GET';
        return this.send();
    }

    delete() {
        this.requestConfig.method = 'DELETE';
        return this.send();
    }

    post(body: any) {
        this.requestConfig.method = 'POST';
        this.requestConfig.data = body;
        return this.send();
    }

    private send() {
        return new Promise<any>(async (resolve, reject) => {
            axios(this.requestConfig).then(({ data }) => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }
}
