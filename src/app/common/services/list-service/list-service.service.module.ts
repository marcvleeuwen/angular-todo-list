import {NgModule} from '@angular/core';
import {OauthService} from './list-service.service';
import {OauthHttpClient} from './http/list-service.http.client';
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
