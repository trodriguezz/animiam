import { AuthData } from "../class/authData";
import { ReponseLogin } from "../class/reponseLogin";
import { inject } from "@loopback/core";
import { UserService } from "@loopback/authentication";
import { UserServiceBindings } from "../key";
import { User } from "../models";
import { post, requestBody } from "@loopback/rest";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class AuthentificationController {
  // constructor (
  //   @inject(UserServiceBindings.USER_SERVICE) protected user: UserService<User, AuthData>) {}

  @post("/login")
  authentification(@requestBody() authData: AuthData): ReponseLogin {
    console.log(authData);

    let repLogin = new ReponseLogin(); // création instance => new

    // repLogin.token = new Date().toISOString();

    let compteurMa: number = 0;
    let compteurMi: number = 0;
    let compteurC: number = 0;


    // !! COMPTEUR IDENTIFIANT !! //

    let ident: string = <string>authData.identifiant;

    for (let index = 0; index < ident.length; index++) {

      let currentChart = ident.charAt(index); // renvoie string indiqué dans argument
      let currentCU = currentChart.toUpperCase(); // recherche Majuscules / sinon Minuscules
      let currentCN = parseInt(currentChart); // recherche Chiffres


      if (!isNaN(currentCN)) {
        console.log("is number");
        compteurC++;
      } else {
        console.log("is not a number");
        if (currentChart !== currentCU) {
          console.log("c'est une minuscule");
          compteurMi++;
        } else {
          console.log("c'est une majuscule ");
          compteurMa++;
        }
      }
    }

    // !! COMPTEUR PASSWORD !! //

    let pwd: string = <string>authData.password;

    for (let i = 0; i < pwd.length; i++) { // compteur

      let pwdChart = pwd.charAt(i);
      let pwdCU = pwdChart.toUpperCase();
      let pwdCN = parseInt(pwdChart);

      if (!isNaN(pwdCN)) {
        console.log("is number");
        compteurC++;
      } else {
        console.log("is not a number");
        if (pwdChart !== pwdCU) {
          console.log("minuscule");
          compteurMi++;
        } else {
          console.log("majuscule");
          compteurMa++;
        }
      }
    }
    repLogin.token = `nombre de Majuscule ${compteurMa}, nombre de Minuscule ${compteurMi}, nombre de chiffre ${compteurC} `;

    return repLogin;
  }


  
  }

