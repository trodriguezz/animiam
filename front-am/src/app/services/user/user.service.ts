import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../class/user/user';
import { Observable } from 'rxjs';
import { Token } from '../../class/token/token';
import { tap, map } from 'rxjs/operators'
import { CurrentUserService } from '../current-user/current-user.service';
import { Login } from '../../class/login/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //!  injection dépendances : module HttpClient et service currentUser
  constructor(private http: HttpClient, private currentUser: CurrentUserService) { }

  //! createUser() = fonction qui va se connecter à la base de donnée et qui va enregistrer new user dans collection
  createUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users', JSON.stringify(user),
      {
        headers: new HttpHeaders().set("Content-Type", "application/json")
      });
  }

  //! authentification() = fonction qui va comparer les informations saisies avec celles enregistrées en bdd
  authentification(authentification: Login): Observable<Token> {
    return this.http.post<Token>('http://localhost:3000/login', JSON.stringify(authentification),
      {
        headers: new HttpHeaders().set("Content-Type", "application/json")
      }
    ).pipe(tap((data: Token) => {
      this.currentUser.recupToken = data.token;
      this.currentUser.id = data.id;
      this.currentUser.email = data.email;
      this.currentUser.pseudo = data.pseudo;
      this.currentUser.prenom = data.prenom;
      this.currentUser.nom = data.nom;
      this.currentUser.profile = data.profile;
    }
    ));
  }
}

