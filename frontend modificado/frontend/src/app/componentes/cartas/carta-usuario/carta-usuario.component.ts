import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RecetaDAOService } from 'src/app/DAO/RecetaDAO/receta-dao.service';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';
import { UsuarioDAOService } from 'src/app/DAO/UsuarioDAO/usuario-dao.service';
import { UsuarioDTO } from 'src/app/modelo/app.model';

@Component({
  selector: 'app-carta-usuario',
  templateUrl: './carta-usuario.component.html',
  styleUrls: ['./carta-usuario.component.css']
})
export class CartaUsuarioComponent {

  @Input() usuario!:UsuarioDTO;
  @Input() mostrarEliminar!:boolean;
  currentUser:any
  @Output() actualizarSeguidos = new EventEmitter();

  constructor(private usuarioDAO:UsuarioDAOService, public toastr: ToastrService,private tokenStorage:TokenStorageService){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
   
    this.currentUser=this.tokenStorage.getUser();
    
  
  }


  eliminarSeguido(id:any,event:Event){
    event.stopPropagation();
   
    this.usuarioDAO.eliminarSeguimiento(id,this.currentUser.id)//busco todos
    .subscribe({
      next: (data) => {
        this.toastr.success('Has dejado de seguir a ese usuario');
        console.log(data);
        this.actualizarSeguidos.emit();
      },
      error: (e) => console.error(e)
    });
  }
}
