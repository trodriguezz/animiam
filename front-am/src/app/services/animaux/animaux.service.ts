import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnimauxService {

  //* Injection (dépendance) module Http d'Angular
  constructor(private http: HttpClient) { }

  public nbrAnimaux: number;

  //* Fonction va se connecter à bdd et récuperer liste des animaux
  getAllAnimaux(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:3000/animaux");
  }

  countAnimaux(): Observable<void> {
    return this.http.get<any>("http://localhost:3000/animaux/count").pipe(map((rep) => {
      this.nbrAnimaux = rep.count;
    }))
  }


  // * créer nouvel un animal CREATE
  createAnimalById(newData): Observable<any> {
    return this.http.post<any>("http://localhost:3000/animaux",
      JSON.stringify(newData),
      { headers: new HttpHeaders().set("Content-Type", "application/json") }
    )
  }

  // * voir un animal READ
  readAnimalById(id): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/animaux/${id}`
    )
  }

  // * modifier un animal UPDATE
  updateAnimalById(id, newData): Observable<any> {
    return this.http.patch<any>(`http://localhost:3000/animaux/${id}`,
      JSON.stringify(newData),
      { headers: new HttpHeaders().set("Content-Type", "application/json") }
    )
  }

  // * supprimer un animal DELETE
  deleteAnimalById(id): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/animaux/${id}`
    )
  }
}
