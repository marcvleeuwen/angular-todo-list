import {NgModule} from '@angular/core';
import {ListService} from './list-service.service';
import {ListServiceHttpClient} from './http/list-service.http.client';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  imports: [
    // Angular Modules
    HttpClientModule
  ],
  providers: [
    ListService,
    ListServiceHttpClient,
  ]
})
export class ListServiceModule {

}
