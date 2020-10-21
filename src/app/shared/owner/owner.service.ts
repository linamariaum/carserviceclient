import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  public API = 'https://thawing-chamber-47973.herokuapp.com';
  public OWNER_API = this.API + '/owners';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.OWNER_API);
  }

  get(id: string) {
    return this.http.get(this.OWNER_API + '/' + id);
  }

  save(owner: any): Observable<any> {
    let result: Observable<Object>;
    if (owner['href']) {
      result = this.http.put(owner.href, owner);
    } else {
      result = this.http.post(this.OWNER_API, owner);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }

  async getAllOwners(): Promise<any> {
    return await this.http.get<any>(this.OWNER_API)
      .pipe(
        retry(1),
        catchError(this.handleError)
      ).toPromise();
  }

  // Error handling
  handleError(error) {
    let errorMessage;
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      errorMessage = error;
    }
    return throwError(errorMessage);
  }
}
