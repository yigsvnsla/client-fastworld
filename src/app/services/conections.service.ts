import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { ToolsService } from './tools.service';
import { CookiesService } from './cookies.service';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { 
  retry, 
  catchError, 
  debounceTime 
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConectionsService {
  // API path
  public readonly api: string  = 'https://api.fastworld.app/api';

  constructor(
    private toolsService: ToolsService,
    private cookiesService: CookiesService,
    private httpClient: HttpClient,
    private router:Router
    ) {
      
    }

  // Http Options
  httpHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(this.cookiesService.get(environment.cookie_tag).jwt)}`,
      }),
    };
  }
  // Handle API errors
  errorHandler(httpErrorResponse: HttpErrorResponse) {
    if (httpErrorResponse.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', httpErrorResponse.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.toolsService.showAlert({
        cssClass: 'alert-danger',
        header: `🚫 Error ${httpErrorResponse.error.error.status}`,
        subHeader: httpErrorResponse.error.error.message,
        message: httpErrorResponse.error.error.details,
        buttons: ['ok'],
      });
      console.error(
        `Backend returned code ${
          httpErrorResponse.status
        },body was: ${JSON.stringify(httpErrorResponse.error)}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(httpErrorResponse);
  }

  // Methods
  public get(path: string) {
    return this.httpClient
      .get<any>(`${this.api}/${path}`, this.httpHeaders())
      .pipe(
        retry(2),
        catchError((err) => this.errorHandler(err))
      );
  }

  public post(path: string, body: any) {
    return this.httpClient
      .post<any>(`${this.api}/${path}`, body, this.httpHeaders())
      .pipe(
        retry(2),
        catchError((err) => this.errorHandler(err))
      );
  }

  public delete(path: string) {
    return this.httpClient
      .delete<any>(`${this.api}/${path}`, this.httpHeaders())
      .pipe(
        retry(2),
        catchError((err) => this.errorHandler(err))
      );
  }

  public put(path: string, body: any) {
    return this.httpClient
      .put<any>(`${this.api}/${path}`, body, this.httpHeaders())
      .pipe(
        retry(2),
        catchError((err) => this.errorHandler(err))
      );
  }

  /*
    Authentications methods
  */

  public signUp(formBody:any){
    return this.httpClient
      .post<any>(`${this.api}/auth/cliente/signup`, formBody)
      .pipe(
        debounceTime(500),
        retry(2),
        catchError((err) => this.errorHandler(err))
      );
  }

  public signIn({ email, password }) {
    console.log({ identifier: email, password });
    return this.httpClient
      .post<any>(`${this.api}/auth/cliente/signin`, { identifier: email, password })
      .pipe(
        debounceTime(500),
        retry(2),
        catchError((err) => this.errorHandler(err))
      );
  }

  public logOut():void{
    this.cookiesService.remove(environment.cookie_tag);
    this.router.navigateByUrl('auth');

  }

}
