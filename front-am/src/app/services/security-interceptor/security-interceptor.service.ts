import { Injectable } from '@angular/core';
// * module ng HttpInterceptor = intercepte et gère une requête de type HttpRequest ou HttpResponse.
// * module ng HttpRequest =  est une requête HTTP sortante avec un corps typé facultatif, rend les instances "immmuables" (ne peuvent être modifiées aprés création)
// * module ng HttpHandler = transforme une HttpRequest en un flux de HttpEvents, dont l'un sera probablement a HttpResponse.
// * module ng HttpEvent = type d'union pour tous les événements possibles sur le flux de réponse.
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, onErrorResumeNext } from "rxjs";
import { CurrentUserService } from '../current-user/current-user.service';

@Injectable()
export class SecurityInterceptorService implements HttpInterceptor {

  constructor(private currentUser: CurrentUserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("interception ok", req.url);

    if (this.currentUser.recupToken !== "") {
      let newHeaders = req.headers; // Récuperation headers pour la demande HTTP
      newHeaders = newHeaders.append('authtoken', `Bearer ${this.currentUser.recupToken}`); // Mise en place de authtoken
      // * méthode clone() = permet de modifier une requête HttpRequest (req)
      const authReq = req.clone({ headers: newHeaders }); // Clonage de la requête

      return next.handle(authReq); // Passage au suivant
    }

    return next.handle(req);

  }

}
