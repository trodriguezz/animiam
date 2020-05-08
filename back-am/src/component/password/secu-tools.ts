
import {genSalt, hash} from 'bcryptjs';


export type HashPassword = (
    password: string,
    rounds: number,
  ) => Promise<string>;
  // bind function to `services.bcryptjs.HashPassword`
  export async function hashPassword(
    password: string,
    rounds: number,
  ): Promise<string> {
    const salt = await genSalt(rounds);
    return hash(password, salt);
  }
  
  export interface PasswordHasher<T = string> {
    hashPassword(password: T): Promise<T>;
    comparePassword(providedPass: T, storedPass: T): Promise<boolean>;
  }