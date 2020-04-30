import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NavComponent} from './nav.component';

@NgModule({
  declarations: [
    NavComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  exports: [
    NavComponent
  ],
  bootstrap: []
})
export class NavModule {
}
