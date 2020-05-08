import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnimauxService {

  // Injection (dépendance) module Http d'Angular
  constructor(private http: HttpClient) { }

  nbrAnimaux: number;

  // Fonction va se connecter à bdd et récuperer liste aliments
  getAllAnimaux(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:3000/animaux");
  }

  countAnimaux(): Observable<void> {
    return this.http.get<any>("http://localhost:3000/animaux/count").pipe(map((rep) => {
      this.nbrAnimaux = rep.count;
    }))
  }

}
