import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioDAOService } from 'src/app/DAO/UsuarioDAO/usuario-dao.service';
import { UsuarioDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';


@Component({
  selector: 'app-seguidores-usuario',
  templateUrl: './seguidores-usuario.component.html',
  styleUrls: ['./seguidores-usuario.component.css']
})
export class SeguidoresUsuarioComponent {
  usuarioSeguidores!:UsuarioDTO[];
  constructor(private usuarioDAO:UsuarioDAOService,private router:Router,private tokenService:TokenStorageService){}
  currentUser:any
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  this.currentUser=this.tokenService.getUser();
    this.getUsuarioSeguidores(this.currentUser.id);
  
  }
  
  getUsuarioSeguidores(id:any){
    this.usuarioDAO.getUsuarioSeguidores(id)//busco todos
        .subscribe({
          next: (data) => {
            this.usuarioSeguidores = data;//los guardo en el array
            console.log(data);
          },
          error: (e) => console.error(e)
        });
  }


  detalleUsuario(id:any){
    this.router.navigate(['/detallesUsuario/'+id]);
  }
}
