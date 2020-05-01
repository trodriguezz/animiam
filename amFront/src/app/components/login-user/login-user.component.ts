import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Login } from '../../class/login/login';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})

export class LoginUserComponent implements OnInit {

  //! Constructeur / injection de dépendance
  constructor(private svrUser: UserService, private router: Router, public svrAlert: AlertService) { }

  //! Fonction appelée lors de l'initialisation du cycle de vie du composant
  ngOnInit() {
  }

  //! fonction onSubmit() appelé lors du submit du formLogin
  onSubmit() {

    // Création new instance (= new objet) Login et affectation à let loginUser
    let loginUser = new Login();
    
    loginUser.pseudo = this.formLogin.value.pseudo.trim(); // trim() = vérifie si espaces avant et après saisie
      if (loginUser.pseudo.indexOf('@') == -1) {
         loginUser.email = false;
      } else {
         loginUser.email = true;
      }

    loginUser.password = this.formLogin.value.password;

    this.svrUser.authentification(loginUser).subscribe(
      (dataReponse) => {
        console.log(dataReponse);
        this.svrAlert.addSuccess("Vous êtes connecté !");
        this.router.navigate(['']);
      },
      (error) => {
        console.error(error);
        this.svrAlert.addError("Erreur lors de l'authentification ! Veuillez réessayer !")
      });
    //console.log(loginUser);
  }

  formLogin: FormGroup = new FormGroup({
    password: new FormControl(""),
    pseudo: new FormControl("")

  });
}
