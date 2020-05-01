import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Select } from '../../class/select/select';

@Injectable({
  providedIn: 'root'
})

export class AlimentService {

  aliments: any[] = [];
 
  //! injection module Angular "HttpClient"
  constructor(private http: HttpClient) { }

  //! fonction getAllAliment() va se connecter à db et récuperer (GET) liste de tous les aliments
  getAllAliment(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:3000/aliments");
  }

  // //! fonction qui va se connecter à db et récupérer liste aliments SANS DOUBLONS
  // getOneTypeOfAliment(): Observable<any[]> {
  //   return this.http.get<any[]>("http://localhost:3000/aliments");
  // }

}