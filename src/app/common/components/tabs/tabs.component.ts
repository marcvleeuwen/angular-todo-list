import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tab} from '../../models/tab.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  @Input() tabs: Tab[];

  @Output() tabChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  public onTabChange(selectedTab: Tab): void {
    const prevTabIndex: number = this.tabs.findIndex(tab => !!tab.active);
    const nextTabIndex: number = this.tabs.findIndex(tab => tab.id === selectedTab.id);

    // set active tab - only 1 can be active
    this.tabs.filter(tab => !!tab.active).forEach(tab => tab.active = false);
    this.tabs.find(tab => tab.id === selectedTab.id).active = true;

    if (prevTabIndex !== nextTabIndex) {
      this.tabChange.emit(nextTabIndex);
    }
  }

}
