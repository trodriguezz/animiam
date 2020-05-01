import { Component, OnInit } from '@angular/core';
import { AnimauxService } from '../../services/animaux/animaux.service';
import { AlimentService } from '../../services/aliment/aliment.service';
import { AlertService } from '../../services/alert/alert.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Select } from '../../class/select/select';

@Component({
  selector: 'app-newSelect-menu',
  templateUrl: './select-menu.component.html',
  styleUrls: ['./select-menu.component.css']
})

export class SelectMenuComponent implements OnInit {

  constructor(private svrAnimaux: AnimauxService, private svrAliment: AlimentService, public svrAlert: AlertService, private router: Router) { }

  animaux: any = [];
  aliments: any = [];

  ngOnInit() {

    this.svrAnimaux.getAllAnimaux().subscribe(
      (data) => {
        this.animaux = data;
      },
      (error) => {
        console.log(error)
      });

    this.svrAliment.getAllAliment().subscribe(
      (data) => {
        this.aliments.filter((item, index) => this.aliments.indexOf(item) !== index);
        this.aliments = data;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  onSubmit() {

    const newSelect = new Select();

    newSelect.animal = this.formSelect.value.animal;
    newSelect.aliment = this.formSelect.value.aliment;

    this.svrAliment.getAllAliment().subscribe(
      (data) => {
        this.aliments = Select;
        console.log(data);
      },
      (error) => {
        console.log(error)
      }
    );

    this.svrAnimaux.getAllAnimaux().subscribe(
      (data) => {
        this.animaux = Select;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );

    this.router.navigate(['table']);
  }

  formSelect: FormGroup = new FormGroup({
    animal: new FormControl(""),
    aliment: new FormControl("")
  });

}

 // //* 3e essai"
  // getOneTypeOfAliment(): Observable<any> {
  //   return this.http.get<any>("http://localhost:3000/aliments?filter[where][type]=fruit");
  // }

  // getOneTypeOfAnimaux(): Observable<boolean>{
  //   return this.http.get<boolean>("http://localhost:3000/animaux").pipe(map(
  //     (data) =>{this.animaux=data;
  //     return true})
  //     )
  // }


  //!--------------------------------------------------------------
  //* 2e essai
  //   const newSelect = new newSelect;

  //   newSelect.animal = this.formSelect.value.animal;
  //   newSelect.aliment = this.formSelect.value.aliment;

  //  this.aliments.getAllAliment(

  //    (data) => {
  //      this.router.navigate(['table']);
  //      console.log(data);
  //    },

  //    (error) => {
  //      console.log(error);
  //    })


  // formSelect: FormGroup = new FormGroup
  // ({
  //   animal: new FormControl(""),
  //   aliment: new FormControl(""),
  // });


  //    console.log(newSelect);
  //!--------------------------------------------------------------
  //* 1er essai
  // // * Liste animaux db
  // this.svrAnimaux.getAllAnimaux().subscribe(
  //   (dataReponse: any) => {
  //     console.log(dataReponse);
  //     this.animaux = dataReponse;
  //     this.svrAlert.addSuccess("Viandes, poissons et légumes doivent être servis avec modération et toujours bouillis (JAMAIS CRUS) afin d'éviter toutes transmitions de bactéries et permettant par la même occasion de faciliter la digestion !");
  //   },
  //   (err: any) => {
  //     console.error(err);
  //   });

  // // * Liste aliment db
  // this.svrAliment.getAllAliment().subscribe(
  //   (dataReponse: any) => {
  //     console.log(dataReponse);
  //     this.aliments = dataReponse;
  //   },
  //   (err: any) => {
  //     console.error(err);
  //   });

  //  data.forEach(aliment => {
  //    aliment.type = ;
  //  });