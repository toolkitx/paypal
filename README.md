# @toolkitx/paypal

[![npm version](https://img.shields.io/npm/v/@toolkitx/paypal.svg?style=flat-square)](https://www.npmjs.com/package/@toolkitx/paypal)
[![npm downloads](https://img.shields.io/npm/dm/@toolkitx/paypal.svg?style=flat-square)](https://www.npmjs.com/package/@toolkitx/paypal)

## Installing
Using npm

```
npm install @toolkitx/paypal
```

## Example
Get instance
```ts
import {Paypal, PaypalPageResponse} from '@toolkitx/paypal';
const paypal = new Paypal('clientId', 'clientSecret', true);
```
Chain
```ts
paypal
.api('URL')
.head(key, value)
.query({key: 'value'})
.get()
// or .post(payload)
```

* Get products

```ts
const products: PaypalPageResponse = await paypal.products().get();
```

* Get single product

```ts
const product = await paypal.products('Product id').get();
```

* Query products

```ts
const v = await paypal.products().query({param1: 'EXAMPLE'}).get();
```

* Plan actions

Support `activate/deactivate/updatePricingSchemes` plans

```ts
await payPal.plans(testPlanId).activate().post();
```

* Subscription actions

Support `activate/cancel/suspend` subscription

```ts
await payPal.subscriptions('id').suspend().post({
    "reason": "suspend reason"
});
```

## Custom Request

```ts
await paypal.api('RELATE_URL').get();
await paypal.api('RELATE_URL').post(payload);
```

