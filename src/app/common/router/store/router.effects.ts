import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Go, RouterActions} from './router.actions';
import {map, tap} from 'rxjs/operators';
import {Action} from '@ngrx/store';
import {RouterStateUrl} from './router.model';
import {Observable} from 'rxjs';

@Injectable()
export class RouterEffects {
    @Effect({dispatch: false})
    public navigate$: Observable<RouterStateUrl> = this.actions$
        .pipe(
            ofType(RouterActions.GO),
            map((action: Go) => (<Go>action).payload),
            tap((nav: RouterStateUrl) =>
                this.router.navigate(
                    [nav.url],
                    {
                        queryParams: nav.queryParams,
                        ...nav.params
                    }
                )
            )
        );

    @Effect({dispatch: false})
    public navigateBack$: Observable<Action> = this.actions$
        .pipe(
            ofType(RouterActions.BACK),
            tap(() =>
                this.location.back()
            )
        );

    @Effect({dispatch: false})
    public navigateForward$: Observable<Action> = this.actions$
        .pipe(
            ofType(RouterActions.FORWARD),
            tap(() =>
                this.location.forward()
            )
        );

    constructor(private actions$: Actions,
                private router: Router,
                private location: Location) {
    }
}
