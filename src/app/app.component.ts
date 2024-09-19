import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { OAuthService, AuthConfig, provideOAuthClient, JwksValidationHandler } from 'angular-oauth2-oidc';
import { CommonModule } from '@angular/common';
import { map, Observable, of } from 'rxjs';
import { CatalogItemsComponent } from './catalog-items/catalog-items.component';
const authConfig: AuthConfig = {
  issuer: 'http://localhost:5000',
  clientId: 'angular',
  redirectUri: window.location.origin,
  scope: 'openid profile',
  responseType: 'code',
  showDebugInformation: true,
  requestAccessToken: true
};



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CatalogItemsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  constructor(private oauthService: OAuthService) {
    this.initAuth();
  }
  ngOnInit(): void {
  }
  title = 'order-tracking-angular-app';

  initAuth() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
  isLoggedIn(): Observable<boolean> {
    return of(this.oauthService.hasValidAccessToken()).pipe(
      map(hasValidToken => !!hasValidToken)
    );
  }
  login() {
    this.oauthService.initCodeFlow();
  }

  logout() {
    this.oauthService.logOut();
  }


  getAccessToken(): boolean {
    const accessToken = this.oauthService.getAccessToken();
    if (accessToken != null) {
      return true;
    }
    return false;
  }


}
