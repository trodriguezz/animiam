import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  // ** SAUVEGARDE DU TOKEN APRES F5 ** //

  private token: string = ""; // donnée "membre"

  constructor() { }

  public set recupToken(v: string) { // set = fonction qui DEFINIT / AJOUTE une propriété
    // TODO "écriture dans le sessionStorage du navigateur"
    // * méthode setItem() = une méthode de l'API Storage, lorsque lui sont passées le duo clé-valeur, les ajoute à l'emplacement de stockage, sinon elle met à jour la valeur si la clé existe déjà.
    // * propriété sessionStorage = permet d'utiliser un objet Storage valable pour la session de navigation en cours et pour les pages du même domaine que la page actuelle.
    window.sessionStorage.setItem("sectoken", v);
    this.token = v;
  }

  public get recupToken() { // get = fonction qui RENVOIE / RECUPERE une propriété
    if (!this.token) {
      // * méthode getItem() de l'interface Storage renvoie la valeur associée à la clé (valeur-clé) passée en paramètre.
      if (window.sessionStorage.getItem("sec")) {
        this.token = window.sessionStorage.getItem("sectoken"); // mise en mémoire du token
      }
    }
    return this.token;
  }

  public get isLogged(): boolean {

    if (this.recupToken) { // appel du getter pour la gestion du Storage
      this.token = "";
    }
    return false;
  }

  public reset() {
    window.sessionStorage.removeItem("sectoken"); // clear du token
    this.token = "";
  }


}
