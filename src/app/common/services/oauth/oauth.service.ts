import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {OauthHttpClient} from './http/oauth.http.client';
import {OauthUtils} from '../../utils/oauth.utils';

@Injectable()
export class OauthService {

  constructor(private readonly httpClient: OauthHttpClient) {
  }

  public login(username: string, password: string): Observable<{ token: string }> {
    return this.httpClient.login(username, password);
  }

  public signUp(username: string,
                email: string,
                password: string,
                password2: string,
                firstName?: string,
                lastName?: string): Observable<string> {
    return this.httpClient.signUp(username, email, password, password2, firstName, lastName);
  }

  public passwordReset(username: string, email: string, password: string, password2: string): Observable<string> {
    return this.httpClient.passwordReset(username, email, password, password2);
  }

  public logout(): void {
    OauthUtils.removeRawToken();
  }
}
