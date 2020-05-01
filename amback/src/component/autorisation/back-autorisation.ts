import { Component, Binding } from "@loopback/core";
import { AuthorizationTags } from '@loopback/authorization';
import { createEnforcer } from "./services/enforcer";
import { CmsPolicyProvider } from "./services/cms-policy.service";

export class BackAutorisation implements Component{
  bindings = [
   new Binding('casbin.enforcer').toDynamicValue(createEnforcer),
   new Binding('authorizationProviders.casbin-provider').toProvider(CmsPolicyProvider).tag(AuthorizationTags.AUTHORIZER)
  ];
}
