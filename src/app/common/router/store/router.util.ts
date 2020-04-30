import {RouterStateUrl} from './router.model';
import {ActivatedRouteSnapshot, Params, RouterStateSnapshot} from '@angular/router';
import {RouterStateSerializer} from '@ngrx/router-store';

/**
 * The RouterStateSerializer takes the current RouterStateSnapshot
 * and returns any pertinent information needed. The snapshot contains
 * all information about the state of the router at the given point in time.
 * The entire snapshot is complex and not always needed. In this case, you only
 * need the URL and query parameters from the snapshot in the store. Other items could be
 * returned such as route parameters and static route data.
 */
export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateUrl> {
    public serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let route: ActivatedRouteSnapshot = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        const url: string = routerState.url;
        const params: Params = route.params;
        const queryParams: Params = route.queryParams;

        // Only return an object including the URL, params and query params
        // instead of the entire snapshot
        return <RouterStateUrl>{url, params, queryParams};
    }
}
