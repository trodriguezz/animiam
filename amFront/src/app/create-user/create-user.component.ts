import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html', //Fichier HTML contenant le bouton
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  //Constructeur / injection de dépendance
  constructor(private userService: UserService, private router: Router, public srvAlert: AlertService) { }
  //Fonction appelée lors de l'initialisation du contrôleur
  ngOnInit() {
  }

  // ** Fonction appelée lors de la soumition du form ** //
  onSubmit() {
    const newUser = new User(); // creation new instance et affectation à newUser

    newUser.email = this.formUser.value.email;
    newUser.nom = this.formUser.value.nom;
    newUser.password = this.formUser.value.password;
    newUser.prenom = this.formUser.value.prenom;
    newUser.pseudo = this.formUser.value.pseudo;

    this.userService.createUser(newUser).subscribe( // subscribe = car f renvoi un observable
      // => = lambda expression
      (data) => {
        console.log(data);
        this.srvAlert.addSuccess("Félicitations ! Votre compte a été créé avec succès !");
        this.router.navigate([''])
      },

      (error) => {
        console.log(error);
        this.srvAlert.addError("Une erreur est survenue lors de la création de votre compte ! Veuillez réessayer !");
      }

    );
  }

  formUser: FormGroup = new FormGroup({
    email: new FormControl(""),
    nom: new FormControl(""),
    password: new FormControl(""),
    prenom: new FormControl(""),
    pseudo: new FormControl("")
  });


}
