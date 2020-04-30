import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthPage} from './auth.component';
import {NavModule} from '../../common/components/nav/nav.module';
import {TabsModule} from '../../common/components/tabs/tabs.module';

@NgModule({
  declarations: [
    AuthPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NavModule,
    TabsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: []
})
export class AuthPageModule {
}
