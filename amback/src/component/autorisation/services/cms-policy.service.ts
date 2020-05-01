import { bind, /* inject, */ BindingScope, Provider, inject } from '@loopback/core';
import { Authorizer, AuthorizationContext, AuthorizationMetadata, AuthorizationRequest, AuthorizationDecision } from '@loopback/authorization';
import * as casbin from 'casbin';

function tranformeAction(actionBase: string) {
   const tab: string[] = actionBase.split(".");
   let retStr: string = actionBase;

   if (tab.length > 2) {
      retStr = `${tab[0]}.${tab[tab.length - 1]}`;
   }

   return retStr;
}

/*
 * Fix the service type. Possible options can be:
 * - import {CmsPolicy} from 'your-module';
 * - export type CmsPolicy = string;
 * - export interface CmsPolicy {}
 */

@bind({ scope: BindingScope.TRANSIENT })
export class CmsPolicyProvider implements Provider<Authorizer> {
   constructor(@inject('casbin.enforcer') private enforcer: casbin.Enforcer) { }

   value(): Authorizer {
      return this.authorize.bind(this);
   }

   async authorize(
      authorizationCtx: AuthorizationContext,
      metadata: AuthorizationMetadata,
   ) {
      const request: AuthorizationRequest = {
         subject: authorizationCtx.principals[0].profile,
         object: tranformeAction(metadata.resource ?? authorizationCtx.resource),
         action: (metadata.scopes && metadata.scopes[0]) || 'execute',
      };

      const allow = await this.enforcer.enforce(
         request.subject,
         request.object,
         request.action,
      );

      if (allow) return AuthorizationDecision.ALLOW;
      else if (allow === false) return AuthorizationDecision.DENY;
      return AuthorizationDecision.ABSTAIN;
   }
}
