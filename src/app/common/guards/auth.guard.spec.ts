import {OauthService} from '@pace-service/oauth/oauth.service';
import {Router} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {of} from 'rxjs';


describe('AuthGuard', () => {
    let mockOauthService: any;

    let mockRouter: any;

    let authGuard: AuthGuard;

    beforeEach(() => {
        mockOauthService = jest.fn<OauthService>(() => ({
            isAuthenticated: jest.fn(),
            logout: jest.fn()
        }));
        mockRouter = jest.fn<Router>(() => ({
            navigate: jest.fn(() => of(undefined))
        }));

        authGuard = new AuthGuard(
            mockOauthService,
            mockRouter
        );
    });

    it('should return true', () => {
        const expected: boolean = true;

        mockOauthService.isAuthenticated = jest.fn(() => expected);
        const result: any = authGuard.canActivate(undefined, undefined);

        expect(result).toBe(expected);
    });

    it('should redirect', () => {
        const expected: boolean = false;

        mockOauthService.isAuthenticated = jest.fn(() => expected);
        mockOauthService.logout = jest.fn(() => {/**/
        });

        const result: any = authGuard.canActivate(undefined, undefined);
        expect(result).toBe(expected);
        expect(mockOauthService.logout).toBeCalled();
    });
});
