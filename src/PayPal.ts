import { PayPalRequest } from "./PayPalRequest";
import { PayPalToken, WellKnownPayPalHosts } from './models';

const axios = require('axios').default;

export class PayPal {
    host: string;
    apiVersion = 'v1';

    constructor(private clientId: string, private clientSecret: string, private sandbox = true) {
        this.host = `${sandbox ? WellKnownPayPalHosts.SANDBOX : WellKnownPayPalHosts.LIVE}/${this.apiVersion}`
    }

    api(api: string) {
        return new PayPalRequest(this.host, this.clientId, this.clientSecret).url(api);
    }

    products(id?: string) {
        return this.api(this.getApiUrl('/catalogs/products', id));
    }

    plans(id?: string) {
        return this.api(this.getApiUrl('/billing/plans', id));
    }

    subscriptions(id?: string) {
        return this.api(this.getApiUrl('/billing/subscriptions', id));
    }

    private getApiUrl(api: string, optPath?: string) {
        return optPath ? `${api}/${optPath}` : api;
    }
}
