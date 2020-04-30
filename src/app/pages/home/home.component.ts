import {Component, OnInit} from '@angular/core';
import {OauthUtils} from '../../common/utils/oauth.utils';
import {Router} from '@angular/router';
import {List} from '../../common/models/list.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePage implements OnInit {

  public userList: List[] = [{
    id: 1,
    title: 'Test list',
    description: 'This is a test list',
    created_by: 1,
    user_count: 3
  }, {
    id: 2,
    title: 'Test list',
    description: 'This is a test list',
    created_by: 2,
    user_count: 1
  }, {
    id: 3,
    title: 'Test list',
    description: 'This is a test list',
    created_by: 5,
    user_count: 8
  }, {
    id: 4,
    title: 'Test list',
    description: 'This is a test list',
    created_by: 2,
    user_count: 12
  }];
  private userId: number;

  constructor(private readonly router: Router) {
  }

  ngOnInit(): void {
    this.userId = OauthUtils.getLoggedInUser().id;
  }

  public onListClick(listId: number) {
    this.router.navigate(['/list']);
  }

  public onNewListClick() {
    this.router.navigate(['/capture'], {state: {type: 'list', back: this.router.url, action: 'new'}});
  }

  public onCardLongPress(list: List): void {
    this.router.navigate(['/capture'], {state: {type: 'list', back: this.router.url, action: 'edit', details: list}});
  }

}
