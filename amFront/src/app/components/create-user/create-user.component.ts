import { Component, OnInit } from '@angular/core';
import { User } from '../../class/user/user';
import { UserService } from '../../services/user/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html', //Fichier HTML contenant le bouton
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  // * Constructeur / injection de dépendance
  constructor(private userService: UserService, private router: Router, public srvAlert: AlertService) { }

  // * ngOnInit() = fonction appelée lors de l'initialisation du contrôleur
  ngOnInit() { }

  // * onSubmit() = fonction appelée lors de la soumission du formulaire
  onSubmit() {

    const newUser = new User(); // creation new instance (new objet) et affectation à newUser

    newUser.email = this.loginForm.value.email;
    newUser.nom = this.loginForm.value.nom;
    newUser.password = this.loginForm.value.password;
    newUser.prenom = this.loginForm.value.prenom;
    newUser.pseudo = this.loginForm.value.pseudo;

    this.userService.createUser(newUser).subscribe( // subscribe = car renvoie (souscrit) a un observable
      (data) => {
        this.srvAlert.addSuccess("Félicitations ! Votre compte a été créé avec succès !");
        this.router.navigate(['']);
        console.log(data);
      },
      (error) => {
        this.srvAlert.addError("Une erreur est survenue lors de la création de votre compte ! Veuillez réessayer !");
        console.log(error);
      }
    );
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(""),
    nom: new FormControl(""),
    password: new FormControl(""),
    prenom: new FormControl(""),
    pseudo: new FormControl("")
  });

}
