import { Component, OnInit } from '@angular/core';
import { AnimauxService } from '../../services/animaux/animaux.service';
import { AlimentService } from '../../services/aliment/aliment.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Select } from '../../class/select/select';
import { element } from 'protractor';

@Component({
  selector: 'app-newSelect-menu',
  templateUrl: './select-menu.component.html',
  styleUrls: ['./select-menu.component.css']
})

export class SelectMenuComponent implements OnInit {

  constructor(private svrAnimaux: AnimauxService, private svrAliment: AlimentService, private router: Router) { }

  animaux: any = [];
  aliments: any = [];

  formSelect: FormGroup = new FormGroup({
    animal: new FormControl("", Validators.required), // validors = champs requis
    aliment: new FormControl("", Validators.required)
  });

  ngOnInit() {

    // récupération types animaux
    this.svrAnimaux.getAllAnimaux().subscribe(
      (data) => {
        this.animaux = data;
      },
      (error) => {
        console.log(error);
      });

    // récupération types aliments
    this.svrAliment.getAllTypes().subscribe(
      (rep) => {
        this.aliments = this.svrAliment.typeOfAliments;
      },
      (error) => {
        console.log(error);
      })
  }

  onSubmit() {

    this.svrAliment.filterAnimal = this.formSelect.value.animal;
    console.log(this.svrAliment.filterAnimal);
    this.svrAliment.filterAliment = this.formSelect.value.aliment;
    console.log(this.svrAliment.filterAliment);

    this.router.navigate(['table']);
  }

}