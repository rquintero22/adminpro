import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: UntypedFormGroup;

  constructor( public _usuarioService: UsuarioService,
              public router: Router) { }

  sonIguales ( campo1: string, campo2: string) {
    return ( group: UntypedFormGroup) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };
    };
  }

  ngOnInit() {
    init_plugins();

    this.forma = new UntypedFormGroup({
      nombre: new UntypedFormControl(null, Validators.required ),
      correo: new UntypedFormControl(null, [Validators.required, Validators.email]),
      password: new UntypedFormControl(null, Validators.required),
      password2: new UntypedFormControl(null, Validators.required),
      condiciones: new UntypedFormControl(false)
    }, { validators: this.sonIguales('password', 'password2') });

    this.forma.setValue({
      nombre: 'Raymond Quintero',
      correo: 'quinteroaparicio@gmail.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  registrarUsuario() {

    if ( this.forma.invalid ) {
      return;
    }

    if ( !this.forma.value.condiciones ) {
      swal('Importante', 'Debe aceptar las condiciones!', 'warning');
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario( usuario )
      .subscribe( resp => this.router.navigate(['/login']));
  }

}
