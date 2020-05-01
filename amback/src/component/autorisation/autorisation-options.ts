
import { AuthorizationOptions, AuthorizationDecision } from "@loopback/authorization";

export const autorisationOptions : AuthorizationOptions = {
  precedence : AuthorizationDecision.DENY,
  defaultDecision : AuthorizationDecision.DENY
};
