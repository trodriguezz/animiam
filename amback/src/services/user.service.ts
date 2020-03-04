import { bind, /* inject, */ BindingScope, inject } from '@loopback/core';
import { UserService } from '@loopback/authentication';
import { User } from '../models';
import { repository } from '@loopback/repository';
import { UserRepository } from '../repositories';
import { AuthData } from '../class/authData';
import { HttpErrors } from '@loopback/rest';
import { UserProfile, securityId } from '@loopback/security';
import { PasswordNS } from '../component/password/types';

@bind({ scope: BindingScope.TRANSIENT })
export class UserAmService implements UserService<User, AuthData> {

  constructor(@repository(UserRepository) private repo: UserRepository) { }
  @inject(PasswordNS.PASSWORD_HASHER) private hasher: PasswordNS.IPasswordHasher;


  // ** ZONE DES FONCTIONS DE L'INTERFACE ** //
  async verifyCredentials(credentials: AuthData): Promise<User> { // retour f = Promise de type User
    const usrRead = await this.repo.findOne({ where: { pseudo: credentials.identifiant } });

    if (!usrRead) {
      throw new HttpErrors.Unauthorized("Erreur user / password !");
    }

    // ** VERIFICATION PASSWORD ** //
    if (usrRead.password != credentials.password) {
      throw new HttpErrors.Unauthorized("Erreur user / password !");
    }

    // ** TEST DU MOT DE PASSE ** //
    const isOK = await this.hasher.comparePassword(<string>credentials.password, usrRead.password);

    if (!isOK) {
      throw new HttpErrors.Unauthorized("Erreur user / password !");
    };


    return usrRead;

  }


  convertToUserProfile(user: User): import("@loopback/security").UserProfile {
    throw new Error("Method not implemented.");
  }


}
