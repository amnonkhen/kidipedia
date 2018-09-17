import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {Category} from './category';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';
import Page = wikipedia.Page;
import QueryResponse = wikipedia.transport.QueryResponse;


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};


function safeThumbnailSource(page: wikipedia.transport.Page): string {
  return page.thumbnail
    ? page.thumbnail.source
    : 'http://placehold.jp/400x400.png';
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesUrl = '/api/categories';

  private wikipediaEnpoint = 'https://en.wikipedia.org/w/api.php';

  private categoryImageParams = {
    'origin': '*',
    'action': 'query',
    'format': 'json',
    'prop': 'pageimages',
    'list': '',
    'formatversion': '2',
    'piprop': 'thumbnail|name|original',
    'pithumbsize': '400',
    'titles': '',
  };


  private pagesInCategoryParams = {
    'origin': '*',
    'action': 'query',
    'generator': 'categorymembers',
    'prop': 'pageimages',
    'piprop': 'thumbnail|name|original',
    'gcmlimit': '10',
    'format': 'json',
    'formatversion': '2',
    'pithumbsize': '400',
    'gcmtitle': '',
    // "gcmnamespace": "0",
  };

  // URL to web api
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl)
      .pipe(
        tap(categories => this.log('fetched categories')),
        catchError(this.handleError('getCategories', []))
      );
  }

  getCategory(id: string) {
    this.pagesInCategoryParams.gcmtitle = `Category:${id}`;
    return this.http.get<Category>(this.wikipediaEnpoint, {
      params: this.pagesInCategoryParams
    }).pipe(
      tap(_ => this.log(`fetched category id=${id}`)),
      catchError(this.handleError<Category>(`getCategory id=${id}`))
    );
  }

  getPagesInCategory(id: string): Observable<Page[]> {
    this.pagesInCategoryParams.gcmtitle = `Category:${id}`;
    return this.http.get<QueryResponse>(this.wikipediaEnpoint, {
      params: this.pagesInCategoryParams
    }).pipe(
      map(this.mapCategoryPages),
      tap(_ => this.log(`fetched pages of category id=${id}`)),
      catchError(this.handleError<any>(`getPagesInCategory id=${id}`))
    );

  }

  private mapCategoryPages(queryResponse: QueryResponse): Page[] {
    const query = queryResponse.query;
    let pages: Page[] = [];

    if (query) {
      pages = query.pages.map((page: wikipedia.transport.Page): Page => {
        return {
          title: page.title,
          thumbnail: safeThumbnailSource(page),
          extract: page.extract,
        };
      });
    }
    return pages;
  }

  getCategoryImage(id: string): Observable<string> {
    this.categoryImageParams.titles = id;
    return this.http.get<QueryResponse>(this.wikipediaEnpoint, {
      params: this.categoryImageParams
    }).pipe(
      map(queryResponse => safeThumbnailSource(queryResponse.query.pages[0])),
      tap(_ => this.log(`fetched category image for id=${id}`)),
      catchError(this.handleError<any>(`getCategoryImage id=${id}`))
    );

  }

  private log(message: string) {
    this.messageService.add(`CategoryService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** PUT: update the category on the server */
  updateCategory(category: Category): Observable<any> {
    return this.http.put(this.categoriesUrl, category, httpOptions).pipe(
      tap(_ => this.log(`updated category id=${category.id}`)),
      catchError(this.handleError<any>('updateCategory'))
    );
  }
}
