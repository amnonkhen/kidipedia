import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, tap, map} from "rxjs/operators";
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs/index";
import Page = wikipedia.Page;
import PageRequest = wikipedia.transport.QueryResponse;

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private pageUrl: string = 'https://en.wikipedia.org'
    + '/w/api.php?origin=*&action=query&format=json&prop=extracts%7Cimages%7Cpageimages&list=&formatversion=2&exintro=1&explaintext=1&imlimit=1&imdir=descending&piprop=thumbnail%7Cname%7Coriginal&titles='
  ;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
  }

  getPage(id: string): Observable<Page> {
    const url = `${this.pageUrl}${id}`;
    return this.http.get<PageRequest>(url)
      .pipe(
        map(data => {
          let page = data.query.pages[0];
          return {
            title: page.title,
            thumbnail: page.thumbnail.source,
            extract: page.extract,
          }
        }),
        tap(_ => this.log(`fetched page id=${id}`)),
        catchError(this.handleError<any>(`getPage id=${id}`))
      )
  }

  private log(message: string) {
    this.messageService.add(`PageService: ${message}`);
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
}
