import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModaluploadService } from './modalupload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  
  imagenSubir: File;
  imagenTemp: string;

  constructor( public _subirArchivoService: SubirArchivoService,
            public _modalUploadService: ModaluploadService ) {
    
   }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }

  seleccionImagen( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Sólo se permite imágenes', 'El archivo seleccionado no es una imágen', 'error');
      this.imagenSubir = null;
      return ;
    }

    this.imagenSubir =  archivo;

    let reader = new FileReader();

    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result.toString();

  }

  subirImagen() {
    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
      .then( resp => {
        this._modalUploadService.notificacion.emit( resp );

       this.cerrarModal();
      })
      .catch( err => {
        console.log('Error en la carga', err);
      });
  }

}
