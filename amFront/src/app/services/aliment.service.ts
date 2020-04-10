import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlimentService {

  //! injection module Http d'Angular
  constructor(private http: HttpClient) { }

  //! fonction va se connecter à db et récuperer (GET) liste aliments
  getAllAliment(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:3000/aliments");
  }

  // getOnlyType() : Observable<any> {
  //   return this.http.get<any>("http://localhost:3000/aliments");
  // }

}
