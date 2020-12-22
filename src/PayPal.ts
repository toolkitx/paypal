import {PayPalRequest} from "./PayPalRequest";
import {PayPalRestConf, PayPalRestMode, PayPalToken, WellKnownPayPalHosts} from './models';

const axios = require('axios').default;

export class PayPalRest {
    constructor(protected conf: PayPalRestConf) {
    }

    api(api: string) {
        return new PayPalRequest(this.conf, api);
    }

    protected getApiUrl(api: string, optPath?: string) {
        return optPath ? `${api}/${optPath}` : api;
    }
}

export class PayPal extends PayPalRest {

    constructor(protected conf: PayPalRestConf) {
        super(conf);
    }

    products(id?: string) {
        return this.api(this.getApiUrl('/catalogs/products', id));
    }

    plans(id?: string) {
        return new PayPalPlanRequest(this.conf, this.getApiUrl('/billing/plans', id))
    }

    subscriptions(id?: string) {
        return new PayPalSubscriptionRequest(this.conf, this.getApiUrl('/billing/subscriptions', id));
    }
}


export class PayPalPlanRequest extends PayPalRequest {

    constructor(protected conf: PayPalRestConf, protected url: string) {
        super(conf, url);
    }

    activate() {
        return this.appendUrl('/activate');
    }

    deactivate() {
        return this.appendUrl('/deactivate');
    }

    updatePricingSchemes() {
        return this.appendUrl('/update-pricing-schemes');
    }
}


export class PayPalSubscriptionRequest extends PayPalRequest {

    constructor(protected conf: PayPalRestConf, protected url: string) {
        super(conf, url);
    }

    activate() {
        return this.appendUrl('/activate');
    }

    cancel() {
        return this.appendUrl('/cancel');
    }

    suspend() {
        return this.appendUrl('/suspend');
    }

    // You can upgrade or downgrade a subscription by changing the plan and/or quantity of the subscription.
    // Changing from one plan to another is allowed only across plans within the same product.
    revise() {
        return this.appendUrl('/revise');
    }
}
