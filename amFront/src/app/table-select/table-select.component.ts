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