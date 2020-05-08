import { BindingKey } from "@loopback/core";
import { TokenService } from "@loopback/authentication";


export namespace TokenNS {

  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  );

  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expires.in.seconds',
  );

  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.authentication.jwt.tokenservice',
  );

}
