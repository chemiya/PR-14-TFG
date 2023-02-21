import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlimentoDTO } from 'src/app/modelo/app.model';

@Component({
  selector: 'app-carta-alimento',
  templateUrl: './carta-alimento.component.html',
  styleUrls: ['./carta-alimento.component.css']
})
export class CartaAlimentoComponent {
  @Input() alimento!:AlimentoDTO;
  @Input() mostrarAnadir:boolean=false;
  @Output() guardarAlimento = new EventEmitter();

  anadirAlimento(id:any,nombre:any){
    this.guardarAlimento.emit();
  }

  clickCompra(event:Event){
    event.stopPropagation();
  }
}
