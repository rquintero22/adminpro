import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard  {

  constructor( public _usuarioService: UsuarioService,
              public router: Router ) {

  }

  canActivate():  boolean {

    if ( this._usuarioService.estaLogueado() ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
