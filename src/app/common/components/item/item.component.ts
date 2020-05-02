import {Item} from '../../models/item.model';

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() item: Item;
  @Output() itemLongPressed: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() itemStatusChanged: EventEmitter<Item> = new EventEmitter<Item>();

  constructor() {
  }

  ngOnInit(): void {
  }

  public onCheckboxLongPress(): void {
    if (this.item.status === 'error') {
      this.updateItemStatus(undefined);
    } else {
      this.updateItemStatus('error');
    }
  }

  public onCheckboxClick() {
    if (!this.item.status) {
      this.updateItemStatus('done');
    } else {
      this.updateItemStatus(undefined);
    }
  }

  public onItemLongPress(item: Item): void {
    this.itemLongPressed.emit(item);
  }

  private updateItemStatus(status: string) {
    this.item.status = status;
    this.itemStatusChanged.emit(this.item);
  }

}
