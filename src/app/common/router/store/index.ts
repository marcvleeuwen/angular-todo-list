import * as fromRouter from '@ngrx/router-store';
import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {RouterStateUrl} from './router.model';
/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducerMap accidentally mutates the state.
 */
import {storeFreeze} from 'ngrx-store-freeze';


export interface RouterState {
    router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const routerReducer: ActionReducerMap<RouterState> = {
    router: fromRouter.routerReducer
};

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducerMap, provide an array of meta-reducerMap
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<RouterState>[] = [storeFreeze];
