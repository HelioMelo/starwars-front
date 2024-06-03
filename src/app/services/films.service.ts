import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { take } from "rxjs/operators";
import { Films } from "../models/Films";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class FilmsService {

  constructor(private http: HttpClient) {}

  public getFilms(): Observable<Films[]> {
    return this.http
      .get<Films[]>(`${environment.api}/films`)
      .pipe(take(1));
  }

  public getFilmsById(id: number): Observable<Films> {
    return this.http
      .get<Films>(`${environment.api}/films/${id}`)
      .pipe(take(1));
  }

  public deleteFilmsById(id: number): Observable<Films> {
    return this.http
      .delete<Films>(`${environment.api}/delete/films/${id}`)
      .pipe(take(1));
  }

  public postFilms(films: Films): Observable<Films> {
    return this.http
      .post<Films>(`${environment.api}/films`, films)
      .pipe(take(1));
  }

  public updateFilmsByid(films: Films, id: number): Observable<Films> {
    return this.http
      .put<Films>(`${environment.api}/update/films/${id}/${films.episode}/${films.title}`, '')
      .pipe(take(1));
  }
}
