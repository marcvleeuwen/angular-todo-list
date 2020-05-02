import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ModalComponent} from './modal.component';

@NgModule({
  declarations: [
    ModalComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  exports: [
    ModalComponent
  ],
  bootstrap: []
})
export class ModalModule {
}
