import { bind, /* inject, */ BindingScope, inject } from '@loopback/core';
import { TokenService } from '@loopback/authentication';
import { UserProfile, securityId } from "@loopback/security";
import { promisify } from 'util';
import { HttpErrors, RestBindings } from '@loopback/rest';
import { sign , verify } from "jsonwebtoken";
import { Request } from "express-serve-static-core";
//
//import { UserProfileCustom } from '../class/UserProfilCustom';
import { AddressInfo } from 'net';
import { TokenNS } from '../types';

//const signAsync = promisify(sign);
const verifyAsync = promisify(verify);




@bind({ scope: BindingScope.TRANSIENT })
export class JwtService implements TokenService {

  constructor(
    @inject(TokenNS.TOKEN_SECRET)
    private jwtSecret: string,
    @inject(TokenNS.TOKEN_EXPIRES_IN)
    private jwtExpiresIn: number,
    @inject(RestBindings.Http.REQUEST) public request: Request
  ) { }


  /**
   *
   * @param decryptedToken
   */
  public getInfoToken(decryptedToken: any): UserProfile {

    let userProfile: UserProfile;

    userProfile = Object.assign(
      { [securityId]: decryptedToken.id },
      { id: '', name: '', profile: '' },
      { id: decryptedToken.id, name: decryptedToken.name, profile: decryptedToken.profile }
    );

    return userProfile;
  }

  /**
   *
   * @param token
   */
  async verifyToken(token: string): Promise<UserProfile> {

    if (!token) {
      throw new HttpErrors.Unauthorized(
        `erreur`,
      );
    }

    let userProfile: UserProfile;

    try {
      // decode user profile from token
      const decryptedToken: any = await verifyAsync(token, this.jwtSecret);

      userProfile = this.getInfoToken(decryptedToken);

      const addQury: AddressInfo = this.request.connection.address() as AddressInfo;
      console.log(addQury)

      if (addQury.address !== decryptedToken.add.address) {
        throw new HttpErrors.Unauthorized(
          `erreur`,
        );
      }

    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token: ${error.message}`,
      );
    }

    return userProfile;

  }


  //
  // generation du jeton
  //
  async generateToken(userProfile: UserProfile): Promise<string> {

    if (!userProfile) {
      throw new HttpErrors.Unauthorized(
        'erreur',
      );
    }

    console.log(`Generate ${JSON.stringify(userProfile)}`);
    // Generate a JSON Web Token
    let token: string;
    const obj4Token: any = userProfile;

    try {
      token = <string> sign(userProfile, this.jwtSecret,{
        expiresIn: this.jwtExpiresIn
      });
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error`);
    }

    return token;
    
  }

}
