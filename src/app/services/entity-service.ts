import { Injectable } from '@angular/core';

import { Observable, throwError, of, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { tap, catchError } from 'rxjs/operators';
import { IEntityToDb } from '../Models/entity-interface';


@Injectable({
  providedIn: 'root'
})
export class EntityService {
  private entitys: IEntityToDb[];
  private entitySubject = new BehaviorSubject<IEntityToDb>(null);
  newEntitySubject$ = this.entitySubject.asObservable();

  addNewEntity(newEntity: IEntityToDb): void {
    this.entitySubject.next(newEntity);
  }
  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    debugger
    console.error('An error occurred:', error.error);
    return throwError("Method not implemented.");
  }
  private entityUrl = 'http://amitshimon.gearhostpreview.com/api/entity';

  getEntity(): Observable<IEntityToDb[]> {

    if (this.entitys) {
      return of(this.entitys);
    }

    return this.http.get<IEntityToDb[]>(this.entityUrl + '/getAllEntitys').pipe(
      tap(data => console.log('All:' + JSON.stringify(data))),
      tap(data => this.entitys = data),
      catchError(this.handleError));
  }

  getEntityById(id: string): Observable<IEntityToDb> {

    if (this.entitys) {
      const entityById = this.entitys.find(entity => entity.id === id);
      return of(entityById);
    }
    return this.http.get<IEntityToDb>(this.entityUrl + "/getEntityById/" + id).pipe(
      tap(data => console.log('ById:' + JSON.stringify(data)))
      , catchError(this.handleError));
  }

  CreateEntity(entity: IEntityToDb): Observable<IEntityToDb> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post<IEntityToDb>(this.entityUrl + '/createEntity', entity, { headers })
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => {
          data.date = this.convertTicksToDate(data.date)
          this.entitys.push(data);
          this.addNewEntity(entity);
        })
      );
  }

  updateEntity(entity: IEntityToDb): Observable<IEntityToDb> {

    const params = new HttpParams().set('id', entity.id.toString());
    const headers = new HttpHeaders().set('content-type', 'application/json');

    return this.http.put<IEntityToDb>(this.entityUrl + '/updateEntity/' + entity.id, entity, { headers, params });
  }

  deleteEntity(id: string): Observable<IEntityToDb> {
    return this.http.delete<IEntityToDb>(this.entityUrl + '/deleteEntity/' + id).pipe(
      tap(data => console.log(JSON.stringify(data))),
      tap(data => {
        const index = this.entitys.findIndex(entity => entity.id === id);
        if (index > -1) {
          this.entitys.splice(index, 1);
        }
      })
    );
  }
  convertTicksToDate(date: number): any {

    var ticks = date;
    var ticksToMicrotime = ticks / 10000;
    var epochMicrotimeDiff = 2208988800000;
    var tickDate = new Date(ticksToMicrotime - epochMicrotimeDiff);
    return tickDate;
  }
}
