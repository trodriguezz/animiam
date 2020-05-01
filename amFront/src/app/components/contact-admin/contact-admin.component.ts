import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin/admin.service';
import { Admin } from '../../class/admin/admin';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.css']
})
export class ContactAdminComponent implements OnInit {

  // * injection modules et services dans contructor
  constructor(private adminService: AdminService, private router: Router, public svrAlert: AlertService) { }

  ngOnInit() {
  }

  onSubmit() {

     const messageAdmin = new Admin;

     messageAdmin.email = this.formAdmin.value.email;
     messageAdmin.motif = this.formAdmin.value.motif;
     messageAdmin.textarea = this.formAdmin.value.textarea;

    this.adminService.contactAdmin(messageAdmin).subscribe(

      (data) => {
        this.svrAlert.addSuccess("Votre recommandation à bien été envoyée !");
        this.router.navigate(['']);
        //console.log(data);
      },

      (error) => {
        this.svrAlert.addError("Formulaire incomplet ! Veuillez réessayer !");
        //console.log(error);
      })

    // console.log(messageAdmin);
    
  }


  formAdmin: FormGroup = new FormGroup
  ({
    email: new FormControl(""),
    motif: new FormControl(""),
    textarea: new FormControl(""),
  });

}
