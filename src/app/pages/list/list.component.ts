import {Component, OnInit} from '@angular/core';
import {Tab} from '../../common/models/tab.model';
import {Router} from '@angular/router';
import {OauthUtils} from '../../common/utils/oauth.utils';
import {User} from '../../common/models/user.model';
import {Item} from '../../common/models/item.model';
import {List} from '../../common/models/list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListPage implements OnInit {

  public listItems: List = {
    id: 0,
    title: 'Test list',
    description: 'This is a test list',
    created_by: 1,
    user_count: 8,
    categories: [
      {
        id: 3,
        title: 'Meat/Poultry',
        description: 'Fresh meat and poultry products',
        items: [
          {
            id: 2,
            category_id: 3,
            title: 'steak',
            description: 'Chuck steak',
            status: null,
            quantity: '300g'
          },
          {
            id: 3,
            category_id: 3,
            title: 'chicken fillets',
            description: 'pack of 5',
            status: null,
            quantity: '1'
          }
        ]
      },
      {
        id: 5,
        title: 'Dry/Tinned',
        description: 'Preserved foods',
        items: [
          {
            id: 1,
            category_id: 5,
            title: 'beans',
            description: 'Baked beans',
            status: null,
            quantity: '1'
          }
        ]
      }
    ]
  };
  public tabs: Tab[] = [{
    id: 0,
    title: 'All',
    active: true,
    enabled: true,
    componentTag: 'all-items'
  }, {
    id: 1,
    title: 'Incomplete',
    active: false,
    enabled: true,
    componentTag: 'complete-items'
  }, {
    id: 2,
    title: 'Issues',
    active: false,
    enabled: true,
    componentTag: 'incomplete-items'
  }];

  private currentUser: User = OauthUtils.getLoggedInUser();
  private isListAdmin: boolean = OauthUtils.isAdmin()
    || this.listItems.created_by === this.currentUser.id; // user this to be able to add users

  constructor(private readonly router: Router) {
  }

  ngOnInit(): void {
    //  make service call to get the list for currentUser
  }

  public onTabChanged(tabIndex: number) {
    switch (tabIndex) {
      case 0:
        console.log('All items to be shown');
        break;
      case 1:
        console.log('Only incomplete items to be shown');
        break;
      case 2:
        console.log('only items with issues to be shown');
        break;
    }
  }

  public onNavButtonClick(button: string): void {
    switch (button) {
      case 'menu':
        this.onMenuClick();
        break;
      case 'add-item':
        this.onNewItemClick();
        break;
    }
  }

  public onItemLongPress(item: Item): void {
    this.router.navigate(['/capture'], {state: {type: 'item', back: this.router.url, action: 'edit', details: item}});
  }

  private onMenuClick(): void {
    console.log('toggle sideNav');
  }

  private onNewItemClick(): void {
    this.router.navigate(['/capture'], {state: {type: 'item', back: this.router.url, action: 'new'}});
  }

}
