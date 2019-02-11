import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  token: string;

  constructor( public http: HttpClient,
              public router: Router,
              public _usuarioService: UsuarioService) { }


  /**
   * Crear Hospital
   */
  crearHospital( nombre: string ) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre } )
    .pipe(
      map( (resp: any) => {
        swal('Hospital creado', nombre, 'success');
        return resp.hospital;
      }));
  }

  actualizarHospital( hospital: Hospital ) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
    .pipe(
      map( (resp: any) => {

        swal('Hospital actualizado', hospital.nombre, 'success');

        return true;
      } )
    );
  }

  cargarHospitales( desde: number = 0 ) {

    const url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get( url );

  }

  /**
   * Realiza la consulta a los datos de los hospitales
   * @param termino Término de búsqueda para el hospital
   */
  buscarHospital( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/';
    url += termino;

    return this.http.get( url )
    .pipe(
      map( (resp: any) => resp.tabla )
    );
  }

  /**
   * Obtener hospital por id
   * @param id Identificador del hospital
   */
  obtenerHospital( id: string ) {
    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get( url )
        .pipe(
          map( (resp: any) => resp.hospital )
        );
  }

  /**
   * Elimina un hospital
   * @param id Identificador del hospital
   */
  borrarHospital( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

   return  this.http.delete( url )
   .pipe(
     map( resp => {
       swal('Hospital eliminado', 'El hospital ha sido eliminado satisfactoriamente.', 'success');
       return true;
     })
   );
  }

}
