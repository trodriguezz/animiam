import { Component, OnInit } from '@angular/core';
import { AnimauxService } from '../services/animaux.service';
import { AlimentService } from '../services/aliment.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-menu',
  templateUrl: './select-menu.component.html',
  styleUrls: ['./select-menu.component.css']
})
export class SelectMenuComponent implements OnInit {

  constructor(private svrAnimaux: AnimauxService, private svrAliment: AlimentService, public svrAlert: AlertService, private router: Router) { }

  animaux: any = [];
  aliments: any = [];

  ngOnInit() { }

  onSubmit() {

    // const searchResult = new Result;

    // searchResult.animal = this.formSelect.value.animal;
    // searchResult.aliment = this.formSelect.value.animal;

    // * Liste animaux db
    this.svrAnimaux.getAllAnimaux().subscribe(
      (dataReponse: any) => {
        console.log(dataReponse);
        this.animaux = dataReponse;
        this.svrAlert.addSuccess("Viandes, poissons et légumes doivent être servis avec modération et toujours bouillis (JAMAIS CRUS) afin d'éviter toutes transmitions de bactéries et permettant par la même occasion de faciliter la digestion !");
      },
      (err: any) => {
        console.error(err);
      });

    // * Liste aliment db
    this.svrAliment.getAllAliment().subscribe(
      (data: any) => {
        console.log(data);
        this.aliments = data;
      },
      (err: any) => {
        console.error(err);
      });
    //  data.forEach(aliment => {
    //    aliment.type = ;
    //  });

    // console.log(searchResult);
  }


  formSelect: FormGroup = new FormGroup
    ({
      animal: new FormControl(""),
      aliment: new FormControl(""),
    });





}

// (data) => {
//   this.svrAlert.addError("Viandes, poissons et légumes doivent être servis avec modération et toujours bouillis (JAMAIS CRUS) afin d'éviter toutes transmitions de bactéries et permettant par la même occasion de faciliter la digestion !");
// },
// (err: any) => {
//   console.error(err);
// }