import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CapturePage} from './capture.component';
import {NavModule} from '../../common/components/nav/nav.module';

@NgModule({
  declarations: [
    CapturePage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NavModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: []
})
export class CapturePageModule {
}
