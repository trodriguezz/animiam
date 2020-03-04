import { BindingKey } from "@loopback/core";

export namespace PasswordNS{

  export interface IPasswordHasher {
    hashPassword(password: string): Promise<string>;
    comparePassword(providedPass: string, storedPass: string): Promise<boolean>
  }

  export const PASSWORD_HASHER = BindingKey.create<IPasswordHasher>(
    'password.hasher',
  );

  export const ROUNDS = BindingKey.create<number>('password.hasher.round');

}


