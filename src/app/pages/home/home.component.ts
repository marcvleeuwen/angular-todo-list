import {Component, OnInit} from '@angular/core';
import {OauthUtils} from '../../common/utils/oauth.utils';
import {Router} from '@angular/router';
import {List} from '../../common/models/list.model';
import {ListServiceHttpClient} from '../../common/services/list-service/http/list-service.http.client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePage implements OnInit {

  public userLists: List[];
  private userId: number;

  constructor(private readonly router: Router,
              private readonly httpClient: ListServiceHttpClient) {
  }

  ngOnInit(): void {
    this.userId = OauthUtils.getLoggedInUser().id;
    this.httpClient.getListsForUser(this.userId).subscribe((lists) => {
      this.userLists = lists;
    }, (error) => {
      console.error('getListsForUser', error);
    });
  }

  public onListClick(list: List) {
    this.router.navigate(['/list'], {queryParams: { listId: list.id }});
  }

  public onNewListClick() {
    this.router.navigate(['/capture'], {state: {type: 'list', back: this.router.url, action: 'new'}});
  }

  public onCardLongPress(list: List): void {
    this.router.navigate(['/capture'], {state: {type: 'list', back: this.router.url, action: 'edit', details: list}});
  }

}
