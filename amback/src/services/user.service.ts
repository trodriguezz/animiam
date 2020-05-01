import { bind, /* inject, */ BindingScope } from '@loopback/core';
import { UserService } from '@loopback/authentication';
import { repository, Filter } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { UserProfile, securityId } from '@loopback/security';
// Ani'Miam
import { Authentication } from '../class/authentication.class';
import { UserRepository } from '../repositories';
import { User } from '../models';

@bind({ scope: BindingScope.TRANSIENT })

export class UserAmService implements UserService<User, Authentication> {

  constructor(
    @repository(UserRepository) private userRepo: UserRepository,
 ) { }

 async verifyCredentials(credentials: Authentication): Promise<User> {
    console.log("verifyCredentials", credentials);
    const userTemp: User | null = await this.findUser(credentials);
    if (!userTemp) {
       throw new HttpErrors.Forbidden("Identifiant incorrect");
    }
    return userTemp;
 }

 private async findUser(authentication: Authentication) {

   console.log("findUser", authentication);

    // Déclare la constante dans laquelle sera affectée le filtre de la futur requête HTTP findOne(filtre)
    const queryTemp: Filter<User> = {};

    // Vérifie si l'utilisateur se connecte avec son email ou son pseudo
    // Si il se connecte avec son email
    if (authentication.email) {
       // Alors ... Le filtre de la requête est :
       queryTemp.where = { 'email': authentication.pseudo }
    } else {
       // Sinon (l'utilisateur se connecte avec son pseudo), le filtre de la requête est :
       queryTemp.where = { 'pseudo': authentication.pseudo }
    }
    // Retourne l'éxécution asynchrone de la requête HTTP findOne(filtre)
    return await this.userRepo.findOne(queryTemp);
 }

 convertToUserProfile(user: User): UserProfile {

   console.log("convertToUserProfile", user);
    
    const userProfile: UserProfile = {
       [securityId]: `${user._id}`,
       id: user.id,
       pseudo: user.pseudo,
       email: user.email,
       prenom: user.prenom,
       nom: user.nom,
    }
    return userProfile;
 }

}

// constructor(
//   @repository(UserRepository) private repo: UserRepository
//   ) { }

// @inject(PasswordNS.PASSWORD_HASHER) private hasher: PasswordNS.IPasswordHasher;


// //* ZONE DES FONCTIONS DE L'INTERFACE
// async verifyCredentials(credentials: Authentication): Promise<User> { // retour f = Promise de type User
//   const usrRead = await this.repo.findOne({ where: { pseudo: credentials.pseudo } });

//   if (!usrRead) {
//     throw new HttpErrors.Unauthorized("Erreur user / password !");
//   }

//   //* VERIFICATION PASSWORD
//   if (usrRead.password != credentials.password) {
//     throw new HttpErrors.Unauthorized("Erreur user / password !");
//   }

//   //* TEST DU MOT DE PASSE
//   const isOK = await this.hasher.comparePassword(<string>credentials.password, usrRead.password);

//   if (!isOK) {
//     throw new HttpErrors.Unauthorized("Erreur user / password !");
//   };


//   return usrRead;

// }


// convertToUserProfile(user: User): import("@loopback/security").UserProfile {
//   throw new Error("Method not implemented.");
// }