import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AnimauxService } from 'src/app/services/animaux/animaux.service';
import { CurrentUserService } from 'src/app/services/current-user/current-user.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Aliment } from 'src/app/class/aliment/aliment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // tableau de collections
  public collectionsTab: string[] = ["Aliments", "Animaux", "Message", "User"];
  public selectedCollection: string = undefined;

  public myFormGroup: FormGroup = new FormGroup({
    collectionFormName: new FormControl(""),
    crudFormName: new FormControl(""),

    animauxFormName: new FormControl(""),
    animalCreateFormName: new FormControl(""),
    animalReadFormName: new FormControl(""),
    animalUpdateFormName: new FormControl(""),
    animalDeleteFormName: new FormControl("")
  }
  );

  // choix options model CRUD
  public crudOptions: string[] = ["Créer", "Voir", "Modifier", "Supprimer"];
  // fonction renvoie condition if
  public selectedCrudOption: string = undefined;
  // tableau animaux bdd
  public animauxTab: any[] = [];
  // affichage select option crud
  public displayForm: string = null;



  // public selectedAnimal: string = "";

  constructor(
    public srvAlerte: AlertService,
    public srvCurrent: CurrentUserService,
    public srvAnimaux: AnimauxService) { }

  ngOnInit() {
    this.reset();

    this.srvAnimaux.getAllAnimaux().subscribe(
      (data) => {
        this.animauxTab = data;
      }, (err) => { console.log(err); }
    )
  }

  private reset() {
    this.displayForm = null;
  }

  selectCollectionOnClick() {
    this.selectedCollection = this.myFormGroup.value.collectionFormName;
    console.log(this.selectedCollection);
  }

  selectCrudOptionOnClick() {
    this.selectedCrudOption = this.myFormGroup.value.crudFormName;
    console.log(this.selectedCrudOption);
    // si option crud create alors ...
    if (this.selectedCollection === "Animaux" && this.selectedCrudOption === "Créer") {
      this.displayForm = "createAnimalById";
      // sinon si option crud read alors ...
    } else if (this.selectedCollection === "Animaux" && this.selectedCrudOption === "Voir") {
      this.displayForm = "readAnimalById";
      // sinon si option crud update alors ...
    } else if (this.selectedCollection === "Animaux" && this.selectedCrudOption === "Modifier") {
      this.displayForm = "updateAnimalById";
      // sinon si option crud delete alors ...
    } else if (this.selectedCollection === "Animaux" && this.selectedCrudOption === "Supprimer") {
      this.displayForm = "deleteAnimalById";
    }
  }


  onSubmit() {
    console.log(this.myFormGroup.value);
  }

  // create animal
  createAnimalById() {
    if (this.srvCurrent.profile === 'admin') {
      let newData = {
        type: this.myFormGroup.value.animalCreateFormName,
      }
      this.srvAnimaux.createAnimalById(newData).subscribe(
        (rep) => {
          this.srvAlerte.addSuccess("Création réussie !");
          console.log(rep);
          this.ngOnInit(); // réinitialisation du composant;
        },
        (err) => {
          this.srvAlerte.addError("Une erreur est survenue !");
          console.log(err);
        }
      ) // fin du subscribe
    }
  }

  // * read animal
  // readAnimalById() {
  //   if (this.srvCurrent.profile === 'admin') {
  //     let animalId = this.myFormGroup.value.animauxFormName;
  //     console.log(this.myFormGroup.value.animauxFormName);

  //     this.srvAnimaux.readAnimalById(animalId).subscribe(
  //       (rep) => {
  //         this.srvAlerte.addSuccess("Vue réussie !");
  //         console.log(rep);
  //         this.ngOnInit(); // réinitialisation du composant;
  //       },
  //       (err) => {
  //         this.srvAlerte.addError("Une erreur est survenue !");
  //         console.log(err);
  //       }
  //     ) // fin du subscribe
  //   }
  // }

  // * update animal
  updateAnimalById() {
    if (this.srvCurrent.profile === 'admin') {
      let animalId = this.myFormGroup.value.animauxFormName;
      console.log(this.myFormGroup.value.animauxFormName);
      let newData = {
        type: this.myFormGroup.value.animalUpdateFormName
      }
      this.srvAnimaux.updateAnimalById(animalId, newData).subscribe(
        (rep) => {
          this.srvAlerte.addSuccess("Modification réussie !");
          console.log(rep);
          this.ngOnInit(); // réinitialisation du composant;
        },
        (err) => {
          this.srvAlerte.addError("Une erreur est survenue !");
          console.log(err);
        }
      ) // fin du subscribe
    }
  }

  // * delete animal
  deleteAnimalById() {
    if (this.srvCurrent.profile === 'admin') {
      let animalId = this.myFormGroup.value.animauxFormName;
      console.log(this.myFormGroup.value.animauxFormName);

      this.srvAnimaux.deleteAnimalById(animalId).subscribe(
        (rep) => {
          this.srvAlerte.addSuccess("Suppression réussie !");
          console.log(rep);
          this.ngOnInit(); // réinitialisation du composant;
        },
        (err) => {
          this.srvAlerte.addError("Une erreur est survenue !");
          console.log(err);
        }
      ) // fin du subscribe
    }
  }
}