import { Component, Input } from '@angular/core';
import { PublicacionDTO } from 'src/app/DTO/PublicacionDTO';


//corregido html y ts--------------------

@Component({
  selector: 'app-carta-publicacion',
  templateUrl: './carta-publicacion.component.html',
  styleUrls: ['./carta-publicacion.component.css']
})
export class CartaPublicacionComponent {
  @Input() publicacion!:PublicacionDTO;
  mostrarTituloReceta:boolean=true;//titulo de la receta o nombre del alimento

  ngOnInit(): void {
    if(this.publicacion.idReceta!=null){
      this.mostrarTituloReceta=false;//si no tengo idreceta, no muestro titulo de la receta
    }
  }
  
}
