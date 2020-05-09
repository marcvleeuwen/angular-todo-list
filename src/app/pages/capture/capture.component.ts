import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NavConfig} from '../../common/models/nav-config.model';
import {Router} from '@angular/router';
import {List} from '../../common/models/list.model';
import {ListService} from '../../common/services/list-service/list-service.service';
import {Item} from '../../common/models/item.model';
import {OptionModel} from '../../common/components/select/select.component';
import {User} from '../../common/models/user.model';
import {OauthUtils} from '../../common/utils/oauth.utils';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class CapturePage implements OnInit {

  public selectedCategory: number;
  public categoryOptions: OptionModel[];
  public itemForm: FormGroup;
  public listForm: FormGroup;
  public config: any;
  public navConfig: NavConfig = {
    title: '',
    navButton: 'back',
    actionButton: 'btn-done'
  };
  public users: User[];
  public isAdmin: boolean;
  public userSearchResults: User[];
  public searchInputModel: string;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly router: Router,
              private readonly listService: ListService) {
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
    this.isAdmin = OauthUtils.isAdmin()
      || (this.config
        && this.config.details
        && this.config.details.created_by === OauthUtils.getLoggedInUser().id);
    if (this.config) {
      if (this.config.action === 'edit') {
        if (this.config.type === 'item' && this.config && this.config.details) {
          this.itemForm.setValue({
            ['title']: this.config.details.title,
            ['description']: this.config.details.description,
            ['quantity']: this.config.details.quantity,
            ['category']: this.config.details.category_id
          });
          this.selectedCategory = this.config.details.category_id;
          this.listService.getAllCategories().subscribe(categories => {
            console.log(categories);
            this.categoryOptions = categories.map(item => ({...item, value: item.id}));
          }, error => {
            console.error(error);
          });
          this.navConfig.title = 'Edit item details';
        } else if (this.config && this.config.type === 'list' && this.config.details) {
          this.listForm.setValue({
            ['title']: this.config.details.title,
            ['description']: this.config.details.description
          });
          this.listService.getListUsers(this.config.details.id).subscribe(users => {
            this.users = users;
          }, error => {
            console.error(error);
          });
          this.navConfig.title = 'Edit list details';
        }
      } else if (this.config.action === 'new') {
        if (this.config.type === 'item') {
          this.navConfig.title = 'Create a new item';
          this.selectedCategory = 1;
          this.listService.getAllCategories().subscribe(categories => {
            this.categoryOptions = categories;
            console.log(this.categoryOptions);
          }, error => {
            console.error(error);
          });
        } else if (this.config.type === 'list') {
          this.navConfig.title = 'Create a new list';
        }
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  public getFormValue(fieldName: string): string {
    if (this.config) {
      if (this.config.type === 'item') {
        return this.itemForm.get(fieldName).value;
      } else if (this.config.type === 'list') {
        return this.listForm.get(fieldName).value;
      }
    }
    return undefined;
  }

  public onSubmit(): void {
    switch (this.config.action) {
      case 'edit':
        switch (this.config.type) {
          case 'item':
            this.updateItem();
            break;
          case 'list':
            this.updateList();
            break;
        }
        break;
      case 'new':
        switch (this.config.type) {
          case 'item':
            this.createItem();
            break;
          case 'list':
            this.createList();
            break;
        }
        break;
    }
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
    this.onSubmit();
  }

  public deleteList(): void {
    this.listService.removeList(this.config.details.id).subscribe(res => {
      console.log('edit item', res);
      window.history.back();
    }, error => {
      console.error('edit item', error.error);
    });
  }

  public deleteItem(): void {
    this.listService.removeItem(this.config.details.id).subscribe(res => {
      console.log('edit item', res);
      window.history.back();
    }, error => {
      console.error(error);
    });
  }

  public onAddUserClick(user: User): void {
    console.log(user.id);
    this.listService.addUserToList(user, this.config.details.id).subscribe(res => {
      console.log(res);
      this.users.push(user);
      this.userSearchResults = this.userSearchResults
        .filter(item => item.id !== OauthUtils.getLoggedInUser().id)
        .filter(item => !this.users.map(u => u.id).includes(item.id));
    }, error => console.error(error));
  }

  public onRemoveUserClick(user: User): void {
    this.listService.removeUserFromList(user.id, this.config.details).subscribe(res => {
      this.users = this.users.filter(item => item.id !== user.id);
    }, error => console.error(error));
  }

  public onUserSearchClick(): void {
    this.userSearchResults = undefined;

    if (this.searchInputModel && this.searchInputModel.length > 0) {
      this.listService.searchUsers(this.searchInputModel).subscribe(res => {
        this.userSearchResults = res
          .filter(item => item.id !== OauthUtils.getLoggedInUser().id)
          .filter(item => !this.users.map(user => user.id).includes(item.id));
      }, error => {
        if (error.status === 404) {
          this.userSearchResults = [];
        } else {
          console.error(error);
        }
      });
    }
  }

  private createList(): void {
    const list: List = {
      id: undefined,
      title: this.listForm.get('title').value,
      description: this.listForm.get('description').value
    };
    this.listService.addList(list).subscribe(res => {
      console.log('create list', res);
      window.history.back();
    }, error => {
      console.error('create list', error.error);
    });
  }

  private updateList(): void {
    const list: List = {
      id: this.config.list.id,
      title: this.listForm.get('title').value,
      description: this.listForm.get('description').value
    };
    this.listService.updateList(list, this.config.details.id).subscribe(res => {
      console.log('edit list', res);
      window.history.back();
    }, error => {
      console.error('edit list', error.error);
    });
  }

  private createItem(): void {
    const item: Item = {
      title: this.itemForm.get('title').value,
      description: this.itemForm.get('description').value,
      category_id: this.itemForm.get('category').value || undefined,
      quantity: this.itemForm.get('quantity').value || undefined,
      status: undefined,
      list_id: this.config.list.id
    };
    this.listService.addItem(item, this.config.list.id).subscribe(res => {
      console.log('create item', res);
      window.history.back();
    }, error => {
      console.error('create item', error.error);
    });
  }

  private updateItem(): void {
    const item: Item = {
      title: this.itemForm.get('title').value,
      description: this.itemForm.get('description').value,
      category_id: this.itemForm.get('category').value || undefined,
      quantity: this.itemForm.get('quantity').value || undefined,
      status: undefined,
      list_id: this.config.list.id
    };
    this.listService.updateItem(item, this.config.details.id).subscribe(res => {
      console.log('edit item', res);
      window.history.back();
    }, error => {
      console.error('edit item', error.error);
    });
  }

}
