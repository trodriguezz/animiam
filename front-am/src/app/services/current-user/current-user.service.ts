import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from 'src/app/class/token/token';
import { environment } from 'src/environments/environment';
import { User } from '../../class/user/user';

@Injectable({
   providedIn: 'root'
})
export class CurrentUserService {

   constructor(private http: HttpClient) { }

   private token: Token = new Token();

   // Lire les infos présentes dans la sessionStorage
   private readInfo() {
      if (window.sessionStorage.getItem("token")) { // getItem : renvoie la valeur actuelle associée à la clé donnée
         this.token = JSON.parse(window.sessionStorage.getItem("token")); // parse : convertit une chaîne JSON en objet.
      }
   }

   // Enregistrer les infos dans la sessionStorage
   private saveInfo() {
      window.sessionStorage.setItem("token", JSON.stringify(this.token));
   }

   // Supprimer les infos de la sessionStorage
   private resetInfo() {
      this.token = new Token();
      this.saveInfo();
   }

   // Définir le token
   public set recupToken(v: string) {
      this.token.token = v;
      this.saveInfo();
   }

   // Obtenir le token
   public get recupToken() {
      this.readInfo();
      return this.token.token;
   }

   // Savoir si l'utilisateur est connecté
   public get isLogged(): boolean {
      this.readInfo();
      if (this.token.token) { // Appel du Getter pour la gestion du sessionStorage
         return true;  // utilisateur connecté
      } else {
         return false; // utilisateur non connecté
      }
   }

   // Définir l'id de l'utilisateur connecté
   public set id(v: string) {
      this.token.id = v;
      this.saveInfo();
   }

   // Obtenir l'id de l'utilisateur connecté
   public get id() {
      this.readInfo();
      return this.token.id;
   }

   // Définir l'email de l'utilisateur connecté
   public set email(v: string) {
      this.token.email = v;
      this.saveInfo();
   }

   // Obtenir l'email de l'utilisateur connecté
   public get email() {
      this.readInfo();
      return this.token.email;
   }


   // Définir le pseudo de l'utilisateur connecté
   public set pseudo(v: string) {
      this.token.pseudo = v;
      this.saveInfo();
   }

   // Obtenir le pseudo de l'utilisateur connecté
   public get pseudo() {
      this.readInfo();
      return this.token.pseudo;
   }

   // Définit le prenom de l'utilisateur connecté
   public set prenom(v: string) {
      this.token.prenom = v;
      this.saveInfo();
   }

   // Obtenir le prenom de l'utilisateur connecté
   public get prenom() {
      this.readInfo();
      return this.token.prenom;
   }


   // Définit le nom de l'utilisateur connecté
   public set nom(v: string) {
    this.token.nom = v;
    this.saveInfo();
 }

 public get nom() {
    this.readInfo();
    return this.token.nom;
 }

   // Définit le type de profil utilisateur
   public set profile(v: string) {
      this.token.profile = v;
      this.saveInfo();
   }
  
   // Savoir quel est le type de profil utilisateur
   public get profile() {
      this.readInfo();
      return this.token.profile;
   }

   // Déconnexion de l'utilisateur
   public reset() {
      this.resetInfo(); // Supprimer les infos de la sessionStorage
      this.saveInfo();  // Enregistrer la suppression des infos de la sessionStorage
   }

   // Obtenir les infos de l'utilisateur stocké dans la BDD
   public getUserInfoByID(userId: string): Observable<User> {
      return this.http.get<User>(`${environment.urlBase}/users/${userId}`);
   }

   // Modifier les infos de l'utilisateur
   public updateUserInfo(userId: string, newInfo: any) {
      return this.http.patch<void>(
         `${environment.urlBase}/users/${userId}`, // environment.urlBase : nom de domaine du futur environnement
         JSON.stringify(newInfo),
         { headers: new HttpHeaders().set("Content-Type", "application/json") });
   }
}
