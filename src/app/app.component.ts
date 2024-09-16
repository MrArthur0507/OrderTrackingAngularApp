import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { OAuthService, AuthConfig, provideOAuthClient } from 'angular-oauth2-oidc';

const authConfig: AuthConfig = {
  issuer: 'http://localhost:5000',
  clientId: 'angular',
  redirectUri: window.location.origin,
  scope: 'openid profile',
  responseType: 'code',
  showDebugInformation: true,
  sessionChecksEnabled: true,
};



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  constructor(private oauthService: OAuthService) {}
  ngOnInit(): void {
    this.configureOAuth();
  }
  title = 'order-tracking-angular-app';

  configureOAuth() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    if (!this.oauthService.hasValidAccessToken()) {
      this.oauthService.initCodeFlow();
    }
  }
  login() {
    this.oauthService.initCodeFlow(); 
  }

  logout() {
    this.oauthService.logOut();
  }

  isLoggedIn() {
    return this.oauthService.hasValidAccessToken();
  }



}
