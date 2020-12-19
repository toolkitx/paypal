import { account } from './config';
import { PayPal, PayPalResponse } from '../src/index';

const assert = require('assert');

const payPal = new PayPal(account.clientId, account.clientSecret);
const testProductId = 'PROD-57E56685GE775083V';

describe('PayPal product', () => {
    it('should get list', async () => {
        const paging: PayPalResponse = await payPal
            .products()
            .get();
        assert(paging);
        assert(paging.links);
    });
    it('should get by id', async () => {
        const resource = await payPal.products(testProductId).get();
        assert(resource.links.length > 0);
        assert.equal(testProductId, resource.id);
    });
});

describe('PayPal plans', () => {
    it('should get list', async () => {
        const paging: PayPalResponse = await payPal
            .plans()
            .get();
        assert(paging);
    });
    it('should list plans by product id', async () => {
        const res = await payPal.plans().query({ product_id: testProductId }).get();
        assert(res);
    });

    it('should get inactive plan by id', async () => {
        const id = 'P-8E481396N58545033LZACYLI';
        const resource = await payPal.plans(id).get();
        assert.equal(id, resource.id);
        assert.equal('INACTIVE', resource.status);
    });

    it('should get active plan by id', async () => {
        const id = 'P-1VY42609UU166425RL6I5MUQ';
        const resource = await payPal.plans(id).get();
        assert.equal(id, resource.id);
        assert.equal('ACTIVE', resource.status);
    });
});


describe('PayPal subscriptions', () => {
    let subscriptionId: string;
    it('should create subscription', async () => {
        const subscription = {
            "plan_id": "P-1VY42609UU166425RL6I5MUQ",
            "start_time": "2020-12-20T06:00:00Z",
            "subscriber": {
                "name": {
                    "given_name": "hwangzhiming",
                    "surname": "buyer"
                },
                "email_address": "hwangzhiming-buyer@gmail.com"
            },
            "application_context": {
                "brand_name": "Test",
                "locale": "en-US",
                "shipping_preference": "",
                "user_action": "SUBSCRIBE_NOW",
                "payment_method": {
                    "payer_selected": "PAYPAL",
                    "payee_preferred": "IMMEDIATE_PAYMENT_REQUIRED"
                },
                "return_url": "https://example.com/returnUrl",
                "cancel_url": "https://example.com/cancelUrl"
            }
        };
        const res: PayPalResponse = await payPal
            .subscriptions().post(subscription)
        subscriptionId = res.id;
        assert(res);
    });


    it('should get by id', async () => {
        const resource = await payPal.subscriptions(subscriptionId).get();
        assert.equal(subscriptionId, resource.id);
    });

    it('should active by id', async () => {
        const resource = await payPal.subscriptions(`${subscriptionId}/active`).post({
            "reason": "Not satisfied with the service"
        });
        assert(resource);
    });

    it('should cancel by id', async () => {
        const resource = await payPal.subscriptions(`${subscriptionId}/cancel`).post({
            "reason": "Not satisfied with the service"
        });
        assert(resource);
    });
});
