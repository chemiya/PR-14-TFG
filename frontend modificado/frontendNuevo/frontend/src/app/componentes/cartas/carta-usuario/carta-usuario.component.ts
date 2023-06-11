import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RecetaServicioService } from 'src/app/Servicios/RecetaServicio/receta-servicio.service';
import { SeguidorServicioService } from 'src/app/Servicios/SeguidorServicio/seguidor-servicio.service';
import { TokenStorageService } from 'src/app/Servicios/TokenServicio/token-storage.service';
import { UsuarioServicioService } from 'src/app/Servicios/UsuarioServicio/usuario-servicio.service';
import { UsuarioDTO } from 'src/app/DTO/UsuarioDTO';



//corregido html y ts------------------------

@Component({
  selector: 'app-carta-usuario',
  templateUrl: './carta-usuario.component.html',
  styleUrls: ['./carta-usuario.component.css']
})
export class CartaUsuarioComponent {

  @Input() usuario!:UsuarioDTO;
  @Input() mostrarEliminar!:boolean;//eliminar
  currentUser:any
  
  @Output() actualizarSeguidos = new EventEmitter();//para buscar los nuevos seguidos

  constructor(private usuarioServicio:UsuarioServicioService,private seguidorServicio:SeguidorServicioService, public toastr: ToastrService,private tokenStorage:TokenStorageService){}
  ngOnInit(): void {
    
   
    this.currentUser=this.tokenStorage.getUser();//cargo el usuario

    this.acortar();
    
  
  }

  acortar(){
    if(this.usuario.descripcion.length>200){
      this.usuario.descripcion=this.usuario.descripcion.substring(0,200)+"..."
      
    }
  }


  eliminarSeguido(id:any,event:Event){
    event.stopPropagation();
   
    this.seguidorServicio.borrarSeguimiento(id,this.currentUser.id)//elimino el seguimiento del usuario
    .subscribe({
      next: (data) => {
        this.toastr.success('Has dejado de seguir a ese usuario');
        console.log(data);
        this.actualizarSeguidos.emit();//llamo para busque los nuevos seguidos
      },
      error: (e) => console.error(e)
    });
  }
}
