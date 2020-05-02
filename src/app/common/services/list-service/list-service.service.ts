import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../../models/item.model';
import {List} from '../../models/list.model';
import {ListServiceHttpClient} from './http/list-service.http.client';
import {Category} from '../../models/category.model';
import {User} from '../../models/user.model';

@Injectable()
export class ListService {

  constructor(private readonly httpClient: ListServiceHttpClient) {
  }


  // Lists
  public getListsForUser(userId: number): Observable<List[]> {
    return this.httpClient.getListsForUser(userId);
  }

  public getListItems(listId: number): Observable<List> {
    return this.httpClient.getListItems(listId);
  }

  public addList(list: List): Observable<List> {
    return this.httpClient.addList(list);
  }

  public updateList(list: List, listId: number): Observable<List> {
    return this.httpClient.updateList(list, listId);
  }

  public removeList(listId: number): Observable<string> {
    return this.httpClient.removeList(listId);
  }

  public addUserToList(user: User, listId: number): Observable<any> {
    return this.httpClient.addUserToList(user, listId);
  }

  public removeUserFromList(listId: number, userId: number): Observable<any> {
    return this.httpClient.removeUserFromList(listId, userId);
  }


  // Items
  public addItem(item: Item, listId: number): Observable<Item> {
    return this.httpClient.addItem(item, listId);
  }

  public removeItem(itemId: number): Observable<string> {
    return this.httpClient.removeItem(itemId);
  }

  public updateItem(item: Item, itemId: number): Observable<Item> {
    return this.httpClient.updateItem(item, itemId);
  }


  // General
  public getAllCategories(): Observable<Category[]> {
    return this.httpClient.getAllCategories();
  }
}
