import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../../models/item.model';
import {List} from '../../models/list.model';

@Injectable()
export class ListService {

  constructor(private readonly httpClient: ListServiceHttpClient) {
  }


  // Lists
  public getListsForUser(userId: number): Observable<List[]> {
    return this.httpClient.getListsForUser(userId);
  }

  public getListItems(listId: number): Observable<ListItems[]> {
    return this.httpClient.getListItems(listId);
  }

  public addList(list: List): Observable<List> {
    return this.httpClient.addItem();
  }

  public removeList(listId: number): Observable<string> {
    return this.httpClient.removeList();
  }

  public addUserToList(list: List, userId: number): Observable<string> {
    return this.httpClient.addUserToList();
  }

  public removeUserFromList(list: List, userId: number): Observable<string> {
    return this.httpClient.removeUserFromList();
  }


  // Items
  public addItems(item: Item): Observable<Item> {
    return this.httpClient.addItem();
  }

  public removeItem(itemId: number): Observable<string> {
    return this.httpClient.removeItem();
  }

  public updateItem(item: Item): Observable<Item> {
    return this.httpClient.updateItem();
  }


  // General
  public getAllCategories(): Observable<Category[]> {
    return this.httpClient.getAllCategories();
  }
}
