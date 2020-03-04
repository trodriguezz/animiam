import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-select',
  templateUrl: './table-select.component.html',
  styleUrls: ['./table-select.component.css']
})
export class TableSelectComponent implements OnInit {

  constructor() { }

 // ! liste aliments dans array
 aliments = [
  {
    id: 1,
    name: "saumon",
    status: "ok",
  },
  {
    id: 2,
    name: "cabillaud",
    status: "ok",
  },
  {
    id: 3,
    name: "thon",
    status: "ko",
  },
  {
    id: 4,
    name: "sardine",
    status: "ok",
  }
]

  ngOnInit() {
  }

  

}
