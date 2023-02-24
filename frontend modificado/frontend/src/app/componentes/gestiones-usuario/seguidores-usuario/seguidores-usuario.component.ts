import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioDAOService } from 'src/app/DAO/UsuarioDAO/usuario-dao.service';
import { UsuarioDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';


//corregido html y ts-------------------

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
    
  this.currentUser=this.tokenService.getUser();//cojo el usuario
    this.getUsuarioSeguidores(this.currentUser.id);//cojo sus seguidores
  
  }
  
  getUsuarioSeguidores(id:any){
    this.usuarioDAO.getUsuarioSeguidores(id)//busco sus seguidores
        .subscribe({
          next: (data) => {
            this.usuarioSeguidores = data;//los guardo en el array
            console.log(data);
          },
          error: (e) => console.error(e)
        });
  }


  detalleUsuario(id:any){//voy a un usuario concreto
    this.router.navigate(['/detallesUsuario/'+id]);
  }
}
