import { Component, OnInit } from '@angular/core';
import { AlimentService } from '../../services/aliment/aliment.service';
import { AnimauxService } from 'src/app/services/animaux/animaux.service';

@Component({
  selector: 'app-table-select',
  templateUrl: './table-select.component.html',
  styleUrls: ['./table-select.component.css']
})
export class TableSelectComponent implements OnInit {

  constructor(private srvAliments: AlimentService, private svrAnimaux: AnimauxService) { }

  aliments = [];

  ngOnInit() {

    // récupérer nbr animaux
    this.svrAnimaux.countAnimaux().subscribe(
      (rep1) => {
        // récupérer les aliments (foodData)
        this.srvAliments.getAllAliment().subscribe(
          (rep2) => {
            console.log("début du filtre :", this.aliments);
            // filtrer foodData
            this.aliments = this.srvAliments.filter(
              this.srvAliments.foodData,
              this.svrAnimaux.nbrAnimaux,
              this.srvAliments.filterAliment,
              this.srvAliments.filterAnimal);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    )
  }
}