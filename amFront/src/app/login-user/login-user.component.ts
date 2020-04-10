import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Login } from '../login';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

 // ! Constructeur / injection de dépendance
 constructor(private loginService: LoginService, private router: Router, public svrAlert: AlertService) { }

 // ! Fonction appelée lors de l'initialisation du constructeur (ou controleur ??)
 ngOnInit() {
 }

 // ! fonction onSubmit() appelé lors de du sbmit du formLogin
  onSubmit() {
    const loginUser = new Login(); // Création new instance et affectation à loginUser

    loginUser.pseudo = this.formLogin.value.pseudo;
    loginUser.password = this.formLogin.value.password;

    this.loginService.loginUser(loginUser).subscribe(
      (data) => {
        console.log(data);
        this.svrAlert.addSuccess("Vous êtes connecté !");
        this.router.navigate(['']);
      },
      (error) => {
        console.error(error);
        this.svrAlert.addError("Erreur lors de l'authentification ! Veuillez réessayer !")
      });

    console.log(loginUser);
  }

  formLogin: FormGroup = new FormGroup({
    password: new FormControl(""),
    pseudo: new FormControl("")

  });

}
