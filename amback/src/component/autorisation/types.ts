import { UserProfile } from "@loopback/security";


export namespace AutoristaionNS {
   export interface IAutorisation {
      isInProfile(user: UserProfile, profile: string): Promise<boolean>;
   }
}
