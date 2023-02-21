import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ComentarioDTO } from 'src/app/modelo/app.model';

@Component({
  selector: 'app-carta-comentario',
  templateUrl: './carta-comentario.component.html',
  styleUrls: ['./carta-comentario.component.css']
})
export class CartaComentarioComponent {
  @Input() comentario!:ComentarioDTO;
  

  constructor(private router:Router){}

  detalleUsuario(id:any){
    this.router.navigate(["detallesUsuario/"+id])
  }
}