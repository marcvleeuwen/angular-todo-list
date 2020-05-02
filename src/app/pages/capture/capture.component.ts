import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NavConfig} from '../../common/models/nav-config.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class CapturePage implements OnInit {

  public itemForm: FormGroup;
  public listForm: FormGroup;
  public config: any;
  public navConfig: NavConfig = {
    title: 'List name goes here',
    navButton: 'back',
    actionButton: 'btn-done'
  };

  constructor(private readonly formBuilder: FormBuilder,
              private readonly router: Router) {
    this.config = this.router.getCurrentNavigation().extras.state;
    this.itemForm = this.formBuilder.group({
      title: '',
      description: '',
      quantity: '',
      category: '',
    });

    this.listForm = this.formBuilder.group({
      title: '',
      description: ''
    });
  }

  ngOnInit(): void {
    if (this.config && this.config.action === 'edit') {
      // get details from service
      if (this.config.type === 'item' && this.config.item) {
        this.itemForm.setValue({
          ['title']: this.config.item.title,
          ['description']: this.config.item.description,
          ['quantity']: this.config.item.quantity,
        });
      }
      // populate form
    }
  }

  public onSubmit(formData: any, form: 'login' | 'signup'): void {
    console.log(form, formData);
  }

  public onNavButtonClicked(button: string): void {
    switch (button) {
      case 'back':
        console.log('back');
        window.history.back();
        break;
      case 'btn-done':
        this.onNavDoneClicked();
        break;
    }
  }

  public onNavDoneClicked(): void {
    console.log('done');
    console.log(document.referrer);
    window.history.back();
    //  call service to commit changes
    // on success navigate back
    // on error show error and remain on screen
  }

}
