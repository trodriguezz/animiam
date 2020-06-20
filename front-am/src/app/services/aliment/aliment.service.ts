import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnimauxService } from '../animaux/animaux.service';
import { Aliment } from 'src/app/class/aliment/aliment';

@Injectable({
  providedIn: 'root'
})

export class AlimentService {

  typeOfAliments: any[] = [];
  resultSearch: any[] = [];

  foodData: Aliment[];

  filterAliment: string;
  filterAnimal: string;

  // Injection module Angular "HttpClient"
  constructor(private http: HttpClient, private srvAnimaux: AnimauxService) { }

  // Fonction getAllAliment() va se connecter à bdd et récuperer (GET) liste de tous les aliments
  getAllAliment(): Observable<boolean> {
    return this.http.get<Aliment[]>("http://localhost:3000/aliments").pipe(map((data) => {
      this.foodData = data;
      console.log("Collection d'aliments récupérée");
      return true; // données ajouter au service;
    }
    ))
  }

  getAllTypes(): Observable<void> {
    return this.http.get<any[]>("http://localhost:3000/aliments").pipe(map((data) => {
      this.typeOfAliments = this.removeDuplicates(data);
    }
    ))
  }

  // Supprimer les doublons
  removeDuplicates(data) {
    let unique = []; // Déclaration d'un nouveau tableau unique
    data.forEach(element => { // Parcours du tableau de données
      let type = element.type; // Affectation du type pour chaque element du tableau
      if (!unique[type]) { // si unique différent du type 
        unique[type] = true; // alors si valeur true insère la clé dans tableau unique
      }
    });
    return Object.keys(unique); // retourne un objet possédant les clés du tableau de string unique
  }

  // * Méthode filter
  // @param data : array, tableau de données
  // @param max : number, nombre de type d'animaux (récupéré avec la méthode count du service animaux)
  // @param foodtype : string, type d'aliment
  // @param animaltype : string, type d'animaux

  filter(data: any[], max: number, foodtype: string, animaltype: string) {
    let filterData = [/* empty */]; // création d'un nouveau tableau vide
    // parcourir data
    data.forEach(element /* = aliment */ => {
      // vérifier si le type de l'élément correspond à foodtype
      if (element.type === foodtype) {
        // si c'est le cas ...
        // pour chaque type d'animaux existant
        for (let i = 0; i <= max; i++) {
          // vérifier si type d'animal correspond à animaltype
          if (element.animaux[i] === animaltype) {
            // si c'est le cas ...
            // ajouter l'élément au tableau filterData
            filterData.push(element);
          }
        } // fin de la boucle for
      }
    }); // fin de la boucle forEach
    return filterData;
  }

}