import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ListPage} from './list.component';
import {ItemModule} from '../../common/components/item/item.module';
import {NavModule} from '../../common/components/nav/nav.module';
import {TabsModule} from '../../common/components/tabs/tabs.module';
import {SelectModule} from '../../common/components/select/select.module';

@NgModule({
  declarations: [
    ListPage
  ],
    imports: [
        BrowserModule,
        FormsModule,
        ItemModule,
        NavModule,
        TabsModule,
        SelectModule
    ],
  providers: [],
  bootstrap: []
})
export class ListPageModule {
}
