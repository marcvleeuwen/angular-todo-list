import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.component';
import {NavModule} from '../../common/components/nav/nav.module';
import {ItemModule} from '../../common/components/item/item.module';

@NgModule({
  declarations: [
    HomePage
  ],
    imports: [
        BrowserModule,
        FormsModule,
        NavModule,
        ItemModule
    ],
  providers: [],
  bootstrap: []
})
export class HomePageModule {
}
