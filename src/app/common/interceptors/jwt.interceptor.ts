import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OauthUtils} from '../utils/oauth.utils';

@Injectable()
export class JwtHttpInterceptor implements HttpInterceptor {
  private static readonly EXCLUDED_PATHS: string[] = [
    '/api/config'
  ];

  constructor() {
  }

  // tslint:disable-next-line:no-any
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // tslint:disable-next-line:no-any
    let clone: HttpRequest<any> = request;
    const token: string = OauthUtils.getRawToken();
    if (token
      && JwtHttpInterceptor.EXCLUDED_PATHS.indexOf(request.url) === -1) {
      clone = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(clone);
  }
}
