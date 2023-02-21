import { Component, Input } from '@angular/core';
import { PublicacionDTO } from 'src/app/modelo/app.model';

@Component({
  selector: 'app-carta-publicacion',
  templateUrl: './carta-publicacion.component.html',
  styleUrls: ['./carta-publicacion.component.css']
})
export class CartaPublicacionComponent {
  @Input() publicacion!:PublicacionDTO;
  mostrarTituloReceta:boolean=false;

  ngOnInit(): void {
    if(this.publicacion.idReceta!=null){
      this.mostrarTituloReceta=true;
    }
  }
  
}
