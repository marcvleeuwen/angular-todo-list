import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {List} from '../../../models/list.model';
import {Item} from '../../../models/item.model';
import {Category} from '../../../models/category.model';
import {User} from '../../../models/user.model';

@Injectable()
export class ListServiceHttpClient {
  constructor(private httpClient: HttpClient) {
  }

  // LIST
  public getListsForUser(userId: number): Observable<List[]> {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const url: string = `/api/v1/user-lists/${userId}`;

    return this.httpClient.get<List[]>(
      url, {headers}
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }

  public getListItems(listId: number): Observable<List> {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const url: string = `/api/v1/list-items/${listId}`;

    return this.httpClient.get<List>(
      url, {headers}
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }

  public getListUsers(listId: number): Observable<User[]> {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const url: string = `/api/v1/list-users/${listId}`;

    return this.httpClient.get<User[]>(
      url, {headers}
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }

  public addList(list: List): Observable<any> {
    console.log('http add list');
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const url: string = `/api/v1/list`;
    const body = {
      title: list.title,
      description: list.description,
    };

    return this.httpClient.post<any>(
      url, body, {headers}
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }

  public updateList(list: List, listId: number): Observable<List> {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const url: string = `/api/v1/list/${listId}`;
    const body = {
      title: list.title,
      description: list.description,
    };

    return this.httpClient.put<List>(
      url, body, {headers}
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }

  public removeList(listId: number): Observable<string> {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const url: string = `/api/v1/list/${listId}`;

    return this.httpClient.delete<string>(
      url, {headers}
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }

  public addUserToList(user: User, listId: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const url: string = `/api/v1/list-add-user`;
    const body = {
      userId: user.id,
      role: user.user_role,
      listId
    };

    return this.httpClient.post<any>(
      url, body, {headers}
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }

  public removeUserFromList(userId: number, list: List): Observable<any> {
    const url: string = `/api/v1/list-remove-user`;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        // tslint:disable-next-line
        list: list,
        // tslint:disable-next-line
        userId: userId
      },
    };

    return this.httpClient.delete<any>(
      url, options
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }

  public clearListItem(listId: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const url: string = `/api/v1/remove-items/${listId}`;

    return this.httpClient.delete<any>(
      url, {headers}
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }


  //  ITEM
  public addItem(item: Item, listId: number): Observable<Item> {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const url: string = `/api/v1/item`;
    const body = {
      title: item.title,
      description: item.description,
      quantity: item.quantity,
      category_id: item.category_id,
      listId,
      status: item.status
    };

    return this.httpClient.post<Item>(
      url, body, {headers}
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }

  public updateItem(item: Item, itemId: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const url: string = `/api/v1/item/${itemId}`;
    const body = {
      title: item.title,
      description: item.description,
      quantity: item.quantity,
      category_id: item.category_id,
      status: item.status
    };

    return this.httpClient.put<any>(
      url, body, {headers}
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }

  public removeItem(itemId: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const url: string = `/api/v1/item/${itemId}`;

    return this.httpClient.delete<any>(
      url, {headers}
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }

  //  CATEGORY
  public getAllCategories(): Observable<Category[]> {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const url: string = `/api/v1/categories`;

    return this.httpClient.get<Category[]>(
      url, {headers}
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }

  //  Users
  public searchUsers(term: string): Observable<User[]> {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const url: string = `/api/v1/users/${term}`;

    return this.httpClient.get<User[]>(
      url, {headers}
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }
}
