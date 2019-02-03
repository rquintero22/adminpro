import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent implements OnInit, OnDestroy {

  subcription: Subscription;

  constructor() {

    this.subcription = this.regresaObservable()
    .subscribe(numero => {
      console.log('Subs', numero);
    },
    error => console.error('Error en el obs', error),
    () => console.log('El observador finalizó'));

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La página se va a cerrar');
    this.subcription.unsubscribe();
  }


  regresaObservable(): Observable<any> {

    return  new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval( () => {

        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        if ( contador === 3 ) {

          observer.complete();
        }

        // if ( contador === 2 ) {
          // clearInterval ( intervalo );
          observer.error('Auxilio');
        // }

      }, 1000);
    })
    .pipe(
      map( resp => resp.valor),
      filter( ( valor, index) => {
        if ( (valor % 2) === 1 ) {
            // impar
            return true;
        } else {
          
          return false;
        }
          
      })
    );

  }

}
