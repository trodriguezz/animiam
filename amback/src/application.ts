import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { RepositoryMixin, SchemaMigrationOptions } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import { AuthenticationComponent, registerAuthenticationStrategy } from '@loopback/authentication';
import path from 'path';
import { MySequence } from './sequence';
import { BackAuthentication, JWTStrategy } from './component/authentication';
import { PasswordCmp } from './component/password/password-cmp';
import { UserRepository } from './repositories';
import { PasswordNS } from './component/password';
import { User } from './models';
import { UserAmService } from './services';
import { UserServiceBindings } from './key';

export class AmbackApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Ajout du composant d'authentification
    this.component(AuthenticationComponent);
    this.component(BackAuthentication);
    this.component(PasswordCmp);

    // Ajout de la strategy
    registerAuthenticationStrategy(this,JWTStrategy);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
  setupBindings(){
    // binding du service UserService
    this.bind(UserServiceBindings.USER_SERVICE).toClass(UserAmService);
  }

  // async migrateSchema(option?: SchemaMigrationOptions) {
  //   await super.migrateSchema(option);
  //   console.log("script d'installation/migration");

  //   let repoUser = await this.getRepository(UserRepository);

  //   if (!repoUser) {
  //     console.log("Pas de repo User");
  //     return; // TODO gestion erreur migrate
  //   }

  //   let userAdmin = await repoUser.findOne({
  //     where : {
  //       pseudo : "admin"
  //     }
  //   });

  //   if (userAdmin) {
  //     console.log("Admin déjà créé");
  //     return;
  //   }

  //   // ** RECHERCHE SERVICE DE HASH ** //
  //   const srvHash = await this.get(PasswordNS.PASSWORD_HASHER); // async

  //   if (!srvHash) {
  //     console.log("Pas de serive de hash");
  //     return; // TODO gestion erreur migrate
  //   }

  //   userAdmin = new User();
  //   userAdmin.pseudo = "admin";
  //   userAdmin.email = "admin@ici.com";
  //   userAdmin.prenom = "admin";
  //   userAdmin.nom = "admin";
  //   userAdmin.password = await srvHash.hashPassword("admin1234");

  //   const afterWrite = await repoUser.create(userAdmin);

  //   if (!afterWrite) {
  //     console.log("Erreur création admin");
  //   }

  // }
}
