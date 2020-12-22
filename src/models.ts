export const WellKnownPayPalHosts = {
    LIVE: 'https://api.paypal.com',
    SANDBOX: 'https://api.sandbox.paypal.com'
}

export interface PayPalResponseLink {
    href: string;
    rel: string;
    method: string;
}

export interface PayPalResponse {
    links: PayPalResponseLink[];

    [key: string]: any;
}

export interface PayPalToken {
    scope: string;
    access_token: string;
    token_type: string;
    app_id: string;
    expires_in: string;
}

export type PayPalRestMode = 'Sandbox' | 'Live';

export class PayPalRestConf {
    constructor(public clientId: string, public clientSecret: string, public mode: PayPalRestMode = 'Sandbox', public version: string = 'v1') {
    }

    get host() {
        return `${this.mode.toLowerCase() === 'sandbox' ? WellKnownPayPalHosts.SANDBOX : WellKnownPayPalHosts.LIVE}/${this.version.toLowerCase()}`;
    }
}
