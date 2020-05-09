import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnChanges {

  @Input() selectOptions: OptionModel[] = [
    {
      id: 1,
      title: '',
      description: 'This is a blank category'
    },
    {
      id: 2,
      title: 'Fruit/Veg',
      description: 'Fresh produce'
    },
    {
      id: 3,
      title: 'Dairy',
      description: 'Dairy products'
    },
    {
      id: 4,
      title: 'Meat/Poultry',
      description: 'Fresh meat and poultry products'
    },
    {
      id: 5,
      title: 'Drinks',
      description: ''
    },
    {
      id: 6,
      title: 'Dry/Tinned',
      description: 'Preserved foods'
    },
    {
      id: 7,
      title: 'Frozen',
      description: 'Frozen foods'
    },
    {
      id: 8,
      title: 'Condiments',
      description: ''
    },
    {
      id: 9,
      title: 'Cereal',
      description: ''
    },
    {
      id: 10,
      title: 'Toiletries',
      description: ''
    },
    {
      id: 11,
      title: 'Detergents',
      description: 'Cleaning products'
    },
    {
      id: 12,
      title: 'Other',
      description: 'Miscellaneous item'
    },
    {
      id: 13,
      title: 'Pharmacy',
      description: 'Medication and health related items'
    }
  ];
  @Output() selectedOption: EventEmitter<any> = new EventEmitter<any>();

  public selectItems: SelectModel;
  public selectOpen: boolean = false;

  public ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes && changes.selectOptions) {
      this.selectItems = {options: changes.selectOptions.currentValue, selected: undefined};
    }
  }

  public onSelectClick(): void {
    this.selectOpen = !this.selectOpen;
  }

  public onOptionClick(option: OptionModel): void {
    this.selectItems.selected = option;
    this.selectItems.options.forEach(item => {
      if (option.id === item.id) {
        item.selected = true;
      } else {
        item.selected = undefined;
      }
    });
    this.selectedOption.emit(option.value || option.id || undefined);
    this.selectOpen = false;
  }

  // ngOnChanges(changes: SimpleChanges): void {
  // }

}

export interface SelectModel {
  selected: OptionModel;
  options: OptionModel[];
}

export interface OptionModel {
  id: any;
  title: string;
  description: string;
  value?: any;
  selected?: boolean;
}
