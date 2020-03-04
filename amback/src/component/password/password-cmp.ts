import { Component, Binding, createBindingFromClass } from "@loopback/core";
import { PasswordNS } from "./types";
import { PasswordHasherService } from "./services/password-hasher.service";

export class PasswordCmp implements Component {

  bindings = [
    new Binding<number>(PasswordNS.ROUNDS).to(10),
    createBindingFromClass(PasswordHasherService , PasswordNS.PASSWORD_HASHER)
  ]

}
