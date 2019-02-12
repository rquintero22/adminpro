import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService,
              public router: Router ) {

  }

  canActivate(): Promise<boolean> | boolean {
    console.log('Token Guard');
    const token = this._usuarioService.token;
    const payload = JSON.parse( atob(token.split('.')[1]) );

    const expirado = this.expirado( payload.exp );

    if ( expirado ) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaRenueva( payload.exp );
  }

  expirado( fechaExpiracion: number ) {
    const ahora = new Date().getTime() / 1000;

    if ( fechaExpiracion < ahora ) {
      return true;
    } else {
      return false;
    }
  }

  verificaRenueva( fechaExp: number): Promise<boolean> {
    return new Promise( (resolve, reject) => {
        const tokenExp = new Date( fechaExp * 1000 );
        const ahora = new Date();

        ahora.setTime( ahora.getTime() + ( 4 * 60 * 60 * 1000) );

        if ( tokenExp.getTime() > ahora.getTime() ) {
          resolve(true);
        } else {
          this._usuarioService.renuevaToken()
              .subscribe( () => {
                resolve(true);
              }, () => {
                reject(false);
                this.router.navigate(['/login']);
              });
        }

    });
  }

}
