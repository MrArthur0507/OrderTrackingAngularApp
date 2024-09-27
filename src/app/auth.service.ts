import { Injectable } from '@angular/core';
import { AuthConfig, JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { map, Observable, of } from 'rxjs';

const authConfig: AuthConfig = {
  //issuer: 'http://bpenchev.info:5000',
  //clientId: 'angular',
  issuer: 'http://localhost:5000',
  clientId: 'angularLocal',
  redirectUri: window.location.origin,
  scope: 'openid profile',
  responseType: 'code',
  showDebugInformation: true,
  requestAccessToken: true,
  requireHttps: false,
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private oauthService: OAuthService) {
    this.configureOAuth();
  }

  private configureOAuth() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initCodeFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  isLoggedIn(): Observable<boolean> {
    return of(this.oauthService.hasValidAccessToken()).pipe(
      map(hasValidToken => !!hasValidToken)
    );
  }

  getAccessToken(): string {
    return this.oauthService.getAccessToken() || '';
  }
}