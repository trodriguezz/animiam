import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Login } from '../login';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
 // Constructeur / injection de dépendance
 constructor(private loginService: LoginService, private router: Router) { }
 // Fonction appelée lors de l'initialisation du contrôleur
 ngOnInit() {
 }

  onSubmit() {
    const loginUser = new Login(); // Création new instance et affectation à loginUser

    loginUser.pseudo = this.formLogin.value.pseudo;
    loginUser.password = this.formLogin.value.password;

    console.log(loginUser);
  }

  formLogin: FormGroup = new FormGroup({
    password: new FormControl(""),
    pseudo: new FormControl("")

  });

}
