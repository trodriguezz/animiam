import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  setTimeOut(arg0: number) {
    throw new Error("Method not implemented.");
  }

  constructor() { }

  alertInfo: any = {
    type:"",
    message:""

  }

  addSuccess(message: string):void {
    this.alertInfo.type = "success";
    this.alertInfo.message = message;
    this.startTempo();

  }

  addError(message: string):void {
    this.alertInfo.type = "danger";
    this.alertInfo.message = message;
    this.startTempo();

  }

  startTempo() {
    setTimeout( 
      () => {
      this.alertInfo.type = "";
      this.alertInfo.message = "";
    },
    3000 );
  }
}
