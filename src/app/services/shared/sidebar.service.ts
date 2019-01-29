import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [{
    titulo: 'Principal',
    icono: 'mdi mdi-gauge',
    submenu: [{
      titulo: 'Dahsboard',
      url: '/dashboard'
    }, {
      titulo: 'Progress bar',
      url: '/progress'
    }, {
      titulo: 'Gráficas',
      url: '/graficas1'
    }]
  }];

  constructor() { }
}
