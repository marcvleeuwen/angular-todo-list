import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Login} from '../../../models/login.model';
import {SignUp} from '../../../models/sign-up.model';
import {OauthUtils} from '../../../utils/oauth.utils';

@Injectable()
export class OauthHttpClient {
  constructor(private httpClient: HttpClient) {
  }

  public login(username: string, password: string): Observable<{ token: string }> {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const body: Login = {
      username,
      password
    };

    const url: string = '/api/v1/auth/login';

    return this.httpClient.post<{ token: string }>(
      url,
      body,
      {
        headers
      }
    ).pipe(
      tap(res => OauthUtils.saveRawToken(res.token)
      ),
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }

  public signUp(username: string, email: string, password: string, password2: string, firstName?: string, lastName?: string): Observable<string> {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const body: SignUp = {
      username,
      email,
      password,
      password2,
      firstName,
      lastName
    };

    const url: string = '/api/v1/auth/signup';

    return this.httpClient.post<string>(
      url,
      body,
      {
        headers
      }
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }
}
