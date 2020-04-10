import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Admin } from '../admin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  //! fonction va se connecter à db et enregistrer (POST) saisies formAdmin
  contactAdmin(admin: Admin) : Observable<Admin> {
    return this.http.post<Admin>('http://localhost:3000/messages', JSON.stringify(admin),
    {
      headers: new HttpHeaders().set("Content-Type","application/json")
    });
  }
}
