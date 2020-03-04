import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, onErrorResumeNext } from "rxjs";
import { CurrentUserService } from './current-user.service';

@Injectable()
export class SecurityInterceptorService implements HttpInterceptor {

  constructor(private currentUser: CurrentUserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    console.log("Interception");

    if(this.currentUser.recupToken !== "") {
  let newHeaders = req.headers; // Récuperation headers pour la demande HTTP
  newHeaders = newHeaders.append('authtoken', `Bearer ${this.currentUser.recupToken}`); // Mise en place de authtoken
  const authReq = req.clone({ headers: newHeaders }); // Clonage de la request

  return next.handle(authReq); // Passage au suivant
}

return next.handle(req);

}

}
