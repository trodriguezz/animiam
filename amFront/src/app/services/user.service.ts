import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * fonction creation utilisateur
   */
  createUser(user:User) : Observable<User>{
    return this.http.post<User>('http://localhost:3000/users', JSON.stringify(user),
    {
      headers: new HttpHeaders().set("Content-Type","application/json")
    });
  


  }

  // injection de dépendance
  constructor(private http: HttpClient) { }
}
