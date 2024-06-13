import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService, SidebarService, SharedService, UsuarioService,
          SubirArchivoService, MedicoService } from './service.index';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { ModaluploadService } from '../components/modal-upload/modalupload.service';
import { HospitalService } from './hospital/hospital.service';

//
import { LoginGuardGuard } from './guards/login-guard.guard';
import { AdminGuard } from './guards/admin.guard';
import { VerificaTokenGuard } from './guards/verifica-token.guard';

@NgModule({ declarations: [], imports: [CommonModule], providers: [
        SettingsService,
        SidebarService,
        SharedService,
        UsuarioService,
        SubirArchivoService,
        ModaluploadService,
        HospitalService,
        MedicoService,
        LoginGuardGuard,
        AdminGuard,
        VerificaTokenGuard,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class ServiceModule { }
