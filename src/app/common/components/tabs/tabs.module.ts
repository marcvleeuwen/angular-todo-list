import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {TabsComponent} from './tabs.component';

@NgModule({
  declarations: [
    TabsComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  exports: [
    TabsComponent
  ],
  bootstrap: []
})
export class TabsModule {
}
