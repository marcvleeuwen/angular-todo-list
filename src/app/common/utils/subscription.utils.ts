import {Subscription} from 'rxjs';

export class SubscriptionUtils {

    public static reset(subscription: Subscription): Subscription {
        if (subscription) {
            subscription.unsubscribe();
            return undefined;
        }
        return subscription;
    }
}
