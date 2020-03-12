import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //!  injection de dépendance, modul HttpClient
  constructor(private http: HttpClient) { }
  
  //! createUser() = fonction va se connecter à db et récuperer liste user lors de la création new user
  createUser(user:User) : Observable<User>{
    return this.http.post<User>('http://localhost:3000/users', JSON.stringify(user),
    {
      headers: new HttpHeaders().set("Content-Type","application/json")
    });
  


  }

}
