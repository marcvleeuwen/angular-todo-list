import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ItemComponent} from './item.component';
import {LongPressDirective} from '../../directives/long-press.directive';

@NgModule({
  declarations: [
    ItemComponent,
    LongPressDirective
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
    exports: [
        ItemComponent,
        LongPressDirective
    ],
  bootstrap: []
})
export class ItemModule {
}
