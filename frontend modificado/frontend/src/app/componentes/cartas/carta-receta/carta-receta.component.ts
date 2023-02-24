import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { RecetaDAOService } from 'src/app/DAO/RecetaDAO/receta-dao.service';
import {  RecetaDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';

//corregido html y ts--------------

@Component({
  selector: 'app-carta-receta',
  templateUrl: './carta-receta.component.html',
  styleUrls: ['./carta-receta.component.css']
})
export class CartaRecetaComponent {
  @Input() receta!:RecetaDTO;
  @Input() mostrarEliminar!:boolean;//eliminar o seleccionar
  @Input() mostrarSeleccionar!:boolean;
  currentUser:any
  @Output() actualizarFavoritas = new EventEmitter();//cambiar favorita si/ no
  @Output() marcarReceta = new EventEmitter();//marcar para enlazar en la publicacion

  constructor(private recetaDAO:RecetaDAOService, public toastr: ToastrService,private tokenStorage:TokenStorageService){}
  ngOnInit(): void {
  
   console.log(this.mostrarEliminar)
   console.log(this.mostrarSeleccionar)
    this.currentUser=this.tokenStorage.getUser();//busco el usuario
    
  
  }


  seleccionarReceta(id:any){
    this.marcarReceta.emit();//selecciono la receta para la publicacion
  }

  eliminarFavorita(idReceta:any,event:Event){
    event.stopPropagation();
    this.recetaDAO.borrarFavorita(this.currentUser.id,idReceta)//la elimino de favoritas
    .subscribe({
      next: (data) => {
        console.log(data)
        this.toastr.success( 'Se ha eliminado la receta de favoritas');
        this.actualizarFavoritas.emit();//digo que busque ottra vez las favoritas

        
      },
      error: (e) => console.error(e)
    });
  }
}
