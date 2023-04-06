import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlimentoDTO } from 'src/app/modelo/app.model';

//corregido html y ts--------------------------------

@Component({
  selector: 'app-carta-alimento',
  templateUrl: './carta-alimento.component.html',
  styleUrls: ['./carta-alimento.component.css']
})
export class CartaAlimentoComponent {
  @Input() alimento!: AlimentoDTO;
  @Input() mostrarAnadir: boolean = false;//anadir, selecciona,compra
  @Input() mostrarSeleccionar: boolean = false;
  @Input() mostrarComprar: boolean = false;
  @Output() guardarAlimento = new EventEmitter();
  @Output() marcarAlimento = new EventEmitter();

  anadirAlimento(id: any, event: Event) {
    event.stopPropagation();
    this.guardarAlimento.emit();//para anadir como alimento en la receta
  }

  clickCompra(event: Event) {
    event.stopPropagation();//para ir a la compra
  }
  seleccionarAlimento(id: any, event: Event) {
    event.stopPropagation()//no propago y aviso de que se ha marcado
    this.marcarAlimento.emit();//para marcar como publicacion enlazada
  }
}
