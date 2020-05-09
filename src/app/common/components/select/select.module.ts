import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {SelectComponent} from './select.component';

@NgModule({
  declarations: [
    SelectComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  exports: [
    SelectComponent
  ],
  bootstrap: []
})
export class SelectModule {
}
