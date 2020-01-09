import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html', //Fichier HTML contenant le bouton
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
//Constructeur / injection de dépendance
  constructor(private userService: UserService) { }
//Fonction appelée lors de l'initialisation du contrôleur
  ngOnInit() {
  }
  //Fonction appelée lors du clic
  onClick(){
    const newUser = new User(); // creation instance
    newUser.email = "toto@gmail.fr";
    newUser.nom = "sgjilrj";
    newUser.password = "efjef";
    newUser.prenom = "jgjrgj";
    newUser.pseudo = "nkjg";
    this.userService.createUser(newUser).subscribe(
      // => = lambda expression
      (data)=>{
        console.log(data);
      },
      (error)=>{
        console.log(error);
      }

    );
    console.log("clique sur bouton 'inscription' OK");
    console.log(newUser);
  }

  OnSubmit(form, ngForm) {
    const username = form.value['username'];
    const firstname = form.value['firstname'];
    const name = form.value['name'];
    const email = form.value['email'];
    const password = form.value['password'];
  }

}
