import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  cargando: boolean = true;

  constructor( public _medicoService: MedicoService ) { }

  ngOnInit() {

    this.cargarMedicos();
  }

  cargarMedicos() {

    this.cargando = true;
    this._medicoService.cargarMedicos()
        .subscribe( (medicos: any) => {
          this.medicos = medicos;
          this.cargando = false;
        });
  }

  buscarMedico( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }
    this._medicoService.buscarMedicos( termino )
        .subscribe( medicos => this.medicos = medicos );
  }

  borrarMedico( medico: Medico ) {

    this._medicoService.borrarMedico( medico._id )
        .subscribe( () => this.cargarMedicos() );

  }

}
