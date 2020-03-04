import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-aliment',
  templateUrl: './aliment.component.html',
  styleUrls: ['./aliment.component.css']
})
export class AlimentComponent implements OnInit {

  @Input () foodName: string;
  @Input () foodStatus: string;
  @Input () foodId: number;

  constructor() { }

  ngOnInit() {
  }

  // * méthode getColor() = si status aliment "ok" alors vert
  getColor() {
    if (this.foodStatus === "ok") {
      return "green";
    } else if (this.foodStatus === "ko") {
      return "red";
    }
  }


}
