import { Component, Binding, createBindingFromClass } from "@loopback/core";
import { TokenNS } from "./types";
import { JwtService } from "./services/jwt.service";


export class BackAuthentication implements Component {

  bindings = [
    new Binding<string>(TokenNS.TOKEN_SECRET).to("@@??MotDePassePour_-Generation**token$$$"),
    new Binding<number>(TokenNS.TOKEN_EXPIRES_IN).to(600),
    createBindingFromClass(JwtService,TokenNS.TOKEN_SERVICE)
  ]

}
