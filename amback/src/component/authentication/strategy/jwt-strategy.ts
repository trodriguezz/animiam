import { AuthenticationStrategy, TokenService } from "@loopback/authentication";
import { UserProfile , securityId } from "@loopback/security";
import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject } from "@loopback/core";
import { HttpErrors } from "@loopback/rest";
import { TokenNS } from "../types";
export class JWTStrategy implements AuthenticationStrategy{

  name: string = "jwt"; // nom de la strategy

    constructor(@inject(TokenNS.TOKEN_SERVICE)
    public tokenService: TokenService,) {
    }

    //
    // utilitaire d'extraction du JWT
    //
    extractCredentials(request: Request): string {
        if (!request.headers.authorization) {
          throw new HttpErrors.Unauthorized(`erreur`);
        }

        const authHeaderValue = request.headers.authorization;

        if (!authHeaderValue.startsWith('Bearer')) {
          throw new HttpErrors.Unauthorized(
            `erreur.`,
          );
        }

        //split the string into 2 parts: 'Bearer ' and the `xxx.yyy.zzz`
        const parts = authHeaderValue.split(' ');
        if (parts.length !== 2)
          throw new HttpErrors.Unauthorized(
            `erreur`,
          );
        const token = parts[1];

        return token;
      }

    // methode d'autentification
    async authenticate(request: Request<ParamsDictionary>): Promise<UserProfile | undefined> {
        const token: string = this.extractCredentials(request);
        console.log(`get value token ${token}`);
        const userProfile: UserProfile = await this.tokenService.verifyToken(token);
        return userProfile;
    }

}
