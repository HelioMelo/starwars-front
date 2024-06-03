import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Starship } from '../models/Starship';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})

export class StarshipsService {

  constructor(
    private http: HttpClient
  ) { }

  public getStarship(): Observable<Starship[]> {
    return this.http
      .get<Starship[]>(`${environment.api}/starships`)
      .pipe(take(1));
  }

  public getStarshipPage(page: number): Observable<Starship[]> {
    return this.http
      .get<Starship[]>(`${environment.api}/starships/?page=${page}`)
      .pipe(take(1));
  }

  public getStarshipById(id: number,): Observable<Starship> {
    return this.http
      .get<Starship>(`${environment.api}/starships/${id}`)
      .pipe(take(1));
  }

  public postStarship(starship: Starship): Observable<Starship> {
    return this.http
      .post<Starship>(`${environment.api}/save/starships`, starship)
      .pipe(take(1));
  }

  public updateStarship(starship: Starship, id: number): Observable<Starship> {    
    return this.http
      .put<Starship>(`${environment.api}/update/starships/${id}`, starship)
      .pipe(take(1));
  }

  public deleteStarshipById(id: number): Observable<any> {
    return this.http
      .delete(`${environment.api}/delete/starships/${id}`)
      .pipe(take(1));
  }
}
