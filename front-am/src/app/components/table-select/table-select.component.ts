import { Component, OnInit } from '@angular/core';
import { AlimentService } from '../../services/aliment/aliment.service';
import { AnimauxService } from 'src/app/services/animaux/animaux.service';

@Component({
  selector: 'app-table-select',
  templateUrl: './table-select.component.html',
  styleUrls: ['./table-select.component.css']
})
export class TableSelectComponent implements OnInit {

  constructor(public srvAliments: AlimentService, public svrAnimaux: AnimauxService) { }

  ngOnInit() {

    console.log(this.srvAliments.resultSearch);

    
  }

  //* fonction getColor() = si status aliment "ok" alors vert
  getColor(status) {
    if (status === "ok") {
      return "green";
    } else if (status === "ko") {
      return "red";
    }
  }
}