import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(public srvAlert: AlertService) { }



  ngOnInit() {
  }

}
