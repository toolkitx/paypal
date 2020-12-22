import {PayPal, PayPalResponse} from '../src/index';
import {PayPalApiConf} from '../src/models';

const assert = require('assert');

const payPal = new PayPal(new PayPalApiConf(process.env.CLIENT_ID, process.env.CLIENT_SECRET));
const testProductId = 'PROD-57E56685GE775083V';
const testPlanId = 'P-1VY42609UU166425RL6I5MUQ';
const testSubscriptionId = 'I-FJBN6BDTBL67';

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
        assert(testProductId, resource.id);
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
        const res = await payPal.plans().query({product_id: testProductId}).get();
        assert(res);
    });

    it('should get plan by id', async () => {
        const resource = await payPal.plans(testPlanId).get();
        assert(testPlanId, resource.id);
    });

    it('should deactivate plan by id', async () => {
        await payPal.plans(testPlanId).deactivate().post();
        const resource = await payPal.plans(testPlanId).get();
        assert('INACTIVE', resource.status);
    });

    it('should activate plan by id', async () => {
        await payPal.plans(testPlanId).activate().post();
        const resource = await payPal.plans(testPlanId).get();
        assert('ACTIVE', resource.status);
    });
});


xdescribe('PayPal subscriptions', () => {
    let subscriptionId: string;
    xit('should create subscription', async () => {
        const subscription = {
            "plan_id": testPlanId,
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
        const resource = await payPal.subscriptions(testSubscriptionId).get();
        assert(testSubscriptionId, resource.id);
    });

    it('should suspend by id', async () => {
        await payPal.subscriptions(testSubscriptionId).suspend().post({
            "reason": "suspend test"
        });
        const resource = await payPal.subscriptions(testSubscriptionId).get();
        assert('SUSPENDED', resource.status);
    });

    it('should activate by id', async () => {
        await payPal.subscriptions(testSubscriptionId).activate().post({
            "reason": "activate test"
        });
        const resource = await payPal.subscriptions(testSubscriptionId).get();
        assert('ACTIVE', resource.status);
    });

    it('should cancel by id', async () => {
        await payPal.subscriptions(testSubscriptionId).cancel().post({
            "reason": "cancel test"
        });
        const resource = await payPal.subscriptions(testSubscriptionId).get();
        assert('CANCELLED', resource.status);
    });
});
