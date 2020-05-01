import { Authentication } from "../class/authentication.class";
import { Token } from "../class/token.class";
import { HttpErrors, requestBody, post, get } from "@loopback/rest";
import { repository } from "@loopback/repository"
import { inject } from "@loopback/core";
import { UserService, TokenService, authenticate } from "@loopback/authentication";
import { UserServiceBindings } from "../key";
import { User } from "../models";
import { UserRepository } from "../repositories";
import { TokenNS } from "../component/authentication/types";
import { PasswordNS } from "../component/password";
import { UserProfile } from "@loopback/security"


// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';

export class AuthentificationController {
   constructor(
      @repository(UserRepository) private repository: UserRepository,
      @inject(UserServiceBindings.USER_SERVICE) private userService: UserService<User, Authentication>,
      @inject(TokenNS.TOKEN_SERVICE) private tokenService: TokenService,
      @inject(PasswordNS.PASSWORD_HASHER) private hasher: PasswordNS.IPasswordHasher
   ) { }

   @post("/login")
   public async authentication(@requestBody() authentication: Authentication): Promise<Token> {
      // Vérifier si l'utilisateur se connecte à l'aide de son pseudo ou de son email
      console.log("authentication", authentication);
      
      const userTemp = await this.userService.verifyCredentials(authentication);
      console.log(userTemp, "authentication");
      
      // Si le pseudo ou l'email n'est pas enregistré dans la BDD
      if (!userTemp) {
         // Alors ... Retourner un message d'erreur
         throw new HttpErrors.Forbidden('Identifiant incorrect');
      }
      // Comparer les mots de passe
      const passwordIsMatched = await this.hasher.comparePassword(authentication.password, userTemp.password);

      // Si le mot de passe saisie ne correspond pas à celui enregistré dans la BDD
      if (!passwordIsMatched) {
         // Alors ... Retourner un message d'erreur
         throw new HttpErrors.Forbidden('Identifiant incorrect');
      }

      // Récupération des données de l'utilisateur authentifié
      const profile: UserProfile = this.userService.convertToUserProfile(userTemp);

      // Génération d'un nouveau token (chaîne de caractère) à partir des données récupérées
      const newToken: string = await this.tokenService.generateToken(profile);

      // Création d'une nouvelle instance (token à retourner)
      const rep = new Token();

      // Affectation des valeurs
      rep.token = newToken;
      rep.id = <string>userTemp.id;
      rep.pseudo = userTemp.pseudo;
      rep.email = userTemp.email;
      rep.prenom = userTemp.prenom;
      rep.nom = userTemp.nom;

      // Retourner le Token
      return rep;
   }
}