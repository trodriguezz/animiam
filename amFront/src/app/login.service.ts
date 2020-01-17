import { Injectable } from '@angular/core';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUser(loginUser: Login) {
    throw new Error("Method not implemented.");
  }

  constructor() { }

}