import {AxiosRequestConfig} from "axios";
import {PayPalEnvironment} from './models';

const axios = require('axios').default;

export class PayPalRequest {
    requestConfig: AxiosRequestConfig = {};

    constructor(protected conf: PayPalEnvironment, protected url: string) {
        this.requestConfig.baseURL = conf.host;
        this.requestConfig.url = url;
        this.requestConfig.auth = {
            username: conf.clientId,
            password: conf.clientSecret
        }
    }

    version(ver: string) {
        this.conf.version = ver;
    }

    protected appendUrl(path: string) {
        this.requestConfig.url = `${this.requestConfig.url}${path}`;
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

    post(body?: any) {
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
