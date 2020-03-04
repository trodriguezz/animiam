import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  // ** SAUVEGARDE DU TOKEN APRES F5 ** //

  private token: string = ""; // donnée "membre"

  constructor() { }

  public set recupToken(v: string) {
    // TODO "écriture dans le storage (session) du navigateur"
    window.sessionStorage.setItem("sectoken", v);
    this.token = v;
  }

  public get recupToken() {
    if (!this.token) {
      if (window.sessionStorage.getItem("sec")) {
        this.token = window.sessionStorage.getItem("sectoken"); // mise en mémoire du token
      }
    }
    return this.token;
  }

  public get isLogged(): boolean {

    if (this.recupToken) { // appel du getter pour la gestion du storage
      this.token = "";
    }

    return false;

  }

  public reset() {
    window.sessionStorage.removeItem("sectoken"); // clear du token
    this.token = "";
  }


}
