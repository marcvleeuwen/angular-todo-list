import {Component, OnInit} from '@angular/core';
import {Tab} from '../../common/models/tab.model';
import {ActivatedRoute, Router} from '@angular/router';
import {OauthUtils} from '../../common/utils/oauth.utils';
import {User} from '../../common/models/user.model';
import {Item} from '../../common/models/item.model';
import {List} from '../../common/models/list.model';
import {ListServiceHttpClient} from '../../common/services/list-service/http/list-service.http.client';
import {NavConfig} from '../../common/models/nav-config.model';
import {Category} from '../../common/models/category.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListPage implements OnInit {

  public categories: Category[];
  public items: Item[];
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
  public navConfig: NavConfig = {
    title: '',
    navButton: 'menu',
    actionButton: 'add-item'
  };
  private list: List;
  private queryParams: any;
  private currentUser: User = OauthUtils.getLoggedInUser();
  private isListAdmin: boolean = OauthUtils.isAdmin()
    || this.list.created_by === this.currentUser.id; // use this to be able to add users

  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,
              private readonly listService: ListServiceHttpClient) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
    });
    this.listService.getListItems(this.queryParams.listId).subscribe((list) => {
      this.list = JSON.parse(JSON.stringify(list));
      this.categories = JSON.parse(JSON.stringify(list.categories));
      this.items = JSON.parse(JSON.stringify(list.items));

      this.navConfig.title = this.list.title;
    }, (error) => {
      console.error('getListItems', error);
    });
  }

  public onTabChanged(tabIndex: number) {
    this.items = this.list.items;
    this.categories = this.list.categories;
    switch (tabIndex) {
      case 1:
        this.categories = this.list.categories;
        this.items = this.list.items.filter(item => !item.status);
        this.categories = this.list.categories.filter(category =>
          this.items.some(item =>
            item.category_id === category.id));
        break;
      case 2:
        this.items = this.items.filter(item => item.status === 'error');
        this.categories = this.categories.filter(category =>
          this.items.some(item =>
            item.category_id === category.id));
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

  public updateItemStatus(item: Item): void {
    this.list.items.find(listItem => listItem.id === item.id).status = item.status;
    this.onTabChanged(this.tabs.find(tab => tab.active).id);
  }

  private onMenuClick(): void {
    console.log('toggle sideNav');
    this.router.navigate(['/home']);
  }

  private onNewItemClick(): void {
    this.router.navigate(['/capture'], {state: {type: 'item', back: this.router.url, action: 'new'}});
  }

}
