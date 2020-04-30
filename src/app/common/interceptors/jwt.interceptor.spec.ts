import {JwtHttpInterceptor} from './jwt.interceptor';
import {HttpRequest} from '@angular/common/http';
import {of} from 'rxjs';
import {OauthService} from '@pace-service/oauth/oauth.service';


describe('JwtHttpInterceptor', () => {
    let jwtHttpInterceptor: JwtHttpInterceptor;

    const mockOauthService: OauthService = {
        // token: undefined,
        // principal: undefined,
        // store: undefined,
        login: jest.fn(),
        logout: jest.fn(),
        getToken: jest.fn(),
        getOauthState: jest.fn(),
        getOauthResponse: jest.fn(),
        isAuthenticated: jest.fn(),
        hasRole: jest.fn(),
        getError: jest.fn(),
        getRefreshToken: jest.fn(),
        getLoading: jest.fn(),
        getPrincipal: jest.fn()
    };

    beforeEach(() => {
        jwtHttpInterceptor = new JwtHttpInterceptor(mockOauthService);
    });

    it('should set token', () => {
        const request: HttpRequest<any> = new HttpRequest('GET', 'http://test.com');
        const handler: any = {
            handle: jest.fn(() => of(undefined))
        };

        mockOauthService.getToken = jest.fn(() => 'token');

        jwtHttpInterceptor.intercept(request, handler);
        expect(handler.handle).toBeCalled();
    });

    it('should not set token', () => {
        const request: HttpRequest<any> = new HttpRequest('GET', 'http://test.com');
        const handler: any = {
            handle: jest.fn(() => of(undefined))
        };
        mockOauthService.getToken = jest.fn(() => undefined);

        jwtHttpInterceptor.intercept(request, handler);
        expect(handler.handle).toBeCalled();
    });
});
