import { Component, OnInit } from '@angular/core';
import { AnimauxService } from '../services/animaux.service';

@Component({
  selector: 'app-select-menu',
  templateUrl: './select-menu.component.html',
  styleUrls: ['./select-menu.component.css']
})
export class SelectMenuComponent implements OnInit {

  constructor(private svrAnimaux: AnimauxService) { }

  animaux: any[] = [];

  ngOnInit() {
    this.svrAnimaux.getAllAnimaux().subscribe(
      (dataReponse: any[]) => {
        this.animaux = dataReponse;
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

}
