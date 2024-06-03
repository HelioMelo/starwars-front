import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { People } from '../models/People';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})

export class PeopleService {
 
  constructor(
    private http: HttpClient
  ) { }

  public getAllPilot(): Observable<People[]> {
    return this.http
      .get<People[]>(`${environment.api}/pilots`)
      .pipe(take(1));
  }

  public getPilotPage(page: number): Observable<People[]> {
    return this.http
      .get<People[]>(`${environment.api}/pilots/?page=${page}`)
      .pipe(take(1));
  }

  public getPilotById(id: number,): Observable<People> {
    return this.http
      .get<People>(`${environment.api}/pilots/${id}`)
      .pipe(take(1));
  }

   public postPilot(pilot: People): Observable<People> {
    return this.http
      .post<People>(`${environment.api}/save/pilots`, pilot)
      .pipe(take(1));
  }

  public updatePilot(pilot: People, id: number): Observable<People> {   
    return this.http
      .put<People>(`${environment.api}/update/pilots/${id}`, pilot)
      .pipe(take(1));
  }

  public deletePilotById(id: number): Observable<People> {
    return this.http
      .delete<People>(`${environment.api}/delete/pilots/${id}`)
      .pipe(take(1));
  }

}
