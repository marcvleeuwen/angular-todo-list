import {User} from '../models/user.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../../environments/environment';


export class OauthUtils {

  private static readonly JWT_HELPER: JwtHelperService = new JwtHelperService();

  public static saveRawToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  public static getLoggedInUser(): User {
    const token = OauthUtils.getRawToken();
    return token && this.JWT_HELPER.decodeToken(token);
  }

  public static isLoggedIn(): boolean {
    const token = OauthUtils.getRawToken();
    return !!token;
  }

  public static removeRawToken(): void {
    localStorage.removeItem('accessToken');
  }

  public static getRawToken(): any {
    return localStorage.getItem(
      'authToken'
    );
  }

  public static isAdmin(): boolean {
    return environment.adminRoles.includes(OauthUtils.getLoggedInUser().user_role);
  }

}
