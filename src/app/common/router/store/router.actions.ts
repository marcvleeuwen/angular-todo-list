import {Action} from '@ngrx/store';
import {RouterStateUrl} from './router.model';

export enum RouterActions {
    GO = '[Router] Go',
    BACK = '[Router] Back',
    FORWARD = '[Router] Forward'
}


export class Go implements Action {
    public readonly type: string = RouterActions.GO;

    constructor(public payload: RouterStateUrl) {
    }
}

export class Back implements Action {
    public readonly type: string = RouterActions.BACK;
}

export class Forward implements Action {
    public readonly type: string = RouterActions.FORWARD;
}

export type RouterActionTypes
    = Go
    | Back
    | Forward;
