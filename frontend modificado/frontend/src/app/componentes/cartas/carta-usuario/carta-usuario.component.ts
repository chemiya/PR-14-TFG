import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RecetaDAOService } from 'src/app/DAO/RecetaDAO/receta-dao.service';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';
import { UsuarioDAOService } from 'src/app/DAO/UsuarioDAO/usuario-dao.service';
import { UsuarioDTO } from 'src/app/modelo/app.model';


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

  constructor(private usuarioDAO:UsuarioDAOService, public toastr: ToastrService,private tokenStorage:TokenStorageService){}
  ngOnInit(): void {
    
   
    this.currentUser=this.tokenStorage.getUser();//cargo el usuario
    
  
  }


  eliminarSeguido(id:any,event:Event){
    event.stopPropagation();
   
    this.usuarioDAO.borrarSeguimiento(id,this.currentUser.id)//elimino el seguimiento del usuario
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
