import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CapturePage} from './capture.component';
import {NavModule} from '../../common/components/nav/nav.module';
import {SelectModule} from '../../common/components/select/select.module';

@NgModule({
  declarations: [
    CapturePage
  ],
    imports: [
        BrowserModule,
        FormsModule,
        NavModule,
        ReactiveFormsModule,
        SelectModule
    ],
  providers: [],
  bootstrap: []
})
export class CapturePageModule {
}
