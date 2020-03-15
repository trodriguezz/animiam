import { Component, OnInit } from '@angular/core';
import { AlimentService } from '../services/aliment.service';

@Component({
  selector: 'app-table-select',
  templateUrl: './table-select.component.html',
  styleUrls: ['./table-select.component.css']
})
export class TableSelectComponent implements OnInit {

  constructor(private srvAliments: AlimentService) { }

 // ! liste aliments dans array
 aliments = [];

  ngOnInit() {
    this.srvAliments.getAllAliment().subscribe(
      (dataReponse: any[]) => {
        this.aliments = dataReponse;
      },
      (err: any) => {
        console.error(err);
      }
    );
  }
}

//  aliments = [
//   {
//     id: 1,
//     name: "saumon",
//     status: "ok",
//   },
//   {
//     id: 2,
//     name: "cabillaud",
//     status: "ok",
//   },
//   {
//     id: 3,
//     name: "thon",
//     status: "ko",
//   },
//   {
//     id: 4,
//     name: "sardine",
//     status: "ok",
//   },
// ]