import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {FormsModule} from '@angular/forms';

import {AuthPageModule} from './pages/auth/auth.page.module';
import {HomePageModule} from './pages/home/home.page.module';
import {ListPageModule} from './pages/list/list.page.module';
import {SettingsPageModule} from './pages/settings/settings.page.module';
import {CapturePageModule} from './pages/capture/capture.page.module';
import {SplashScreenPageModule} from './pages/splash-screen/splash-screen.page.module';
import {OauthServiceModule} from './common/services/oauth/oauth.service.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {metaReducers, routerReducer} from './common/router/store';
import {CustomRouterStateSerializer} from './common/router/store/router.util';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {ListServiceModule} from './common/services/list-service/list-service.service.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtHttpInterceptor} from './common/interceptors/jwt.interceptor';
import {ModalModule} from './common/components/modal/modal.module';
import {AuthGuard} from './common/guards/auth.guard';
import {SelectModule} from './common/components/select/select.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    FormsModule,
    // Ngrx
    StoreModule.forRoot(routerReducer, {metaReducers}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      serializer: CustomRouterStateSerializer
    }),
    //  pages
    CapturePageModule,
    ListPageModule,
    SettingsPageModule,
    HomePageModule,
    AuthPageModule,
    SplashScreenPageModule,
    // components
    ModalModule,
    SelectModule,
    // services
    OauthServiceModule,
    ListServiceModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtHttpInterceptor,
    multi: true
  }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
