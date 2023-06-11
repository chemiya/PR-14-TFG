import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ComentarioDTO } from 'src/app/DTO/ComentarioDTO';


//corregido html y ts----------------------------


@Component({
  selector: 'app-carta-comentario',
  templateUrl: './carta-comentario.component.html',
  styleUrls: ['./carta-comentario.component.css']
})
export class CartaComentarioComponent {
  @Input() comentario!:ComentarioDTO;
  

  constructor(private router:Router){}

  detalleUsuario(id:any){
    this.router.navigate(["detallesUsuario/"+id])//vamos al usuario concreto
  }
}
