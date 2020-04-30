import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavConfig} from '../../models/nav-config.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor() {
  }

  @Input() config: NavConfig;
  @Output() buttonClick: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
  }

  onNavigationClick(button: string): void {
    this.buttonClick.emit(button);
  }

  onActionButtonClick(button: string): void {
    this.buttonClick.emit(button);
  }

}


