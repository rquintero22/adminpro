import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModaluploadService } from '../../components/modal-upload/modalupload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html'
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( public _hospitalService: HospitalService,
              public _modalUploadService: ModaluploadService) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe( resp => this.cargarHospitales() );
  }

  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales( this.desde )
      .subscribe( (resp: any) => {
  
        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;
        this.cargando = false;

      });

  }

  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;
    console.log(desde);

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }

  buscarHospital( termino: string ) {

    if (termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hospitalService.buscarHospital( termino )
      .subscribe( (hospitales: Hospital[]) => {
        this.hospitales = hospitales;
        this.cargando = false;
      } );
  }

  borrarHospital( hospital: Hospital ) {

      swal({
        title: '¿Está seguro(a)?',
        text: 'Está por eliminar a ' + hospital.nombre,
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
      .then( borrar => {

        if ( borrar ) {
           this._hospitalService.borrarHospital( hospital._id )
           .subscribe( resp => this.cargarHospitales() );
        }
      });
  }

  guardarHospital( hospital: Hospital ) {

    this._hospitalService.actualizarHospital( hospital )
    .subscribe();

  }

  crearHospital() {
    swal({
      title: 'Alta de hospital',
      text: 'Digite el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    })
    .then( (valor: string) => {
      console.log(valor);

      if ( !valor  || valor.length === 0 ) {
        return;
      }

      this._hospitalService.crearHospital(valor)
        .subscribe( () => this.cargarHospitales() );
     // return results.json();
    });
  }

  actualizarImagen( hospital: Hospital ) {
    console.log(hospital);
    this._modalUploadService.mostrarModal( 'hospitales', hospital._id );
  }

}
