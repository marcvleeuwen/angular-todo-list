import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title: string;
  @Input() positiveButtonText: string;
  @Input() negativeButtonText: string;
  @Input() modalId: string;

  @Output() positiveButtonClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() negativeButtonClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() dismissModal: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }


  onPositiveButtonClick(): void {
    this.positiveButtonClick.emit(true);
  }

  onNegativeButtonClick(): void {
    this.negativeButtonClick.emit(true);
  }

  onDismissModal(): void {
    this.dismissModal.emit(true);
  }

}
