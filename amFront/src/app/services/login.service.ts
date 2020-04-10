import { Injectable } from '@angular/core';
import { Login } from '../login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // loginUser(loginUser: Login) {
  //   throw new Error("Method not implemented.");
  // }
  constructor(private http: HttpClient) { }


  loginUser(log: Login) : Observable<Login> {
    return this.http.post<Login>('http://localhost:3000/users', JSON.stringify(log),
    {
      headers: new HttpHeaders().set("Content-Type","application/json")
    });

  }

  // authUser(log: Login) : Observable<Login> {
  //   return this.http.get<Login>('http://localhost:3000/users');
  // }

}