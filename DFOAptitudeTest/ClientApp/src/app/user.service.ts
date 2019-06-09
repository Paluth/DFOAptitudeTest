import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  needsUpdate: Observable<boolean> = of(false);
  constructor(private _http: HttpClient, @Inject('BASE_URL') private _baseUrl: string) { }

  updateComplete() { this.needsUpdate = of(false); }
  getAll(): Observable<User[]> {
    return this._http.get(this._baseUrl + "api/users/list").pipe(
      map((data) => <User[]>data),
      tap((userData) => of(userData)),
      catchError(this.handleError));
  }
  getById(id: number | string): Observable<User> {
    return this._http.get(this._baseUrl + "api/users/get/" + id).pipe(
      map((data) => <User>data),
      tap((value) => of(value)),
      catchError(this.handleError));
  }
  createOrUpdate(user: User) {
    this.needsUpdate = of(true);
    if (user.id == 0) {
      return this._http.post(this._baseUrl + "api/users/add", user).pipe(
        catchError(this.handleError));
    } else {
      return this._http.put(this._baseUrl + "api/users/update/" + user.id, user).pipe(
        catchError(this.handleError));
    }
  }
  private handleError(error) {
    console.error(error);
    return throwError(error);
  }
}
