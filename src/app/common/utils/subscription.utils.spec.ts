import {SubscriptionUtils} from './subscription.utils';
import {Subscription} from 'rxjs';

describe('SubscriptionUtils', () => {

    describe('if Subscription is defined', () => {
        let sub: Subscription;
        beforeEach(() => {
            sub = new Subscription();
        });

        it('reset function should call unsubscribe', () => {
            sub.unsubscribe = jest.fn();
            SubscriptionUtils.reset(sub);
            expect(sub.unsubscribe).toHaveBeenCalledTimes(1);
        });

        it('reset function should return undefined subscription', () => {
            const sub2: Subscription = SubscriptionUtils.reset(sub);
            expect(sub2).toBeUndefined();
        });
    });

    describe('if Subscription is undefined', () => {
        const sub: Subscription = undefined;

        it('reset function should return undefined subscription', () => {
            const sub2: Subscription = SubscriptionUtils.reset(sub);
            expect(sub2).toBeUndefined();
        });
    });
});

