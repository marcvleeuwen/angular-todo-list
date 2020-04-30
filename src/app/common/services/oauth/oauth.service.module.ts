import {NgModule} from '@angular/core';
import {OauthService} from './oauth.service';
import {OauthHttpClient} from './http/oauth.http.client';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  imports: [
    // Angular Modules
    HttpClientModule
  ],
  providers: [
    OauthService,
    OauthHttpClient
  ]
})
export class OauthServiceModule {

}
