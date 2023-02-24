import { Component, Input } from '@angular/core';
import { AlimentoRecetaDTO } from 'src/app/modelo/app.model';

//corregido html y ts-----------------------

@Component({
  selector: 'app-carta-alimento-receta',
  templateUrl: './carta-alimento-receta.component.html',
  styleUrls: ['./carta-alimento-receta.component.css']
})
export class CartaAlimentoRecetaComponent {
  @Input() alimentoReceta!:AlimentoRecetaDTO;
}
