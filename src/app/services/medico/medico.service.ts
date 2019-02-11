import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Medico } from '../../models/medico.model';
import { pipe } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: Number = 0;

  constructor( public http: HttpClient, 
              public _usuarioService: UsuarioService) { }

  cargarMedicos() {

    const url = URL_SERVICIOS + '/medico';

    return this.http.get( url )
        .pipe(
          map( ( resp: any ) => {
            this.totalMedicos = resp.total;
            return resp.medicos;
          })
        );
  }

  cargarMedico( id: string ) {

    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get( url )
       .pipe(
          map( (resp: any) => resp.medico )
        );
  }

  buscarMedicos( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/';
    url += termino;

    return this.http.get( url )
    .pipe(
      map( (resp: any) => resp.medicos )
    );
  }

  borrarMedico ( id: string ) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
      .pipe(
          map( resp => {
            swal('Médico eliminado', 'Médico eliminado satisfactoriamente', 'success');
            return resp;
          })
      );
  }

  guardarMedico( medico: Medico ) {
    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {
      // actualizando
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, medico )
          .pipe(
            map ( (resp: any) => {
              swal('Médico actualizado', medico.nombre, 'success');
              return resp.medico;
            })
          );

    } else {
      // creando medico
      url += '?token=' + this._usuarioService.token;

      return this.http.post( url, medico )
            .pipe(
              map( (resp: any) => {
                swal('Médico creado', medico.nombre, 'success');
                return resp.medico;
              })
            );
    }

  }

}
